const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync= require("../utils/wrapAsync.js");
const ExpressError= require("../utils/ExpressError.js");
const {listingSchema} =require("../schema.js");
const Listing= require("../models/listing.js");
const {isLoggedIn,isOwner,ValidateListing}= require("../middlewares.js");

const bookingController= require("../controllers/booking.js");

const session= require("express-session");
const flash= require("connect-flash");

const sessionOptions= {
    secret: "Ayush123!@#",
    resave: false,
    saveUninitialized:true,
    cookie:{
     expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
     maxAge: 7 * 24 * 60 * 60 * 1000,
     httpOnly: true
    }
};

router.use(session(sessionOptions));

router.use(flash());


router.get("/booking",isLoggedIn,bookingController.renderNewForm);
router.post("/booking/availability",isLoggedIn,bookingController.available);
router.post("/booking/reserve", isLoggedIn, bookingController.ReserveIt);
router.post("/booking/verifyPayment", isLoggedIn, bookingController.verifyPayment);

module.exports=router;