import React, { useContext, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { userDataContext } from '../Context/UserContext';
import { ListingDataContext } from '../Context/ListingContext';
import { bookingDataContext } from '../Context/BookingContext';
import { useNavigate } from 'react-router-dom';
import { FaRegStar } from "react-icons/fa6";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

function Card({
  id,
  title,
  landmark,
  rent,
  category,
  city,
  ratings,
  images = [],
}) {
  const validImages = images.filter(Boolean);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { userData } = useContext(userDataContext);
  const { handleViewCard } = useContext(ListingDataContext);
  const { isListingBookedByUser } = useContext(bookingDataContext);
  const navigate = useNavigate();

  const isBookedByUser = isListingBookedByUser(id);

  const handleClick = () => {
    if (userData) {
      handleViewCard(id);
    } else {
      navigate("/login");
    }
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % validImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  if (validImages.length === 0) {
    validImages.push('/fallback.jpg');
  }

  return (
    <div
      className="w-full sm:w-[250px] max-w-[90%] h-[350px] flex flex-col rounded-lg cursor-pointer shadow-md bg-white mt-[140px] z-0"
      onClick={handleClick}
    >
      {/* Image Slider */}
      <div className="relative w-full h-[67%] bg-slate-200 rounded-lg overflow-hidden">
        {/* ✅ Booked Label - Only for active bookings */}
        {isBookedByUser && (
          <div className="absolute top-2 right-2 bg-white text-green-700 flex items-center gap-1 px-2 py-[2px] rounded-full shadow-md text-xs font-semibold z-10">
            <IoCheckmarkDoneCircleSharp className="w-4 h-4 text-green-600" />
            Booked
          </div>
        )}

        <img
          src={validImages[currentIndex]}
          alt={`Image ${currentIndex + 1} for ${title}`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/fallback.jpg";
          }}
          className="w-full h-full object-cover transition-all duration-300"
        />

        {/* Arrows */}
        {validImages.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full z-10"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full z-10"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Dots */}
        <div className="absolute bottom-2 w-full flex justify-center gap-1 z-10">
          {validImages.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-400'}`}
            />
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="p-2 text-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg">{title}</h2>
          <div className="flex items-center text-red-600 text-lg">
            <FaRegStar />
            <span className="ml-1">{ratings}</span>
          </div>
        </div>
        <p><strong>City:</strong> {city}</p>
        <p><strong>Landmark:</strong> {landmark}</p>
        <p><strong>Category:</strong> {category}</p>
        <p><strong>Rent:</strong> ₹{rent}/per day</p>
      </div>
    </div>
  );
}

export default Card;
