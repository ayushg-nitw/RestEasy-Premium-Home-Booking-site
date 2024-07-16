const Listing = require("./models/listing.js");
const Review = require("./models/reviews.js");
const ExpressError= require("./utils/ExpressError.js");
const {listingSchema,reviewSchema} =require("./schema.js");
const wrapAsync= require("./utils/wrapAsync.js");


module.exports.isLoggedIn= (req,res,next)=>{

    if(!req.isAuthenticated()){
        req.session.redirectUrl= req.originalUrl;
        req.flash("error","You are not logged in!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl= (req,res,next)=>{
    res.locals.redirectUrl= req.session.redirectUrl;
    next();
};

module.exports.isOwner= async (req,res,next)=>{
    let {id}=req.params;
    let listing= await Listing.findById(id);
    if( !listing.owner._id.equals(res.locals.curr._id) ){
        req.flash("error","You are not the owner of this Listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.ValidateListing = (req,res,next)=>{ //Joi

    let {err}=listingSchema.validate(req.body);
    if(err){
        let errMsg= err.details.map((el)=>el.message).join(","); //for all msg showing which has error
        throw new ExpressError(400,errMsg);  //for server side error send from hopscotch
    }
    else  next();
};

module.exports.ValidateReview = (req,res,next)=>{ //Joi

    let {err}=reviewSchema.validate(req.body);
    if(err){
        let errMsg= err.details.map((el)=>el.message).join(","); //for all msg showing which has error
        throw new ExpressError(400,errMsg);  //for server side error send from hopscotch
    }
    else  next();
};

module.exports.isreviewAuthor= async (req,res,next)=>{
    let {id,reviewId}=req.params;
    let review= await Review.findById(reviewId);
    if( !review.author.equals(res.locals.curr._id) ){
        req.flash("error","You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
};
