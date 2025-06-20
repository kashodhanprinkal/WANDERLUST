import React, { useContext, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { userDataContext } from '../Context/UserContext';
import { ListingDataContext } from '../Context/ListingContext';
import { useNavigate } from 'react-router-dom';
import { FaRegStar } from "react-icons/fa6";

function Card({
  id,
  title,
  landmark,
  rent,
  category,
  city,
  ratings,
  isBooked,
  host,
  images = [],
}) {
  const validImages = images.filter(Boolean);
  const [currentIndex, setCurrentIndex] = useState(0);
  let {userData}=useContext(userDataContext)
  let {handleViewCard} = useContext(ListingDataContext)
let navigate= useNavigate()

  const handleClick = ()=>{
    if(userData){
      handleViewCard(id)
    }
    else{
navigate("/login")
    }
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % validImages.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  // ✅ Handle no valid images with fallback image
  if (validImages.length === 0) {
    validImages.push('/fallback.jpg');
  }

  return (
    <div className="w-full sm:w-[250px] max-w-[90%] h-[350px] flex flex-col rounded-lg cursor-pointer shadow-md bg-white mt-[140px] "
    onClick={handleClick}>
      
      {/* Image Slider */}
      <div className="relative w-full h-[67%] bg-slate-200 rounded-lg overflow-hidden">
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
              onClick={prevImage}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={nextImage}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Dots */}
        <div className="absolute bottom-2 w-full flex justify-center gap-1">
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
    <div className="flex items-center text-red-600 text-lg ">
      <FaRegStar />
      <span className="ml-1">{ratings}</span> {/* Optional */}
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
