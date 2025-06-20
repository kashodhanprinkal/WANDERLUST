import Review from "../model/review.model.js";
import Listing from "../model/listing.model.js";
import User from "../model/user.model.js";
import mongoose from "mongoose";

export const createReview = async (req, res) => {
  try {
    const { listingId } = req.params;
    const { rating, reviewText } = req.body; // ✅ fixed here
    const userId = req.userId;

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const alreadyReviewed = await Review.findOne({ listing: listingId, guest: userId });
    if (alreadyReviewed) {
      return res.status(400).json({ message: "You already reviewed this listing." });
    }

    const review = await Review.create({
      guest: userId,
      listing: listingId,
      rating,
      reviewText, // ✅ fixed here
    });

    // Update average rating
    const allReviews = await Review.find({ listing: listingId });
    const avgRating =
      allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length;
    listing.ratings = avgRating;
    await listing.save();

    res.status(201).json({ message: "Review added", review });
  } catch (error) {
    res.status(500).json({ message: "Failed to create review", error: error.message });
  }
};


// 🔁 UPDATE a review (only guest can do this)
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment, rating } = req.body;
    const userId = req.userId;

    const review = await Review.findById(id);
    if (!review || review.guest.toString() !== userId) {
      return res.status(403).json({ message: "Not allowed to update this review" });
    }

    review.comment = comment || review.comment;
    review.rating = rating || review.rating;
    await review.save();

    res.status(200).json({ message: "Review updated", review });
  } catch (error) {
    res.status(500).json({ message: "Failed to update review", error: error.message });
  }
};

// ❌ DELETE a review (only guest)
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const review = await Review.findById(id);
    if (!review || review.guest.toString() !== userId) {
      return res.status(403).json({ message: "Not allowed to delete this review" });
    }

    await review.remove();
    res.status(200).json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete review", error: error.message });
  }
};

// 📦 GET all reviews for a listing
export const getReviewsForListing = async (req, res) => {
  try {
    const { listingId } = req.params;

    const reviews = await Review.find({ listing: listingId })
      .populate("guest", "name") // include guest name
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews", error: error.message });
  }
};
