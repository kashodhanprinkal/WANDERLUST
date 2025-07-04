// controller/user.controller.js
import User from '../model/user.model.js';
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select("-password")
      .populate("listing", "title image1 image2 image3 image4 image5 description rent category city landmark isBooked host ratings")
      .populate({
        path: "booking",
        select: "checkIn checkOut totalRent status cancelledBy createdAt",
        populate: [
          {
            path: "listing",
            select: "title image1 image2 image3 image4 image5 description rent category city landmark isBooked host ratings",
            populate: {
              path: "host",
              select: "name email phone avatar bio socialLinks"
            }
          },
          {
            path: "guest",
            select: "name email phone avatar bio socialLinks"
          }
        ]
      });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("getCurrentUser error:", error);
    res.status(500).json({ message: `getCurrentUser error: ${error.message}` });
  }
};



export const updateProfile = async (req, res) => {
  try {
    const { email, password, ...updates } = req.body; // remove email/password from update

    const user = await User.findByIdAndUpdate(
      req.userId,
      { $set: updates },
      { new: true }
    ).select("-password");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const uploadAvatar = async (req, res) => {
    try {
        const avatarUrl = `/uploads/${req.file.filename}`; // Adjust based on your storage
        const user = await User.findByIdAndUpdate(
            req.userId,
            { $set: { avatar: avatarUrl } },
            { new: true }
        ).select("-password");
        
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getPublicProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select(
      "name email avatar bio socialLinks"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching public profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserProfileById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select("-password")
      .populate("listing", "_id") // ✅ Only need `_id` to detect host
      .populate("booking", "_id"); // ✅ Only need `_id` to detect guest

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

