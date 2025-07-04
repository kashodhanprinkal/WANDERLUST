import React, { useContext, useState, useEffect } from "react";
import { FaArrowLeft, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ListingDataContext } from "../Context/ListingContext";
import { userDataContext } from "../Context/UserContext";
import { ReviewContext } from "../Context/ReviewContext";
import UpdatePopup from "./UpdatePopup";
import BookingPopup from "./BookingPopup";
import MapView from "../Component/MapView";

function ViewCard() {
  const navigate = useNavigate();
  const { cardDetails } = useContext(ListingDataContext);
  const { userData } = useContext(userDataContext);
  const { allReviews, fetchReviews } = useContext(ReviewContext);

  const [updatePopUp, setUpdatePopUp] = useState(false);
  const [bookingPopUp, setBookingPopUp] = useState(false);
  const [listingReviews, setListingReviews] = useState([]);

  useEffect(() => {
    if (cardDetails?._id) {
      fetchReviews(cardDetails._id).then(() => {
        setListingReviews(allReviews[cardDetails._id] || []);
      });
    }
  }, [cardDetails, allReviews]);

  if (!cardDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">
        Loading listing details...
      </div>
    );
  }

  const {
    _id,
    title,
    description,
    rent,
    category,
    landmark,
    city,
    state,
    country,
    image1,
    image2,
    image3,
    image4,
    image5,
    latitude,
    longitude,
    host,
  } = cardDetails;

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16 px-4 md:px-12">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-4 left-4 w-11 h-11 bg-white border shadow rounded-full flex items-center justify-center hover:scale-105 transition z-50"
      >
        <FaArrowLeft className="text-red-600" />
      </button>

      {/* Title + Location */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-red-600">{title}</h1>
        <p className="text-gray-600 text-lg mt-1">
          {category?.toUpperCase()} · {landmark}, {city}, {state}
        </p>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto mb-8">
        <div className="col-span-2 rounded-lg overflow-hidden border h-[300px] md:h-[400px]">
          <img src={image1} alt="Main" className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col gap-4">
          {[image2, image3].map((img, idx) => (
            <div key={idx} className="h-[145px] md:h-[195px] rounded-lg overflow-hidden border">
              <img src={img} alt={`Side ${idx + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        {[image4, image5].map((img, idx) => (
          <div key={idx} className="h-[150px] rounded-lg overflow-hidden border">
            <img src={img} alt={`Bottom ${idx + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* Description + Booking */}
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-md space-y-5 mb-10">
        <p className="text-xl text-gray-800">{description}</p>
        <p className="text-lg font-medium text-gray-900">₹{rent} / day</p>
        <div className="flex gap-4">
          {userData?._id === host ? (
            <button
              onClick={() => setUpdatePopUp(true)}
              className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-full transition"
            >
              ✏️ Edit Listing
            </button>
          ) : (
            <button
              onClick={() => setBookingPopUp(true)}
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-full transition"
            >
              🛎 Book Now
            </button>
          )}
        </div>
      </div>

      {/* 🌍 MapView */}
      <div className="max-w-4xl mx-auto mb-10">
        <MapView
          listings={[
            {
              title,
              rent,
              latitude,
              longitude,
              landmark,
              city,
              state,
              country,
            },
          ]}
        />
      </div>

      {/* ⭐ Reviews */}
      {listingReviews.length > 0 && (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Guest Reviews</h2>
          {listingReviews.map((review) => (
            <div key={review._id} className="border rounded-md p-4 bg-gray-50 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-700">{review.guest?.name}</p>
                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(review.rating)].map((_, idx) => (
                    <FaStar key={idx} />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mt-2">{review.reviewText}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {updatePopUp && (
        <UpdatePopup cardDetails={cardDetails} onClose={() => setUpdatePopUp(false)} />
      )}
      {bookingPopUp && (
        <BookingPopup cardDetails={cardDetails} onClose={() => setBookingPopUp(false)} />
      )}
    </div>
  );
}

export default ViewCard;
