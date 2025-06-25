import mongoose, { Types } from "mongoose";
import Listing from "./listing.model.js";

const bookingSchema =new mongoose.Schema({
    host:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
     guest:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
     listing:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Listing",
        required:true
    },
     status:{
        type:String,
        enum:["booked","cancelled","done"],
        default:"booked"
    },
     checkIn:{
        type:Date,
        required:true
    },
    checkOut:{
        type:Date,
        required:true
    },
    totalRent:{
        type:Number,
        required:true
    },
    cancelledBy: {
  type: String,
  enum: ['host', 'guest', null],
  default: null
}

},{timestamps:true})

const Booking = mongoose.model("Booking", bookingSchema)
export default Booking