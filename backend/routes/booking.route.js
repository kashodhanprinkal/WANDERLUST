import express from "express";
import isAuth from "../middleware/isAuth.js";
import {
  createBooking,
  cancelBooking,
  updateBookingStatuses,
  getMyBookings, // ✅ Import this
  getUnavailableDates
} from "../controller/booking.controller.js"; // 👈 Make sure it's exported there

const bookingRouter = express.Router();

// ✅ Booking Routes
bookingRouter.post("/create/:id", isAuth, createBooking);
bookingRouter.delete("/cancel/:id", isAuth, cancelBooking);
bookingRouter.put("/update-statuses", updateBookingStatuses);
bookingRouter.get("/unavailable/:listingId", getUnavailableDates); // No auth required


// ✅ NEW: Get all bookings of the current user (used in BookingContext)
bookingRouter.get("/my", isAuth, getMyBookings); // ✅ <-- ADD THIS

export default bookingRouter;
