import React, { useContext, useState, useEffect } from "react";
import { FaArrowLeft, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ListingDataContext } from "../Context/ListingContext";
import { userDataContext } from "../Context/UserContext";
import { ReviewContext } from "../Context/ReviewContext";
import UpdatePopup from "./UpdatePopup";
import BookingPopup from "./BookingPopup";

function ViewCard() {
  const navigate = useNavigate();
  const { cardDetails } = useContext(ListingDataContext);
  const { userData } = useContext(userDataContext);
  const { allReviews, fetchReviews } = useContext(ReviewContext);

  const [updatePopUp, setUpdatePopUp] = useState(false);
  const [bookingPopUp, setBookingPopUp] = useState(false);
  const [listingReviews, setListingReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      if (cardDetails?._id) {
        await fetchReviews(cardDetails._id);
        setListingReviews(allReviews[cardDetails._id] || []);
      }
    };
    getReviews();
  }, [cardDetails, allReviews]);

  if (!cardDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-xl">Loading listing details...</p>
      </div>
    );
  }

  const {
    title,
    description,
    rent,
    category,
    landmark,
    city,
    image1,
    image2,
    image3,
    image4,
    image5,
    host,
  } = cardDetails;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex flex-col items-center relative">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 w-12 h-12 bg-white border rounded-full flex items-center justify-center shadow hover:scale-105 transition"
      >
        <FaArrowLeft className="text-red-600 w-5 h-5" />
      </button>

      {/* Heading */}
      <h1 className="text-3xl font-bold text-red-600 mb-2 text-center">{title}</h1>
      <p className="text-gray-700 text-lg mb-6 text-center">
        {category?.toUpperCase()} · {landmark}, {city}
      </p>

      {/* Images */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="col-span-2 h-[300px] md:h-[400px] rounded-lg overflow-hidden border">
          {image1 ? (
            <img src={image1} alt="Main" className="w-full h-full object-cover" />
          ) : (
            <div className="flex justify-center items-center w-full h-full bg-gray-200 text-gray-500">No Image</div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          {[image2, image3].map((img, idx) => (
            <div key={idx} className="h-[145px] md:h-[195px] rounded-lg overflow-hidden border">
              {img ? (
                <img src={img} alt={`Side ${idx + 1}`} className="w-full h-full object-cover" />
              ) : (
                <div className="flex justify-center items-center w-full h-full bg-gray-200 text-gray-500">No Image</div>
              )}
            </div>
          ))}
        </div>
        {[image4, image5].map((img, idx) => (
          <div key={idx} className="h-[150px] rounded-lg overflow-hidden border">
            {img ? (
              <img src={img} alt={`Bottom ${idx + 1}`} className="w-full h-full object-cover" />
            ) : (
              <div className="flex justify-center items-center w-full h-full bg-gray-200 text-gray-500">No Image</div>
            )}
          </div>
        ))}
      </div>

      {/* Details */}
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md space-y-4 mb-6">
        <p className="text-xl font-semibold text-gray-800">{description}</p>
        <p className="text-lg text-gray-700">
          <span className="font-medium text-gray-900">Rent:</span> ₹{rent} / day
        </p>
        <div className="flex gap-4">
          {host === userData._id ? (
            <button
              onClick={() => setUpdatePopUp(true)}
              className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-full transition"
            >
              Edit Listing
            </button>
          ) : (
            <button
              onClick={() => setBookingPopUp(true)}
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-full transition"
            >
              Book Now
            </button>
          )}
        </div>
      </div>

      {/* Reviews */}
      {listingReviews.length > 0 && (
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Guest Reviews</h2>
          <div className="space-y-4">
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
        </div>
      )}

      {/* Popups */}
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
