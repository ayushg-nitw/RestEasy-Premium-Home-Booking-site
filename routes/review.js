const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync= require("../utils/wrapAsync.js");
const ExpressError= require("../utils/ExpressError.js");
const {reviewSchema}=require("../schema.js");
const Review = require("../models/reviews.js"); //Review Model
const Listing= require("../models/listing.js");
const {isLoggedIn,ValidateReview,isreviewAuthor, saveRedirectUrl}= require("../middlewares.js");
const reviewController= require("../controllers/review.js");


//Post Reviews Route
router.post("/",isLoggedIn, ValidateReview, wrapAsync(reviewController.createReview)); 

//Delete Review Route
router.delete("/:reviewId",isLoggedIn,isreviewAuthor,wrapAsync(reviewController.destroyReview));  

module.exports = router;