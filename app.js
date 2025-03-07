// --------------------------------INITIALIZATION------------------------------------------------------

if(process.env.NODE_ENV !="production") require("dotenv").config();

const express= require("express");
const app = express();
const mongoose= require("mongoose");
const path = require("path");
const methodOverride= require("method-override");
const ejsMate= require("ejs-mate");
const ExpressError= require("./utils/ExpressError.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const bookingRouter= require("./routes/booking.js");
const profileRouter= require("./routes/profile.js");

const session= require("express-session");
const MongoStore = require('connect-mongo');
const flash= require("connect-flash");
const passport= require("passport");
const LocalStrategy=require("passport-local");
const User= require("./models/user.js")
const bodyParser= require('body-parser');
const Booking= require("./models/booking.js");
const Listing= require("./models/listing.js");

const axios= require("axios");
const crypto= require("crypto");
const cors= require("cors");
const {Cashfree}= require('cashfree-pg');
const wrapAsync = require("./utils/wrapAsync.js");

const dbUrl= process.env.ATLASDB_URL;

main().then((res)=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(dbUrl);
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine","ejs");
app.engine("ejs",ejsMate) //for ejsMate working;
app.set("views",path.join(__dirname,"views")); //for connecting different folder -> ex: views 
app.use(express.urlencoded({extended:true})); //for parsing parameters in requests;
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));  //to serve all js or css files to ejs
app.use('/Allimages', express.static(path.join(__dirname, 'Allimages'))); 

const store= MongoStore.create({
     mongoUrl: dbUrl,
     crypto:{
      secret: process.env.MY_SECRET
     },
      touchAfter: 24*3600
});

store.on("error",(err)=>{
  console.log("Error in MONGO SESSION STORE",err)
})

const sessionOptions= {
    store:store,
    secret: process.env.MY_SECRET,
    resave: false,
    saveUninitialized:true,
    cookie:{
     expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
     maxAge: 7 * 24 * 60 * 60 * 1000,
     httpOnly: true
    }
};

app.use(session(sessionOptions));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session()); //to identify same user browsing from page to page in a website

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{ //middleware
    res.locals.curr = req.user 
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success"); //contains messags
    next();
});


// --------------------------------INITIALIZATION DONE------------------------------------------------------


app.listen(8080,()=>{
    console.log("Server is Listening to port 8080");
});

app.use("/listings", listingRouter); //all listing routes are is searched from listing file;
app.use("/listings/:id/reviews",reviewRouter); 
app.use("/", userRouter);
app.use("/listings/:id",bookingRouter);
app.use("/profile",profileRouter);

// -------------------------------------------------------------------------------------

Cashfree.XClientId= process.env.CASHFREE_APP_ID;
Cashfree.XClientSecret= process.env.CASHFREE_SECRET_KEY;
Cashfree.XEnvironment=  process.env.CASHFREE_SANDBOX;

app.post("/payment",wrapAsync(async (req,res)=>{
     
        let {orderData}=req.body;
        console.log(orderData);

         Cashfree.PGCreateOrder("2023-08-01",orderData)
         .then( (response) =>{
           console.log(response.data);
           res.json(response.data);
         })
         .catch( (error)=>{
             console.log( error);
         });
  }));


    app.post("/verify", async (req, res) => {
      const { order_id } = req.body;
  
      try {
          const response = await Cashfree.PGOrderFetchPayments("2023-08-01", order_id);
          console.log("Successfully Verified!", response.data);
  
          const paymentDetails = response.data;
          const paymentStatus = paymentDetails[0].payment_status; // Ensure correct path to payment_status
  
          res.status(200).json({ verified: true, payment_status: paymentStatus });
      } catch (error) {
          console.log(error);
          res.status(500).json({ verified: false, payment_status: "FAILED" }); // Ensure a default failed status
      }
  });


app.get('/payment/callback', async (req, res) => {

  const {order_id , order_status} = req.query;


  if (order_status === 'PAID') {

    // const newBooking= new Booking({toSave});
  //  const saved= await newBooking.save();
  //  console.log("new Booked",saved);

    res.redirect(`/success?order_id=${order_id}`);
  } else {
    res.redirect(`/failure?order_id=${order_id}`);
  }

});
let getOrderInfo;

app.get('/success', async(req, res) => {

  const { order_id } = req.query;
try{
      getOrderInfo = await axios.get(`https://sandbox.cashfree.com/pg/orders/${order_id}`, {
    headers: {
        'x-client-id': process.env.CASHFREE_APP_ID,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY, 
        'x-api-version': '2023-08-01',
    }
});
 console.log("Get Order Info:", getOrderInfo);
}catch(e){
  console.log(e);
}
  res.render('paymentStatus/success', { getOrderInfo});

});

app.get('/failure', async(req, res) => {

  const { order_id } = req.query;

try{
     getOrderInfo = await axios.get(`https://sandbox.cashfree.com/pg/orders/${order_id}`, {
    headers: {
        'x-client-id': process.env.CASHFREE_APP_ID,
        'x-client-secret': process.env.CASHFREE_SECRET_KEY, 
        'x-api-version': '2023-08-01',
    }
});
 console.log("Get Order Info:", getOrderInfo);
}catch(e){
  console.log(e);
}
  res.render('paymentStatus/failure', { getOrderInfo });
});

//-----------------------------------------------------------------------------------------
//searching route

app.get('/search', async (req, res) => {
 
  try {
      const { query } = req.query; // Get the search query from URL parameters
      const searchResults = await Listing.find({
          $or: [
               { title: { $regex: query, $options: 'i' } },
              { location: { $regex: query, $options: 'i' } },
              { country: { $regex: query, $options: 'i' } },
              
          ]
      });
      res.render('./listings/searchResult.ejs', { searchResults });
  } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while searching for listings.");
   }
});

// -------------------------------------------------------------------------------------

app.get('/', async (req,res)=>{
  const allListings= await Listing.find({});
  res.render("listings/index.ejs",{allListings});
});

//When accessing all routes that not exists
app.all("*",(req,res,next)=>{
  next(new ExpressError(404,"Page Not Found!"));
}); 

//error handling middleware
app.use((err,req,res,next)=>{
   let {statusCode=500,message}=err;
    res.status(statusCode).render("Error.ejs",{message});
});
