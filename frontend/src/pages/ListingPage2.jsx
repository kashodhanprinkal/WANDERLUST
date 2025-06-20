import React, { useContext } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  FireIcon,
  HomeModernIcon,
  BuildingStorefrontIcon,
  CakeIcon,
  CubeTransparentIcon,
  BuildingLibraryIcon,
  SparklesIcon,
  SunIcon,
  BanknotesIcon,
  HomeIcon,
  TruckIcon,
  CloudIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/solid";
import { ListingDataContext } from "../Context/ListingContext";

function ListingPage2() {
  const { category, setCategory } = useContext(ListingDataContext); // ✅ Correct usage
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-white flex items-center justify-center relative">
      {/* Back Button */}
      <div
        className="w-12 h-12 bg-red-600 cursor-pointer absolute top-4 left-4 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition"
        onClick={() => navigate("/listingpage1")}
      >
        <FaArrowLeft className="w-6 h-6 text-white" />
      </div>

      {/* Main Container */}
      <div className="max-w-[900px] w-[90%] h-[600px] bg-slate-200 rounded-xl shadow-md flex flex-col items-center px-6 py-4 gap-4 overflow-y-auto">
        {/* Banner */}
        <div className="w-full text-center">
          <div className="inline-block px-6 py-2 bg-red-600 text-white text-lg font-semibold rounded-full shadow">
            What kind of place are you sharing with the world?
          </div>
        </div>

        {/* Category Grid */}
        <div className="w-full flex flex-wrap gap-4 justify-center mt-6">
          {/* Each category card */}
          {[
            { label: "Trending", value: "trending", Icon: FireIcon, color: "text-red-500" },
            { label: "Modern", value: "modern", Icon: HomeModernIcon, color: "text-gray-600" },
            { label: "City", value: "city", Icon: BuildingStorefrontIcon, color: "text-blue-500" },
            { label: "Events", value: "events", Icon: CakeIcon, color: "text-pink-500" },
            { label: "Design", value: "design", Icon: CubeTransparentIcon, color: "text-purple-500" },
            { label: "Historic", value: "historic", Icon: BuildingLibraryIcon, color: "text-brown-500" },
            { label: "Luxury", value: "luxury", Icon: SparklesIcon, color: "text-yellow-500" },
            { label: "Beach", value: "beach", Icon: SunIcon, color: "text-yellow-500" },
            { label: "Budget", value: "budget", Icon: BanknotesIcon, color: "text-green-600" },
            { label: "Homes", value: "homes", Icon: HomeIcon, color: "text-indigo-500" },
            { label: "Campers", value: "campers", Icon: TruckIcon, color: "text-orange-500" },
            { label: "Nature", value: "nature", Icon: CloudIcon, color: "text-teal-500" },
            { label: "Unique", value: "unique", Icon: RocketLaunchIcon, color: "text-purple-700" },
          ].map(({ label, value, Icon, color }) => (
            <div
              key={value}
              className={`w-[180px] h-[100px] flex flex-col justify-center items-center cursor-pointer border-[2px] ${
                category === value
                  ? "border-black bg-gray-100 shadow-md"
                  : "border-transparent bg-white shadow-sm"
              } hover:border-gray-400 text-[14px] rounded-lg transition`}
              onClick={() => setCategory(value)}
            >
              <Icon className={`w-8 h-8 mb-2 ${color}`} />
              {label}
            </div>
          ))}
        </div>

        {/* Next Button */}
       <button
  className={`mt-6 px-10 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition ${
    !category ? "cursor-not-allowed opacity-50" : ""
  }`}
  onClick={() => category && navigate("/listingpage3")} // Navigate to listingpage3 if category is selected
  disabled={!category} // Disable the button if no category is selected
>
  Next
</button>


      </div>
    </div>
  );
}

export default ListingPage2;




{/*<div
  className={`w-[180px] h-[100px] flex flex-col justify-center items-center cursor-pointer border-[2px] ${
    category === "trending" ? "border-black bg-gray-100 shadow-md" : "border-transparent bg-white shadow-sm"
  } hover:border-gray-400 text-[14px] rounded-lg transition`}
  onClick={() => setCategory("trending")}
>
  <FireIcon className="w-8 h-8 mb-2 text-red-500" />
  Trending
</div>
*/ }