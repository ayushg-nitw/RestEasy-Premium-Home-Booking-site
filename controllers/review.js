const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");

module.exports.createReview=async( req,res)=>{
    
    let listing= await Listing.findById(req.params.id);
    let newReview= new Review(req.body.review);  //rating and comment
    newReview.author= req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","Added your review!");
   res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview=async (req,res)=>{
    let {id,reviewId}= req.params;
    await Listing.findByIdAndUpdate(id,{$pull: {review: reviewId}} );  //also delete from listing review
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Deleted your review!");
    res.redirect(`/listings/${id}`);
};
