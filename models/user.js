const mongoose= require("mongoose");
const Schema= mongoose.Schema;
const passportLocalMongoose= require("passport-local-mongoose");

let userSchema= new Schema({
    email: {
        type: String,
        required: true
    },
    photo: { type: String, default: 'https://cdn.marvel.com/content/1x/004tho_ons_mas_mob_04.jpg' }
    //several other is not required as we will use a plugin
});


userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",userSchema);