import React, { useContext } from "react";
import { FaArrowLeft, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ListingDataContext } from "../Context/ListingContext";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function ListingPage3() {
  const navigate = useNavigate();
  const {
    title, description, rent, city, landmark, category,
    latitude, longitude,
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
    adding, handleAddListing
  } = useContext(ListingDataContext);

  console.log("🧭 Coordinates from context:", latitude, longitude);

  // Safer file change handler
  const handleFileChange = (e, previewSetter, fileSetter) => {
    const file = e.target.files?.[0];
    if (file && file instanceof Blob) {
      previewSetter(URL.createObjectURL(file));
      fileSetter(file);
    } else {
      console.warn("❗ Invalid or no file selected");
    }
  };

  const imageHandlers = [
    { setPreview: setFrontEndImage1, setFile: setBackEndImage1 },
    { setPreview: setFrontEndImage2, setFile: setBackEndImage2 },
    { setPreview: setFrontEndImage3, setFile: setBackEndImage3 },
    { setPreview: setFrontEndImage4, setFile: setBackEndImage4 },
    { setPreview: setFrontEndImage5, setFile: setBackEndImage5 }
  ];

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

      {/* Property Header */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{title?.toUpperCase()}</h1>
          <div className="flex items-center gap-1 text-gray-600">
            <FaMapMarkerAlt className="text-red-500" />
            <span>{landmark}, {city}</span>
          </div>
        </div>
        <div className="text-2xl font-bold text-red-600 bg-red-100 px-4 py-2 rounded-lg">
          ₹{rent}/per day
        </div>
      </div>

      {/* Image Grid */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Main Image */}
        <div className="md:col-span-2 row-span-2 h-96 overflow-hidden rounded-xl border-2 border-gray-200 relative">
          <input
            type="file"
            className="absolute z-10 opacity-0 w-full h-full cursor-pointer"
            onChange={(e) => handleFileChange(e, imageHandlers[0].setPreview, imageHandlers[0].setFile)}
          />
          {frontEndImage1 ? (
            <img src={frontEndImage1} alt="Main" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
              Click to upload main image
            </div>
          )}
        </div>

        {/* Other Images */}
        {[1, 2, 3, 4].map((idx) => (
          <div key={idx} className="h-48 overflow-hidden rounded-xl border-2 border-gray-200 relative">
            <input
              type="file"
              className="absolute z-10 opacity-0 w-full h-full cursor-pointer"
              onChange={(e) => handleFileChange(e, imageHandlers[idx].setPreview, imageHandlers[idx].setFile)}
            />
            {[frontEndImage2, frontEndImage3, frontEndImage4, frontEndImage5][idx - 1] ? (
              <img
                src={[frontEndImage2, frontEndImage3, frontEndImage4, frontEndImage5][idx - 1]}
                alt={`Preview ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
                Click to upload image {idx + 1}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="w-full max-w-4xl bg-gray-50 p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-3">Description</h2>
        <p className="text-gray-700">{description}</p>
      </div>

      {/* Location Map */}
      <div className="w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-3">Location</h2>
        {latitude && longitude ? (
          <div className="h-96 w-full rounded-xl overflow-hidden border-2 border-gray-200">
            <MapContainer
              center={[latitude, longitude]}
              zoom={15}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <Marker position={[latitude, longitude]}>
                <Popup>
                  <div className="font-bold">{title}</div>
                  <div>{landmark}, {city}</div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        ) : (
          <div className="h-48 w-full bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">
            📍 Location not available. Please go back and check address.
          </div>
        )}
      </div>

      {/* Publish Button */}
      <button
        onClick={handleAddListing}
        disabled={adding || !frontEndImage1 || !latitude || !longitude}
        className={`mt-6 px-8 py-3 rounded-full font-bold text-lg shadow-md transition ${
          adding ? 'bg-gray-400 cursor-not-allowed' :
          !frontEndImage1 || !latitude || !longitude ? 'bg-gray-300 text-gray-500 cursor-not-allowed' :
          'bg-red-600 hover:bg-red-700 text-white'
        }`}
      >
        {adding ? "Publishing..." : "Publish Listing"}
      </button>
    </div>
  );
}

export default ListingPage3;
