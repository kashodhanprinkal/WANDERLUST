import Notification from "../model/notification.model.js";

/**
 * Create a new notification
 * @param {ObjectId} recipient - The user receiving the notification
 * @param {String} type - Type of notification (booking, cancellation, review, etc.)
 * @param {String} message - Notification message content
 * @param {ObjectId} [sender] - User who triggered the action (optional)
 * @param {ObjectId} [listing] - Related listing ID (optional)
 */
const createNotification = async ({ recipient, type, message, sender = null, listing = null }) => {
  try {
    const notification = new Notification({
      recipient,
      type,
      message,
      sender,
      listing,
    });

    await notification.save();
    console.log("📩 Notification sent to:", recipient.toString());
    return notification;
  } catch (err) {
    console.error("❌ Error creating notification:", err.message);
  }
};

export default createNotification;
