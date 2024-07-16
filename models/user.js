const mongoose= require("mongoose");
const Schema= mongoose.Schema;
const passportLocalMongoose= require("passport-local-mongoose");

let userSchema= new Schema({
    email: {
        type: String,
        required: true
    }
    //several other is not required as we will use a plugin
});
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",userSchema);