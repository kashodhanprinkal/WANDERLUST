import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  type: {
    type: String,
    enum: ["booking", "cancellation", "review", "message", "custom"],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  listing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
    default: null,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

// ✅ Prevent OverwriteModelError in dev
const Notification = mongoose.models.Notification || mongoose.model("Notification", notificationSchema);

export default Notification;
