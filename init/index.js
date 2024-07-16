//for saving Sampole Data in DB
const mongoose= require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL="mongodb://127.0.0.1:27017/WanderLust";
main().then((res)=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB= async ()=>{
    await Listing.deleteMany({});   //delete all previous saved data's
    await Listing.insertMany(initData.data);
    console.log("Data was initialized and saved");
}
initDB();
