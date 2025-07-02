import React, { useState } from "react";
import { TbXboxX } from "react-icons/tb";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MapView from "../Component/MapView";
import toast from "react-hot-toast";

const serverUrl = "http://localhost:8000";

function UpdatePopup({ cardDetails, onClose }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState(cardDetails.title || "");
  const [description, setDescription] = useState(cardDetails.description || "");
  const [rent, setRent] = useState(cardDetails.rent || "");

  const location = {
    landmark: cardDetails.landmark,
    city: cardDetails.city,
    state: cardDetails.state,
    country: cardDetails.country,
    lat: cardDetails.latitude,
    lng: cardDetails.longitude
  };

  const category = cardDetails.category || "";

  const [backEndImages, setBackEndImages] = useState({});
  const [frontEndImages, setFrontEndImages] = useState({
    image1: cardDetails.image1,
    image2: cardDetails.image2,
    image3: cardDetails.image3,
    image4: cardDetails.image4,
    image5: cardDetails.image5
  });

  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    if (!file) return;
    setBackEndImages(prev => ({ ...prev, [key]: file }));
    setFrontEndImages(prev => ({ ...prev, [key]: URL.createObjectURL(file) }));
  };

 const handleUpdateListing = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("rent", rent);

    // 🛠️ Include all other required fields even if readonly
    formData.append("city", location.city);
    formData.append("state", location.state);
    formData.append("country", location.country);
    formData.append("landmark", location.landmark);
    formData.append("category", category);

    Object.entries(backEndImages).forEach(([key, file]) => {
      if (file) formData.append(key, file);
    });

    const result = await axios.put(
      `${serverUrl}/api/listing/update/${cardDetails._id}`,
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    toast.success("✅ Listing updated!");
    onClose();
    navigate("/mylisting");
  } catch (error) {
    console.error("❌ Error updating:", error);
    toast.error("Update failed. Try again.");
  }
};


  const handleDeleteListing = async () => {
    try {
      await axios.delete(`${serverUrl}/api/listing/delete/${cardDetails._id}`, {
        withCredentials: true
      });
      toast.success("✅ Listing deleted");
      navigate("/");
    } catch (error) {
      console.error("❌ Delete failed:", error);
      toast.error("Delete failed.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="relative bg-white max-w-4xl w-full rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
        <button
          onClick={onClose}
          className="absolute top-3 left-4 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow hover:scale-110 transition duration-200"
        >
          <TbXboxX className="text-white w-6 h-6" />
        </button>

        <div className="bg-gradient-to-r from-red-600 to-red-500 text-white text-center py-4 text-2xl font-semibold">
          Update Your Listing
        </div>

        <form onSubmit={handleUpdateListing} className="overflow-y-auto max-h-[80vh] px-8 py-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">Title</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="input input-bordered" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} required className="input input-bordered resize-none" rows={3} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">Rent</label>
            <input type="number" value={rent} onChange={e => setRent(e.target.value)} required className="input input-bordered" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-gray-700">Category</label>
              <input type="text" value={category} disabled readOnly className="input bg-gray-100" />
            </div>
            <div>
              <label className="font-semibold text-gray-700">City</label>
              <input type="text" value={location.city} disabled readOnly className="input bg-gray-100" />
            </div>
            <div>
              <label className="font-semibold text-gray-700">State</label>
              <input type="text" value={location.state} disabled readOnly className="input bg-gray-100" />
            </div>
            <div>
              <label className="font-semibold text-gray-700">Country</label>
              <input type="text" value={location.country} disabled readOnly className="input bg-gray-100" />
            </div>
            <div className="col-span-2">
              <label className="font-semibold text-gray-700">Landmark</label>
              <input type="text" value={location.landmark} disabled readOnly className="input bg-gray-100" />
            </div>
          </div>

          <div>
            <label className="font-semibold text-gray-700">Map View</label>
            <div className="mt-2 rounded-lg overflow-hidden border border-gray-300 shadow-sm">
<MapView
  listings={
    cardDetails.latitude !== undefined && cardDetails.longitude !== undefined
      ? [{ ...cardDetails }]
      : []
  }
/>

            </div>
          </div>

          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num} className="flex flex-col gap-2">
              <label className="font-semibold text-gray-700">Image {num}</label>
              <input
                type="file"
                onChange={(e) => handleImageChange(e, `image${num}`)}
                accept="image/*"
                className="file-input file-input-bordered"
              />
              {frontEndImages[`image${num}`] && (
                <img
                  src={frontEndImages[`image${num}`]}
                  alt="Preview"
                  className="mt-2 h-40 w-full object-cover rounded-lg border"
                />
              )}
            </div>
          ))}

          <div className="flex justify-center gap-6 mt-6">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow"
            >
              Update Listing
            </button>
            <button
              type="button"
              onClick={handleDeleteListing}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg shadow"
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
