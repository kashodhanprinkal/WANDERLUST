import React, { useContext, useEffect, useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { userDataContext } from '../Context/UserContext';
import { authDataContext } from '../Context/AuthContext';
import { ReviewContext } from '../Context/ReviewContext';
import ReviewPopup from '../component/ReviewPopup';
import { FaStar, FaBan } from "react-icons/fa6";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyBooking() {
  const navigate = useNavigate();
  const { userData, reloadUser } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const { allReviews, fetchReviews, createReview, updateReview, deleteReview } = useContext(ReviewContext);

  const [activeListingId, setActiveListingId] = useState(null);
  const [popupData, setPopupData] = useState({});

  // ✅ Update status if booking is done
  useEffect(() => {
    const updateBookingStatusIfDone = async () => {
      try {
        await axios.put(`${serverUrl}/api/booking/update-statuses`, {}, { withCredentials: true });
        await reloadUser();
      } catch (error) {
        console.error("Error updating booking status:", error);
      }
    };
    updateBookingStatusIfDone();
  }, []);

  // ✅ Open Review Modal
  const openReviewPopup = async (listingId) => {
    await fetchReviews(listingId);
    const guestReview = allReviews[listingId]?.find(r => r.guest._id === userData._id);
    setPopupData({ listingId, guestReview });
    setActiveListingId(listingId);
  };

  // ✅ Submit Review
  const handleReviewSubmit = async ({ rating, reviewText }) => {
    const { guestReview } = popupData;
    if (guestReview) {
      await updateReview(guestReview._id, { rating, reviewText }, activeListingId);
    } else {
      await createReview(activeListingId, { rating, reviewText });
    }
  };

  // ✅ Delete Review
  const handleReviewDelete = async () => {
    const { guestReview } = popupData;
    if (guestReview) {
      await deleteReview(guestReview._id, activeListingId);
    }
  };

  // ✅ Cancel Booking
  const handleCancel = async (bookingId) => {
    try {
      const confirm = window.confirm("Are you sure you want to cancel this booking?");
      if (!confirm) return;

      const res = await axios.delete(`${serverUrl}/api/booking/cancel/${bookingId}`, {
        withCredentials: true
      });

      await reloadUser();
      toast.success(res.data.message || "Booking cancelled successfully!");
    } catch (err) {
      toast.error("Cancellation failed!");
      console.error("Cancel Error:", err.response?.data || err.message);
    }
  };

  return (
    <div className='w-full min-h-screen flex flex-col items-center p-4 bg-gray-50'>
      {/* Back Button */}
      <div
        className="w-12 h-12 bg-red-600 cursor-pointer rounded-full flex items-center justify-center fixed top-4 left-4"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft className="w-6 h-6 text-white" />
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mt-16 mb-6">Your Bookings</h1>

      {userData?.booking?.length === 0 ? (
        <p className="text-gray-600">No bookings yet!</p>
      ) : (
        <div className="grid gap-6 w-full max-w-4xl">
          {userData.booking.map((booking) => {
            const listingId = booking.listing?._id;
            const reviewsForListing = allReviews[listingId] || [];
            const guestReview = reviewsForListing.find(r => r.guest._id === userData._id);

            return (
              <div
                key={booking._id}
                className="border rounded-xl shadow-sm p-4 bg-white hover:shadow-md transition relative group"
              >
                {/* Listing Info */}
                <div className="flex gap-4">
                  <img
                    src={booking.listing?.image1 || "/fallback.jpg"}
                    alt={booking.listing?.title}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-800">{booking.listing?.title}</h2>
                    <p className="text-sm text-gray-500">{booking.listing?.city}, {booking.listing?.landmark}</p>
                    <p className="text-sm text-gray-500">Category: {booking.listing?.category}</p>
                    <p className="text-sm text-gray-500">Host: {booking.listing?.host?.name || booking.host}</p>
                  </div>
                </div>

                {/* Booking Meta */}
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-700">
                  <p><strong>Check-in:</strong> {new Date(booking.checkIn).toLocaleDateString()}</p>
                  <p><strong>Check-out:</strong> {new Date(booking.checkOut).toLocaleDateString()}</p>
                  <p><strong>Total Rent:</strong> ₹{booking.totalRent}</p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className={`font-semibold ${booking.status === "done"
                        ? "text-green-600"
                        : booking.status === "cancelled"
                          ? "text-red-600"
                          : "text-blue-600"
                      }`}>
                      {booking.status === "cancelled"
                        ? `Cancelled by ${booking.cancelledBy === "host" ? "Host" : "You"}`
                        : booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </p>
                  <p><strong>Booked On:</strong> {new Date(booking.createdAt).toLocaleDateString()}</p>
                </div>

                {/* ✅ Cancel Button (only if status is booked) */}
                {booking.status === "booked" && (
                  <div className="mt-4 flex gap-2 items-center">
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="flex items-center gap-1 text-white bg-red-500 hover:bg-red-600 transition px-3 py-1 rounded-full"
                    >
                      <FaBan className="w-4 h-4" /> Cancel Booking
                    </button>
                  </div>
                )}

                {/* Review Section */}
                {booking.status === "done" && (
                  <div className="mt-4 text-sm text-gray-800">
                    {!guestReview ? (
                      <button
                        onClick={() => openReviewPopup(listingId)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Write a Review
                      </button>
                    ) : (
                      <>
                        <p className="flex items-center gap-1">
                          <strong>Rating:</strong>
                          {[...Array(guestReview.rating)].map((_, i) => (
                            <FaStar key={i} className="text-yellow-500" />
                          ))}
                        </p>
                        <p><strong>Review:</strong> {guestReview.reviewText}</p>
                        <p className="text-xs text-gray-500">
                          Posted on {new Date(guestReview.createdAt).toLocaleString()}
                        </p>
                        <button
                          onClick={() => openReviewPopup(listingId)}
                          className="mt-2 bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700"
                        >
                          Edit Review
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Review Modal */}
      {activeListingId && (
        <ReviewPopup
          listingId={activeListingId}
          guestReview={popupData.guestReview}
          onSubmit={handleReviewSubmit}
          onDelete={handleReviewDelete}
          onClose={() => setActiveListingId(null)}
        />
      )}
    </div>
  );
}

export default MyBooking;
