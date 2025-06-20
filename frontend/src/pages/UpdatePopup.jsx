import React, { useState } from "react";
import { TbXboxX } from "react-icons/tb";
import axios from "axios";
import { useNavigate } from "react-router-dom";


// Base server URL for your API
const serverUrl = "http://localhost:8000";

function UpdatePopup({ cardDetails, onClose }) {
  const navigate = useNavigate();

  // Initialize all form states with existing card details or empty strings
  const [title, setTitle] = useState(cardDetails.title || "");
  const [description, setDescription] = useState(cardDetails.description || "");
  const [rent, setRent] = useState(cardDetails.rent || "");
  const [landmark, setLandmark] = useState(cardDetails.landmark || "");
  const [city, setCity] = useState(cardDetails.city || "");
 

  // Images to send to backend (actual File objects)
  const [backEndImages, setBackEndImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
  });

  // Frontend preview images (URLs)
  const [frontEndImages, setFrontEndImages] = useState({
    image1: cardDetails.image1 || null,
    image2: cardDetails.image2 || null,
    image3: cardDetails.image3 || null,
    image4: cardDetails.image4 || null,
    image5: cardDetails.image5 || null,
  });

  // Called when user selects a new file for an image input
  const handleImageChange = (e, imageKey) => {
    const file = e.target.files[0]; // grab selected file
    if (!file) return; // if no file, do nothing

    // Update the backend file object for upload
    setBackEndImages((prev) => ({ ...prev, [imageKey]: file }));

    // Create a temporary URL for preview and update frontend images state
    setFrontEndImages((prev) => ({ ...prev, [imageKey]: URL.createObjectURL(file) }));
  };

  // Called when form is submitted to update listing
  const handleUpdateListing = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("rent", rent);
    formData.append("landmark", landmark);
    formData.append("city", city);
    formData.append("category", category);

    Object.entries(backEndImages).forEach(([key, file]) => {
      if (file) formData.append(key, file);
    });

    const result = await axios.post(
      `${serverUrl}/api/listing/update/${cardDetails._id}`,
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    console.log("✅ Listing updated:", result.data.message);

    onClose();       // close popup
    navigate("/");   // redirect to home page

  } catch (error) {
    console.error("❌ Error updating listing:", error);
    alert("Failed to update listing. Please try again.");
  }
};

const handleDeleteListing = async () => {
  try {
    const result = await axios.delete(
      `${serverUrl}/api/listing/delete/${cardDetails._id}`,
      {
        withCredentials: true,
      }
    );
    
    console.log("✅ Deleted:", result.data.message);

    // Optionally redirect or refresh
    // For example, go to homepage after deletion:
    window.location.href = "/";

  } catch (error) {
    console.error("❌ Delete failed:", error);
    alert("Failed to delete listing.");
  }
};


  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
    >
      <div className="relative bg-white max-w-3xl w-full rounded-2xl shadow-xl overflow-hidden flex flex-col">
        {/* Close button on top-left */}
        <button
          onClick={onClose}
          className="absolute top-2 left-4 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow hover:scale-110 transition z-20"
          aria-label="Close"
        >
          <TbXboxX className="text-white w-6 h-6" />
        </button>

        {/* Header bar */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-red-600 to-red-500 text-white text-center py-3 text-xl font-semibold shadow rounded-t-2xl">
          Update Your Listing
        </div>

        {/* Form content with scroll if overflow */}
        <form
          onSubmit={handleUpdateListing}
          className="overflow-y-auto max-h-[80vh] px-6 py-6 flex flex-col gap-6"
        >
          {/* Title input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="text-base font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description textarea */}
          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="text-base font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              className="border border-gray-400 rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-red-400"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Rent input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="rent" className="text-base font-medium text-gray-700">
              Rent
            </label>
            <input
              type="number"
              id="rent"
              className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              required
              value={rent}
              onChange={(e) => setRent(e.target.value)}
            />
          </div>

          {/* City input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="city" className="text-base font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              id="city"
              className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          {/* Landmark input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="landmark" className="text-base font-medium text-gray-700">
              Landmark
            </label>
            <input
              type="text"
              id="landmark"
              className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              required
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
            />
          </div>

          {/* Category input *
          <div className="flex flex-col gap-1">
            <label htmlFor="category" className="text-base font-medium text-gray-700">
              Category
            </label>
            <input
              type="text"
              id="category"
              className="border border-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>/}

          {/* Image uploads with previews */}
          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num} className="flex flex-col gap-1">
              <label
                htmlFor={`image${num}`}
                className="text-base font-medium text-gray-700"
              >
                Image {num}
              </label>
              <input
                type="file"
                id={`image${num}`}
                className="border border-gray-400 rounded-md px-4 py-2 text-sm"
                onChange={(e) => handleImageChange(e, `image${num}`)}
                accept="image/*"
              />
              {/* Show preview only if image URL is present */}
              {frontEndImages[`image${num}`] && (
                <img
                  src={frontEndImages[`image${num}`]}
                  alt={`Preview ${num}`}
                  className="mt-2 h-32 w-full object-cover rounded-md"
                />
              )}
            </div>
          ))}

          {/* Submit button */}
          <div className="w-full text-center gap-[40px] flex justify-center  ">
            <button
              type="submit"
              className="bg-slate-900 text-white font-semibold px-8 py-2 rounded-lg hover:bg-slate-800 transition"
            >
              Update Listing
            </button>
            <button
  type="button"
  onClick={handleDeleteListing}
  className="bg-red-600 text-white font-semibold px-8 py-2 rounded-lg hover:bg-red-700 transition"
>
  Delete Listing
</button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdatePopup;
