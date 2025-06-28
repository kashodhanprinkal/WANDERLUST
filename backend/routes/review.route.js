import express from "express";
import isAuth from "../middleware/isAuth.js";
import {
  createReview,
  updateReview,
  deleteReview,
  getReviewsForListing,
} from "../controller/review.controller.js";

// Consistent router variable name
const reviewRouter = express.Router();

// ✅ Add a new review for a listing (guest only)
reviewRouter.post("/create/:id", isAuth, createReview);



// ✅ Update a review (only by the user who wrote it)
reviewRouter.put("/update/:id", isAuth, updateReview);

// ❌ Delete a review (only by the user who wrote it)
reviewRouter.delete("/delete/:id", isAuth, deleteReview);

// 📦 Get all reviews for a specific listing
reviewRouter.get("/listing/:listingId", getReviewsForListing);

export default reviewRouter;
