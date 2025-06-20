// controller/user.controller.js
import User from '../model/user.model.js';

export const getCurrentUser = async (req, res) => {
  try {
    console.log("userId from isAuth:", req.userId);

    const user = await User.findById(req.userId)
      .select("-password")
      .populate("listing", "title image1 image2 image3 image4 image5 description rent category city landmark isBooked host ratings")
      .populate({
        path: "booking",
        populate: {
          path: "listing",
          select: "title image1 image2 image3 image4 image5 description rent category city landmark isBooked host ratings"
        }
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


{/*import User from '../model/user.model.js';

export const getCurrentUser = async (req, res) => {
    try {
        console.log("userId from isAuth:", req.userId); // 👈 Add this
        const user = await User.findById(req.userId).select("-password").populate("listing","title image1 image2 image3 image4 image5 description rent category city landmark isBooked host ratings");
.populate("Booking","title image1 image2 image3 image4 image5 description rent category city landmark isBooked host ratings")
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("getCurrentUser error:", error);  // Log error for better debugging
        res.status(500).json({ message: `getCurrentUser error: ${error.message}` });
    }
};*/}
