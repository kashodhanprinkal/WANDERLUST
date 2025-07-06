import Notification from "../model/notification.model.js";

// ✅ Get all notifications for the current user (latest first)
export const getMyNotifications = async (req, res) => {
  try {
    console.log("🔐 Current user ID in request:", req.userId); // Should show userId
    const userId = req.userId;

    const notifications = await Notification.find({ recipient: userId })
      .populate("sender", "name avatar")
       .populate("listing", "title landmark city state country") // 👈 update here
      .sort({ createdAt: -1 });

    console.log("📤 Notifications sent:", notifications);

    res.status(200).json(notifications);
  } catch (err) {
    console.error("❌ Error in getMyNotifications:", err.message);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};

// ✅ Mark a notification as read
export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    res.status(200).json(notification);
  } catch (err) {
    res.status(500).json({ message: "Failed to mark notification as read" });
  }
};

// ✅ Mark all notifications as read
export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { recipient: req.userId, isRead: false },
      { $set: { isRead: true } }
    );

    res.status(200).json({ message: "All marked as read" });
  } catch (err) {
    res.status(500).json({ message: "Failed to mark all as read" });
  }
};

// ✅ Delete a notification
export const deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Notification deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete notification" });
  }
};
