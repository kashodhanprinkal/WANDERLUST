import React, { useContext } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ListingDataContext } from "../Context/ListingContext";

function ListingPage3() {
  const navigate = useNavigate();
  const {
    title, description, rent, city, landmark, category,
    frontEndImage1, setFrontEndImage1,
    frontEndImage2, setFrontEndImage2,
    frontEndImage3, setFrontEndImage3,
    frontEndImage4, setFrontEndImage4,
    frontEndImage5, setFrontEndImage5,
    setImage1, setImage2, setImage3, setImage4, setImage5,
    adding, setAdding,
    handleAddListing
  } = useContext(ListingDataContext);

  const handleFileChange = (e, previewSetter, fileSetter) => {
    const file = e.target.files[0];
    if (file) {
      previewSetter(URL.createObjectURL(file)); // for UI preview
      fileSetter(file); // for backend upload
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center gap-6 py-6 px-4 overflow-auto relative">
      {/* Back Button */}
      <button
        onClick={() => navigate("/listingpage2")}
        className="absolute top-4 left-4 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition"
      >
        <FaArrowLeft className="text-white w-6 h-6" />
      </button>

      {/* Banner */}
      <div className="w-full max-w-xl bg-red-600 text-white text-center py-2 rounded-full font-semibold shadow">
        Make sure it's perfect — your future guests are watching!
      </div>

      {/* Location Preview */}
      <div className="w-full max-w-4xl text-xl md:text-2xl font-medium text-gray-800">
        {`in ${landmark?.toUpperCase()}, ${city?.toUpperCase()}`}
      </div>

      {/* Image Upload + Preview */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-4">
        <div className="md:w-2/3 w-full h-[300px] overflow-hidden border relative">
          <input type="file" className="absolute z-10 opacity-0 w-full h-full cursor-pointer"
            onChange={(e) => handleFileChange(e, setFrontEndImage1, setImage1)} />
          {frontEndImage1 && <img src={frontEndImage1} alt="Main" className="w-full h-full object-cover" />}
        </div>
        <div className="md:w-1/3 w-full flex flex-col gap-4">
          <div className="w-full h-[145px] overflow-hidden border relative">
            <input type="file" className="absolute z-10 opacity-0 w-full h-full cursor-pointer"
              onChange={(e) => handleFileChange(e, setFrontEndImage2, setImage2)} />
            {frontEndImage2 && <img src={frontEndImage2} alt="Side 1" className="w-full h-full object-cover" />}
          </div>
          <div className="w-full h-[145px] overflow-hidden border relative">
            <input type="file" className="absolute z-10 opacity-0 w-full h-full cursor-pointer"
              onChange={(e) => handleFileChange(e, setFrontEndImage3, setImage3)} />
            {frontEndImage3 && <img src={frontEndImage3} alt="Side 2" className="w-full h-full object-cover" />}
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl flex flex-row gap-4">
        <div className="w-1/2 h-[150px] overflow-hidden border relative">
          <input type="file" className="absolute z-10 opacity-0 w-full h-full cursor-pointer"
            onChange={(e) => handleFileChange(e, setFrontEndImage4, setImage4)} />
          {frontEndImage4 && <img src={frontEndImage4} alt="Bottom 1" className="w-full h-full object-cover" />}
        </div>
        <div className="w-1/2 h-[150px] overflow-hidden border relative">
          <input type="file" className="absolute z-10 opacity-0 w-full h-full cursor-pointer"
            onChange={(e) => handleFileChange(e, setFrontEndImage5, setImage5)} />
          {frontEndImage5 && <img src={frontEndImage5} alt="Bottom 2" className="w-full h-full object-cover" />}
        </div>
      </div>

      {/* Info */}
      <div className="w-full max-w-4xl text-lg md:text-2xl text-gray-900 font-semibold">
        {`${title?.toUpperCase()} -  ${category?.toUpperCase()}, ${landmark?.toUpperCase()}`}
      </div>
      <div className="w-full max-w-4xl text-md md:text-xl text-gray-700">
        {description}
      </div>
      <div className="w-full max-w-4xl text-md md:text-xl text-red-600 font-bold">
        ₹{rent}/per day
      </div>

      {/* Submit Button */}
      <button
        onClick={handleAddListing}
        disabled={adding}
        className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition"
      >
       
       {adding? "adding...": "add Listing"}
      </button>
    </div>
  );
}

export default ListingPage3;
