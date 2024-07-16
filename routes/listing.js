const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync= require("../utils/wrapAsync.js");
const ExpressError= require("../utils/ExpressError.js");
const {listingSchema} =require("../schema.js");
const Listing= require("../models/listing.js");
const {isLoggedIn,isOwner,ValidateListing}= require("../middlewares.js");

const listingController= require("../controllers/listing.js");

const multer= require("multer");
const {storage}= require("../CloudConfig.js");  //we are not using disk storage now
const upload= multer({storage});     

// const storage= multer.diskStorage({
//     destination: function(req,file,cb){
//         return cb(null,"./Allimages/"); //destination where to save images
//     },
//     filename: function(req,file,cb){
//         return cb(null,`${Date.now()}-${file.originalname}`);                                                          
//     }
// });


//we can apply MVC framework and combine all same path routes using router.route();

   //Index Route
   router.get("/", wrapAsync(listingController.index));
   
   //New Route
   router.get("/new",isLoggedIn,listingController.renderNewForm);
   
   //show route
   router.get("/:id", wrapAsync(listingController.showListings));
   
   //Create Route
   router.post("/",isLoggedIn,
    upload.single('listingImage'),
    ValidateListing,
    wrapAsync(listingController.createNewListing));
   
   // Edit Route
   router.get("/:id/edit",isLoggedIn, isOwner,wrapAsync(listingController.editListing));
   
   //Update Route
   router.put("/:id",isLoggedIn, isOwner,upload.single('listingImage'),ValidateListing, wrapAsync(listingController.updateListing));
   
   // Delete route
   router.delete("/:id",isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));
   
   module.exports = router;