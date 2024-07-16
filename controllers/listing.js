const Listing= require("../models/listing.js");
const mapToken=process.env.MAP_TOKEN;
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: mapToken});

module.exports.index= async (req,res)=>{
    const allListings= await Listing.find({});
     res.render("listings/index.ejs",{allListings});
};

module.exports.renderNewForm=(req,res) =>{
    res.render("listings/new.ejs");
};

module.exports.showListings =async (req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id)
    .populate( {path: "reviews",populate:{ path:"author",}})  //nested populate 
    .populate("owner");

    if(!listing){
     req.flash("error","Listing requested Does not Exist");
     res.redirect("/listings");
    }
    else res.render("listings/show.ejs",{listing});
};

module.exports.createNewListing =async(req,res,next)=>{

     let location=req.body.listing.location;
     let country=req.body.listing.country;
     let address=location+", "+country;

    let response= await geocodingClient.forwardGeocode({
        query: address,
        limit: 1
      }).send()

    let url="",filename="";

         if(req.file){
           url= req.file.path;
           filename = req.file.filename
         }
         else{
            url="https://www.bigtextrailerworld.com/content/mu-plugins/bttw-inventory-manager/assets/img/NoPhotoAvailable.png";
            let st=Date.now()
            filename=`WanderLust_dev/${st}_NoImage`;
         }
          const {listing}= req.body;
          const newListing = new Listing(req.body.listing);

         newListing.image={url,filename};
         newListing.owner= req.user._id; 
         newListing.geometry= response.body.features[0].geometry;

       let saved= await newListing.save();
       console.log(saved);
     req.flash("success","Added new Listing!");
     res.redirect("/listings");
    };

module.exports.editListing =async (req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id);
    if(!listing){
     req.flash("error","Listing requested Does not Exist");
     return res.redirect("/listings");
    }
  
    res.render("listings/edit.ejs",{listing});
};

module.exports.updateListing =async (req,res)=>{
    let {id}=req.params;
   let newListing= await Listing.findByIdAndUpdate(id, {...req.body.listing});
   if(req.file){
    let url= req.file.path;
    let filename =req.file.filename
    newListing.image={url,filename};
    await newListing.save();
  }
   req.flash("success","Your Listing Updated!");
   res.redirect(`/listings/${id}`);
};

module.exports.deleteListing= async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted!");
    res.redirect("/listings");
};
