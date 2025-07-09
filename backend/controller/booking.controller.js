import mongoose from "mongoose";
import Booking from "../model/booking.model.js";
import Listing from "../model/listing.model.js";
import User from "../model/user.model.js";
import createNotification from "../utils/createNotification.js"
import sendEmail from "../utils/sendEmail.js";



// ✅ CREATE BOOKING
export const createBooking = async (req, res) => {
  try {
    const { id } = req.params; // Listing ID
    const { checkIn, checkOut, totalRent } = req.body;
    const userId = req.userId;

    const listing = await Listing.findById(id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    if (new Date(checkIn) >= new Date(checkOut))
      return res.status(400).json({ message: "Invalid dates" });

    const conflict = await Booking.findOne({
      listing: id,
      $or: [
        {
          checkIn: { $lte: new Date(checkOut) },
          checkOut: { $gte: new Date(checkIn) },
        },
      ],
    });

    if (conflict) return res.status(400).json({ message: "Listing is already booked for these dates" });

    const duplicate = await Booking.findOne({
      listing: id,
      guest: userId,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
    });

    if (duplicate)
      return res.status(400).json({ message: "You have already booked this listing for these dates" });

    const booking = await Booking.create({
      checkIn,
      checkOut,
      totalRent,
      host: listing.host,
      guest: userId,
      listing: listing._id,
      status: "booked",
    });

    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { booking: booking._id } },
      { new: true }
    );

    await createNotification({
      recipient: listing.host,
      sender: userId,
      type: "booking",
      message: `📅 New booking for "${listing.title}"`,
      listing: listing._id,
    });

    // ✅ Send confirmation email to guest
    await sendEmail({
      to: user.email,
      subject: `📢 Booking Confirmed: ${listing.title}`,
      html: `
        <h2>Booking Confirmation</h2>
        <p>Hi ${user.name},</p>
        <p>Your booking for <strong>${listing.title}</strong> has been confirmed.</p>
        <p><strong>Check-in:</strong> ${new Date(checkIn).toDateString()}</p>
        <p><strong>Check-out:</strong> ${new Date(checkOut).toDateString()}</p>
        <p><strong>Total Rent:</strong> ₹${totalRent}</p>
        <p>📍 Location: ${listing.landmark}, ${listing.city}</p>
        <br/>
        <p>Thank you for booking with Wanderlust!</p>
      `,
    });

    return res.status(201).json({
      message: "Booking is created",
      booking,
    });

  } catch (error) {
    console.error("❌ Booking creation error:", error);
    return res.status(500).json({ message: `Booking error: ${error.message}` });
  }
};


export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const currentUserId = req.userId;

    const booking = await Booking.findById(id)
      .populate("listing")
      .populate("guest", "email name")
      .populate("host", "email name");

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const listingHostId = booking.listing.host?.toString();
    const guestId = booking.guest?._id.toString();

    let cancelledBy = null;
    if (currentUserId === guestId) {
      cancelledBy = "guest";
    } else if (currentUserId === listingHostId) {
      cancelledBy = "host";
    } else {
      return res.status(403).json({ message: "Not authorized to cancel" });
    }

    booking.status = "cancelled";
    booking.cancelledBy = cancelledBy;
    await booking.save();

    const notifyRecipient = cancelledBy === "guest" ? listingHostId : guestId;

    await createNotification({
      recipient: notifyRecipient,
      sender: currentUserId,
      type: "cancellation",
      message: `Booking for ${booking.listing.title} was cancelled by ${cancelledBy}`,
      listing: booking.listing._id,
    });

    // ✅ Send cancellation email
    const cancelledUser = cancelledBy === "guest" ? booking.guest : booking.host;
    const receivingUser = cancelledBy === "guest" ? booking.host : booking.guest;

    await sendEmail({
      to: receivingUser.email,
      subject: `❌ Booking Cancelled: ${booking.listing.title}`,
      html: `
        <h2>Booking Cancelled</h2>
        <p>Hello ${receivingUser.name},</p>
        <p>The booking for <strong>${booking.listing.title}</strong> has been cancelled by the ${cancelledBy}.</p>
        <p><strong>Check-in:</strong> ${new Date(booking.checkIn).toDateString()}</p>
        <p><strong>Check-out:</strong> ${new Date(booking.checkOut).toDateString()}</p>
        <p>📍 Location: ${booking.listing.landmark}, ${booking.listing.city}</p>
        <br/>
        <p>Thanks for using Wanderlust!</p>
      `,
    });

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


