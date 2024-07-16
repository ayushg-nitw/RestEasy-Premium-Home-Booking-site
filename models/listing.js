const mongoose= require("mongoose");
const Review = require("./reviews");
const reviews = require("./reviews");
const Schema= mongoose.Schema;


let listingSchema= new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image:{
        url: String,
        filename: String
    },
    price :Number,
    location: String,
    country : String,
    reviews:[  //1 to n relationship between listing and revies
        { type: Schema.Types.ObjectId,
            ref: "Review"
        }
       ],
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    geometry:{
        type: {
            type:String,
            enum: ["Point"],
            required: true
        },
        coordinates:{
            type:[Number],
            required: true
        }
    }
    
});

listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
        await Review.deleteMany({_id: {$in : listing.reviews}});
    }
});

const Listing= new mongoose.model("Listing",listingSchema);
module.exports = Listing;
