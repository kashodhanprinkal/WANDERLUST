import Review from "../model/review.model.js";
import Listing from "../model/listing.model.js";
import User from "../model/user.model.js";
import mongoose from "mongoose";

export const createReview = async (req, res) => {
  try {
    console.log("➡️ Create Review Called");
    console.log("Params:", req.params);         // should show: { id: 'listingId' }
    console.log("Body:", req.body);             // should show: { rating: number, reviewText: string }
    console.log("User ID:", req.userId);        // should be valid userId

    const { id: listingId } = req.params;
    const { rating, reviewText } = req.body;
    const userId = req.userId;

    if (!rating || !reviewText) {
      console.log("❌ Missing rating or reviewText");
      return res.status(400).json({ message: "Rating and review text are required." });
    }

    const listing = await Listing.findById(listingId);
    if (!listing) {
      console.log("❌ Listing not found");
      return res.status(404).json({ message: "Listing not found" });
    }

    const alreadyReviewed = await Review.findOne({ listing: listingId, guest: userId });
    if (alreadyReviewed) {
      console.log("❌ Already reviewed by user");
      return res.status(400).json({ message: "You already reviewed this listing." });
    }

    const review = await Review.create({
      guest: userId,
      listing: listingId,
      rating,
      reviewText,
    });

    const allReviews = await Review.find({ listing: listingId });
    const avgRating = allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length;
    listing.ratings = avgRating;
    await listing.save();

    console.log("✅ Review created:", review);
    res.status(201).json({ message: "Review added", review });
  } catch (error) {
    console.error("❌ Review creation failed:", error);
    res.status(500).json({ message: "Failed to create review", error: error.message });
  }
};



// 🔁 UPDATE a review (only guest can do this)
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { reviewText, rating } = req.body; // ✅ corrected
    const userId = req.userId;

    const review = await Review.findById(id);
    if (!review || review.guest.toString() !== userId) {
      return res.status(403).json({ message: "Not allowed to update this review" });
    }

    review.reviewText = reviewText || review.reviewText; // ✅ corrected
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
