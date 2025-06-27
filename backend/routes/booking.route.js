import express from "express";
import isAuth from "../middleware/isAuth.js";
import {
  createBooking,
  cancelBooking,
  updateBookingStatuses,
  getMyBookings, // ✅ Import this
  getUnavailableDates,
  getBookingsByHost
} from "../controller/booking.controller.js"; // 👈 Make sure it's exported there

const bookingRouter = express.Router();

// ✅ Booking Routes
bookingRouter.post("/create/:id", isAuth, createBooking);
bookingRouter.delete("/cancel/:id", isAuth, cancelBooking);
bookingRouter.put("/update-statuses", updateBookingStatuses);
bookingRouter.get("/unavailable/:listingId", getUnavailableDates); // No auth required
bookingRouter.get("/my", isAuth, getMyBookings); // ✅ <-- ADD THIS
bookingRouter.get("/host", isAuth, getBookingsByHost);

export default bookingRouter;
