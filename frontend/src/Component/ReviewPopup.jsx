import React, { useContext, useEffect, useState } from 'react';
import { FaStar } from "react-icons/fa6";
import { ReviewContext } from '../Context/ReviewContext';
import { toast } from 'react-toastify';

function ReviewPopup({ listingId, guestReview, onSubmit, onDelete, onClose }) {
  const { fetchReviews } = useContext(ReviewContext);

  const [rating, setRating] = useState(guestReview ? guestReview.rating : 0);
  const [reviewText, setReviewText] = useState(guestReview ? guestReview.reviewText : '');
  const [hoverRating, setHoverRating] = useState(0);
  const [isEditing, setIsEditing] = useState(!!guestReview);

  useEffect(() => {
    fetchReviews(listingId);
  }, [listingId]);

  const handleSubmit = async () => {
    try {
      console.log("Submitting Review:", { rating, reviewText });
      await onSubmit({ rating, reviewText });
      toast.success(isEditing ? "Review updated!" : "Review submitted!");
      onClose();
    } catch (err) {
      toast.error("Failed to submit review!");
      console.error("Error in submit:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete();
      toast.success("Review deleted!");
      onClose();
    } catch (err) {
      toast.error("Failed to delete review!");
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Edit Your Review" : "Write a Review"}
        </h2>

        <div className="mb-4">
          <label className="block font-medium mb-1">Rating:</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`cursor-pointer text-2xl ${star <= (hoverRating || rating) ? "text-yellow-500" : "text-gray-300"}`}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Review:</label>
          <textarea
            rows={4}
            className="w-full border px-3 py-2 rounded"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {isEditing ? "Update" : "Submit"}
          </button>

          {isEditing && (
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          )}

          <button
            onClick={onClose}
            className="text-gray-600 text-sm underline ml-auto"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewPopup;
