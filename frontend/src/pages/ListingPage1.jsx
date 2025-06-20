import React, { useContext } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ListingDataContext } from "../Context/ListingContext";

function ListingPage1() {
  let navigate = useNavigate();
  let{
    title, setTitle,
    description, setDescription,
    rent, setRent,
    city, setCity,
    landmark, setLandmark,
    category, setCategory,
    frontEndImage1, setFrontEndImage1,
    frontEndImage2, setFrontEndImage2,
    frontEndImage3, setFrontEndImage3,
    frontEndImage4, setFrontEndImage4,
    frontEndImage5, setFrontEndImage5,
    backEndImage1, setBackEndImage1,
    backEndImage2, setBackEndImage2,
    backEndImage3, setBackEndImage3,
    backEndImage4, setBackEndImage4,
    backEndImage5, setBackEndImage5,
  } = useContext(ListingDataContext);
  
  const handleImage1 = (e) => {
  let file = e.target.files[0];
  setBackEndImage1(file);
  setFrontEndImage1(URL.createObjectURL(file));
};

const handleImage2 = (e) => {
  let file = e.target.files[0];
  setBackEndImage2(file);
  setFrontEndImage2(URL.createObjectURL(file));
};

const handleImage3 = (e) => {
  let file = e.target.files[0];
  setBackEndImage3(file);
  setFrontEndImage3(URL.createObjectURL(file));
};

const handleImage4 = (e) => {
  let file = e.target.files[0];
  setBackEndImage4(file);
  setFrontEndImage4(URL.createObjectURL(file));
};

const handleImage5 = (e) => {
  let file = e.target.files[0];
  setBackEndImage5(file);
  setFrontEndImage5(URL.createObjectURL(file));
};

const imageHandlers = [
  handleImage1,
  handleImage2,
  handleImage3,
  handleImage4,
  handleImage5,
];


  return (
  <div className="w-full h-screen bg-white flex items-center justify-center relative">
    <form
      action=""
      className="max-w-[900px] w-[90%] h-[600px] flex flex-col items-start gap-5 overflow-y-auto px-4 py-6 shadow-lg border rounded-xl"
      onSubmit={(e)=>{e.preventDefault()
        navigate("/listingpage2")}
      }
    >
      {/* Back Button */}
      <div
        className="w-12 h-12 bg-red-600 cursor-pointer absolute top-4 left-4 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft className="w-6 h-6 text-white" />
      </div>

      {/* Banner */}
      <div className="w-full bg-red-600 text-white text-center py-2 rounded-full font-semibold shadow">
        Open your doors to the world — and your wallet.
      </div>

      {/* Title Input */}
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="title" className="text-lg font-medium">
          Title
        </label>
        <input
          type="text"
          id="title"
          className="w-full h-12 border-2 border-gray-600 rounded-lg text-base px-4"
          required onChange={(e)=>setTitle(e.target.value)} value={title}
        />
      </div>

      {/* Description */}
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="description" className="text-lg font-medium">
          Description
        </label>
        <textarea
          id="description"
          className="w-full h-24 border-2 border-gray-600 rounded-lg text-base px-4 py-2 resize-none"
          required onChange={(e)=>setDescription(e.target.value)} value={description}
        />
      </div>

      {/* Rent */}
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="rent" className="text-lg font-medium">
          Rent
        </label>
        <input
          type="number"
          id="rent"
          className="w-full h-12 border-2 border-gray-600 rounded-lg text-base px-4"
          required onChange={(e)=>setRent(e.target.value)} value={rent}
        />
      </div>

      {/* City */}
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="city" className="text-lg font-medium">
          City
        </label>
        <input
          type="text"
          id="city"
          className="w-full h-12 border-2 border-gray-600 rounded-lg text-base px-4"
          required onChange={(e)=>setCity(e.target.value)} value={city}
        />
      </div>

      {/* Landmark */}
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="landmark" className="text-lg font-medium">
          Landmark
        </label>
        <input
          type="text"
          id="landmark"
          className="w-full h-12 border-2 border-gray-600 rounded-lg text-base px-4"
          required onChange={(e)=>setLandmark(e.target.value)} value={landmark}
        />
      </div>

        {/* category 
      <div className="w-full flex flex-col gap-2">
        <label htmlFor="category" className="text-lg font-medium">
          Category
        </label>
        <input
          type="text"
          id="category"
          className="w-full h-12 border-2 border-gray-600 rounded-lg text-base px-4"
          required onChange={(e)=>setCategory(e.target.value)} value={category}
        />
      </div>*/}

      {/* Image Uploads */}
      {[1, 2, 3, 4, 5].map((num, idx) => (
  <div key={num} className="w-full flex flex-col gap-2">
    <label htmlFor={`image${num}`} className="text-lg font-medium">
      Image {num}
    </label>
    <input
      type="file"
      id={`image${num}`}
      onChange={imageHandlers[idx]}
      className="w-full h-10 border-2 border-gray-500 rounded-lg text-sm px-3 py-1"
      required
    />
  </div>
))}


      <button className="mt-6 px-10 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition">
          Next
        </button>
    </form>
  </div>
);

}

export default ListingPage1;
