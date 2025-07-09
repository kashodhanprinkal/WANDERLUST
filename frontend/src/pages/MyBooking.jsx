import React, { useContext, useEffect, useState } from 'react';
import { FaArrowLeft, FaStar, FaBan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { userDataContext } from '../Context/UserContext';
import { authDataContext } from '../Context/AuthContext';
import { ReviewContext } from '../Context/ReviewContext';
import ReviewPopup from '../Component/ReviewPopup';
import ProfileModal from '../Component/ProfileModal';
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
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // 🔄 Update statuses (like "done") on mount
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

  // ✍️ Open Review Modal
  const openReviewPopup = async (listingId) => {
    const reviews = await fetchReviews(listingId);
    const guestReview = reviews.find(r => r.guest && r.guest._id === userData._id);
    setPopupData({ listingId, guestReview });
    setActiveListingId(listingId);
  };

  // 📩 Submit review (new or update)
  const handleReviewSubmit = async ({ rating, reviewText }) => {
    const { guestReview } = popupData;
    if (guestReview) {
      await updateReview(guestReview._id, { rating, reviewText }, activeListingId);
    } else {
      await createReview(activeListingId, { rating, reviewText });
    }
  };

  // 🗑️ Delete review
  const handleReviewDelete = async () => {
    const { guestReview } = popupData;
    if (guestReview) {
      await deleteReview(guestReview._id, activeListingId);
    }
  };

  // ❌ Cancel Booking
  const handleCancel = async (bookingId) => {
    try {
      const confirm = window.confirm("Are you sure you want to cancel this booking?");
      if (!confirm) return;
      const res = await axios.delete(`${serverUrl}/api/booking/cancel/${bookingId}`, { withCredentials: true });
      await reloadUser();
      toast.success(res.data.message || "Booking cancelled successfully!");
    } catch (err) {
      toast.error("Cancellation failed!");
      console.error("Cancel Error:", err.response?.data || err.message);
    }
  };

  return (
    <div className='w-full min-h-screen flex flex-col items-center p-4 bg-gray-50'>

      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate("/")}
        className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center fixed top-4 left-4"
      >
        <FaArrowLeft className="text-white w-6 h-6" />
      </button>

      <h1 className="text-3xl font-bold text-gray-800 mt-16 mb-6">Your Bookings</h1>

      {/* 🔄 Booking List */}
      {userData?.booking?.length === 0 ? (
        <p className="text-gray-600">No bookings yet!</p>
      ) : (
        <div className="grid gap-6 w-full max-w-4xl">
          {userData.booking.map((booking) => {
            const listing = booking.listing;
            const host = listing?.host;
            const listingId = listing?._id;
            const guestReview = (allReviews[listingId] || []).find(
              r => r.guest && r.guest._id === userData._id
            );

            return (
              <div
                key={booking._id}
                className="border rounded-xl shadow-sm p-4 bg-white hover:shadow-md transition"
              >
                {/* 🏠 Listing Info */}
                <div className="flex gap-4">
                  <img
                    src={listing?.image1 || "/fallback.jpg"}
                    alt={listing?.title}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-800">{listing?.title}</h2>
                    <p className="text-sm text-gray-500">{listing?.city}, {listing?.landmark}</p>
                    <p className="text-sm text-gray-500">Category: {listing?.category}</p>
                    {host && (
                      <p
                        className="text-sm text-blue-600 underline cursor-pointer mt-1"
                        onClick={() => {
                          setSelectedUserId(host._id);
                          setShowModal(true);
                        }}
                      >
                        View Host
                      </p>
                    )}
                  </div>
                </div>

                {/* 📅 Booking Info */}
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-700">
                  <p><strong>Check-in:</strong> {new Date(booking.checkIn).toLocaleDateString()}</p>
                  <p><strong>Check-out:</strong> {new Date(booking.checkOut).toLocaleDateString()}</p>
                  <p><strong>Total Rent:</strong> ₹{booking.totalRent}</p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className={`font-semibold ${
                      booking.status === "done" ? "text-green-600"
                        : booking.status === "cancelled" ? "text-red-600"
                        : "text-blue-600"
                    }`}>
                      {booking.status === "cancelled"
                        ? `Cancelled by ${booking.cancelledBy === "host" ? "Host" : "You"}`
                        : booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </p>
                  <p><strong>Booked On:</strong> {new Date(booking.createdAt).toLocaleDateString()}</p>
                </div>

                {/* ❌ Cancel Button */}
                {booking.status === "booked" && (
                  <div className="mt-4">
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="flex items-center gap-1 text-white bg-red-500 hover:bg-red-600 transition px-3 py-1 rounded-full"
                    >
                      <FaBan className="w-4 h-4" /> Cancel Booking
                    </button>
                  </div>
                )}

                {/* ⭐ Review Section */}
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

      {/* ✍️ Review Popup */}
      {activeListingId && (
        <ReviewPopup
          listingId={activeListingId}
          guestReview={popupData.guestReview}
          onSubmit={handleReviewSubmit}
          onDelete={handleReviewDelete}
          onClose={() => setActiveListingId(null)}
        />
      )}

      {/* 👤 Host Profile Modal */}
      {showModal && selectedUserId && (
        <ProfileModal
          userId={selectedUserId}
          serverUrl={serverUrl} // ✅ important fix
          onClose={() => {
            setSelectedUserId(null);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}

export default MyBooking;
