import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  image1: {
    type: String,
    required: true
  },
  image2: {
    type: String,
    required: true
  },
  image3: {
    type: String,
    required: true
  },
  image4: {
    type: String,
    required: true
  },
  image5: {
    type: String,
    required: true
  },
  rent: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  landmark: { // ✅ spelling matches frontend and controller
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  isBooked: {
    type: Boolean,
    default: false
  },
   guest: {
     type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  ratings:{
    type:Number,
    min:0,
    max:5,
    default:0
  },
  state: {
  type: String,
  required: true,
},
country: {
  type: String,
  required: true,
},
latitude: {
  type: Number,
  required: true,
},
longitude: {
  type: Number,
  required: true,
}

}, { timestamps: true });

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
