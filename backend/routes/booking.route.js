import express from "express";
import isAuth from "../middleware/isAuth.js";
import {
  createBooking,
  cancelBooking,
  updateBookingStatuses,
} from "../controller/booking.controller.js";

const bookingRouter = express.Router();

// ✅ Routes
bookingRouter.post("/create/:id", isAuth, createBooking);
bookingRouter.delete("/cancel/:id", isAuth, cancelBooking);

// ✅ (optional) Admin or internal trigger to mark completed bookings
bookingRouter.put("/update-statuses", updateBookingStatuses);

export default bookingRouter;
