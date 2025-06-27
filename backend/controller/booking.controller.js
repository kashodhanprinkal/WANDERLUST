import mongoose from "mongoose";
import Booking from "../model/booking.model.js";
import Listing from "../model/listing.model.js";
import User from "../model/user.model.js";

// ✅ CREATE BOOKING
export const createBooking = async (req, res) => {
  try {
    const { id } = req.params; // Listing ID
    const { checkIn, checkOut, totalRent } = req.body;
    const userId = req.userId; // From isAuth middleware

    console.log("✅ Authenticated userId:", userId);
    console.log("💬 Incoming booking data:", { id, checkIn, checkOut, totalRent });

    // Validate listing
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Validate dates
    if (new Date(checkIn) >= new Date(checkOut)) {
      return res.status(400).json({ message: "Invalid check-in and check-out dates" });
    }

    // 🔍 Check for overlapping bookings
    const conflictingBooking = await Booking.findOne({
      listing: id,
      $or: [
        {
          checkIn: { $lte: new Date(checkOut) },
          checkOut: { $gte: new Date(checkIn) },
        },
      ],
    });

    if (conflictingBooking) {
      return res.status(400).json({ message: "Listing is already booked for selected dates" });
    }

    // Prevent duplicate exact bookings by the same user
    const existingBooking = await Booking.findOne({
      listing: id,
      guest: userId,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
    });

    if (existingBooking) {
      return res.status(400).json({ message: "You have already booked this listing for these dates" });
    }

    // ✅ Create the booking
    const booking = await Booking.create({
      checkIn,
      checkOut,
      totalRent,
      host: new mongoose.Types.ObjectId(listing.host),
      guest: new mongoose.Types.ObjectId(userId),
      listing: new mongoose.Types.ObjectId(listing._id),
      status: "booked", // 👈 Make sure this is set
    });

    console.log("✅ Booking created:", booking);

    // ✅ Add booking to user
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { booking: booking._id } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(201).json({
      message: "Booking is created",
      booking,
    });

  } catch (error) {
    console.error("❌ Booking creation error:", error);
    return res.status(500).json({ message: `Booking error: ${error.message}` });
  }
};

// ❌ FIXED CANCEL BOOKING
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const currentUserId = req.userId;

    const booking = await Booking.findById(id).populate("listing");
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const listingHostId = booking.listing.host?.toString();
    const guestId = booking.guest?.toString();

    // 🧠 Determine who is cancelling
    let cancelledBy = null;
    if (currentUserId === guestId) {
      cancelledBy = "guest";
    } else if (currentUserId === listingHostId) {
      cancelledBy = "host";
    } else {
      return res.status(403).json({ message: "You are not authorized to cancel this booking." });
    }

    // ❌ DON'T remove from user's bookings – this causes it to disappear from MyBookings
    // await User.findByIdAndUpdate(guestId, {
    //   $pull: { booking: booking._id },
    // });

    // ✅ Mark as cancelled and set who cancelled
    booking.status = "cancelled";
    booking.cancelledBy = cancelledBy;
    await booking.save();

    return res.status(200).json({ message: `Booking cancelled by ${cancelledBy}` });

  } catch (error) {
    console.error("❌ Booking cancel error:", error);
    return res.status(500).json({ message: "Booking cancel error" });
  }
};





// ✅ UPDATE STATUS TO 'DONE' AFTER CHECKOUT
export const updateBookingStatuses = async (req, res) => {
  try {
    const now = new Date();

    const result = await Booking.updateMany(
      {
        checkOut: { $lt: now },
        status: "booked",
      },
      {
        $set: { status: "done" },
      }
    );

    res.status(200).json({
      message: "Booking statuses updated to 'done'",
      updatedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("❌ Booking status update failed:", error);
    res.status(500).json({ message: "Failed to update booking statuses", error: error.message });
  }
};

// ✅ GET MY BOOKINGS
export const getMyBookings = async (req, res) => {
  try {
    const userId = req.userId;

    const bookings = await Booking.find({ guest: userId })
      .populate("listing") // Include full listing details
      .sort({ checkIn: -1 }); // Optional: recent first

    res.status(200).json(bookings);
  } catch (error) {
    console.error("❌ Failed to get user bookings:", error);
    res.status(500).json({ message: "Failed to get bookings" });
  }
};
// ✅ GET UNAVAILABLE DATES FOR A LISTING
export const getUnavailableDates = async (req, res) => {
  try {
    const { listingId } = req.params;

    const bookings = await Booking.find({
      listing: listingId,
      status: { $ne: "cancelled" }, // Only active bookings
    }).select("checkIn checkOut");

    const unavailable = bookings.map((booking) => ({
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
    }));

    res.status(200).json(unavailable);
  } catch (error) {
    console.error("❌ Failed to fetch unavailable dates:", error);
    res.status(500).json({ message: "Failed to get unavailable dates" });
  }
};

// ✅ GET BOOKINGS BY HOST
export const getBookingsByHost = async (req, res) => {
  try {
    const hostId = req.userId;

    const bookings = await Booking.find({ host: hostId })
      .populate("guest", "name email")
      .populate("listing", "title city image1")
      .sort({ checkIn: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("❌ Failed to fetch host bookings:", error);
    res.status(500).json({ message: "Failed to get bookings" });
  }
};


