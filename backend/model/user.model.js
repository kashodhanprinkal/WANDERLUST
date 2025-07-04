    import mongoose from "mongoose";

   const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    avatar: {
        type: String,
        default: ""
    },
   socialLinks: {
  instagram: { type: String, default: "" },
  twitter: { type: String, default: "" },
  facebook: { type: String, default: "" },
  linkedin: { type: String, default: "" }  // ✅ ADD THIS
},
    listing: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing"
    }],
    booking: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking"
    }]
}, { timestamps: true });

    const User = mongoose.model("User", userSchema);
    export default User;
