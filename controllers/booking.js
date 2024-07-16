
const Listing= require("../models/listing.js");
const Booking= require("../models/booking.js");

const express = require('express');
const bodyParser = require('body-parser');
const app= express();

const axios = require('axios');
const {load} = require('@cashfreepayments/cashfree-js');

let cashfree;

let initializeSDK= async function(){
    cashfree = await load({
        mode: "sandbox" //or production
    });
}

initializeSDK().then((res)=>{
    console.log(cashfree);
}).catch((e)=>{
    console.log(e);
})

// console.log(cashfree);

let order_id;

 const getsessionId= async (orderData)=>{

    try{
        let res = await axios.post("http://localhost:8080/payment",{orderData:orderData});
        if(res.data && res.data.payment_session_id){
            console.log(res.data.payment_session_id);
            order_id=res.data.order_id;
            console.log(order_id);
            return res.data.payment_session_id;
        }
    }
    catch(error){
        console.log(error);
    }
 }
 

module.exports.renderNewForm = async (req,res)=>{
    let {id}=req.params;
    let listing = await Listing.findById(id);
   res.render("listings/booking.ejs",{listing});
}

module.exports.available = async (req,res)=>{

    try {
        const { id } = req.params;
        const { checkin, checkout, adults } = req.body;

        const checkinDate = new Date(checkin);
        const checkoutDate = new Date(checkout);

        const listing = await Listing.findById(id);
        if (!listing) {
            return res.status(404).json({ available: false, message: 'Listing not found' });
        }

        // Query to find conflicting bookings
        const conflictingBookings = await Booking.find({
            listing: listing._id,
            $or: [
                {
                    checkin: { $lt: checkoutDate },
                    checkout: { $gt: checkinDate }
                }
            ]
        });

        if (conflictingBookings.length > 0) {
            return res.json({ 
                available: false
            });
        }

        res.json({
            available: true,
            pricePerNight: listing.price
        });

    } catch (error) {
        console.error('Error checking availability:', error);
        res.status(500).json({ available: false, message: 'Internal server error' });
    }
}

module.exports.ReserveIt= async (req,res)=>{

            const { id } = req.params;
            const { checkin, checkout, adults} = req.body;
    
            const newBooking = new Booking({
                user: req.user._id, 
                listing: id,
                checkin: new Date(checkin),
                checkout: new Date(checkout),
                guests: adults,
                totalPrice: req.body.totalPrice 
            });

          //payment integration
            let max=10000000000;
            let min=999999999;

            const orderId = `order_${new Date().getTime()}`;
            const orderData = {
              "order_amount": req.body.totalPrice ,
              "order_currency": 'INR',
              "order_id": orderId,
              "customer_details": {
                "customer_id": req.user._id.toString(),
                "customer_email": req.user.email, // Assuming email is available in user object
                "customer_phone": (Math.floor(Math.random() * (max - min + 1)) + min).toString()
              },
            };

            try{
                let sessionId= await getsessionId(orderData);
                res.status(200).json({paymentSessionId: sessionId,order_id:order_id});
            }
            catch(error){
                  console.log(error);
            }      
}

module.exports.verifyPayment = async (req, res) => {

    const {id}= req.params;
    const { order_id,listing_id,checkin,checkout,totalPrice,adults} = req.body;

    try {
      let response = await axios.post("http://localhost:8080/verify", { order_id });

      const paymentStatus = response.data.payment_status;
      console.log(paymentStatus);

      if (paymentStatus === "SUCCESS") {

        const newBooking = new Booking({
            user: req.user._id, // Assuming the user is authenticated and available on req.user
            listing: listing_id,
            checkin: new Date(checkin),
            checkout: new Date(checkout),
            guests: adults,
            totalPrice: totalPrice,
            order_id:order_id
        });

        const savedBooking= await newBooking.save();
        console.log("Booking Saved SuccessFully", savedBooking);
        
        res.json({ available: true, payment_status: "SUCCESS" });

    } else {
        res.json({ available: false, payment_status: paymentStatus });
    }

} catch (e) {
    console.log(e);
    res.json({ available: false, payment_status: "FAILED" });
}
  };