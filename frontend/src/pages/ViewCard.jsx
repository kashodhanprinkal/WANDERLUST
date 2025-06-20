import React, { useContext, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ListingDataContext } from "../Context/ListingContext";
import { userDataContext } from "../Context/UserContext";
import UpdatePopup from "./UpdatePopup"; 
import BookingPopup from "./BookingPopup";

function ViewCard() {
  const navigate = useNavigate();
  const { cardDetails } = useContext(ListingDataContext);
  const { userData } = useContext(userDataContext);

  const [updatePopUp, setUpdatePopUp] = useState(false);
  const [bookingPopUp, setBookingPopUp] = useState(false);

  if (!cardDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-xl">Loading details...</p>
      </div>
    );
  }

  // Destructure images from cardDetails to pass to image tags
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
    <div className="min-h-screen bg-white flex flex-col items-center gap-6 py-6 px-4 overflow-auto relative">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition"
      >
        <FaArrowLeft className="text-white w-6 h-6" />
      </button>

      {/* Banner */}
      <div className="w-full max-w-xl bg-red-600 text-white text-center py-2 rounded-full font-semibold shadow">
        Set the stage for great memories — your guests await!
      </div>

      {/* Location Preview */}
      <div className="w-full max-w-4xl text-xl md:text-2xl font-medium text-gray-800">
        {`in ${landmark?.toUpperCase() || ""}, ${city?.toUpperCase() || ""} `}
      </div>

      {/* Images Preview */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-4">
        {/* Main Image */}
        <div className="md:w-2/3 w-full h-[300px] overflow-hidden border rounded-lg">
          {image1 ? (
            <img src={image1} alt="Main" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
              No Image
            </div>
          )}
        </div>
        {/* Side Images */}
        <div className="md:w-1/3 w-full flex flex-col gap-4">
          {[image2, image3].map((img, idx) => (
            <div key={idx} className="w-full h-[145px] overflow-hidden border rounded-lg">
              {img ? (
                <img src={img} alt={`Side ${idx + 1}`} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                  No Image
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Images */}
      <div className="w-full max-w-5xl flex flex-row gap-4">
        {[image4, image5].map((img, idx) => (
          <div key={idx} className="w-1/2 h-[150px] overflow-hidden border rounded-lg">
            {img ? (
              <img src={img} alt={`Bottom ${idx + 1}`} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                No Image
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="w-full max-w-4xl text-lg md:text-2xl text-gray-900 font-semibold mt-4">
        {`${title?.toUpperCase() || ""} - ${category?.toUpperCase() || ""}, ${landmark?.toUpperCase() || ""}`}
      </div>
      <div className="w-full max-w-4xl text-md md:text-xl text-gray-700 mt-2">
        {description || "No description available."}
      </div>
      <div className="w-full max-w-4xl text-md md:text-xl text-red-600 font-bold mt-2">
        ₹{rent || "-"} / per day
      </div>

      {/* Action Buttons */}
     <div className="flex gap-4 mt-4">


  {host === userData._id && (
    <button
      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition"
      onClick={() => setUpdatePopUp(true)}
    >
      Edit
    </button>
  )}


  {host !== userData._id && (
    <button
      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition"
      onClick={() => setBookingPopUp(true)}
    >
      Booking
    </button>
  )}
</div>

{/* Update Popup */}
{updatePopUp && (
  <UpdatePopup
    cardDetails={cardDetails}
    onClose={() => setUpdatePopUp(false)}
  />
)}

{/* Booking Popup */}
{bookingPopUp && (
  <BookingPopup
    cardDetails={cardDetails}
    onClose={() => setBookingPopUp(false)}  // <-- Corrected here
  />
)}

    </div>
  );
}

export default ViewCard;
