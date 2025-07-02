import React, { useContext, useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ListingDataContext } from "../Context/ListingContext";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icon URLs
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function ListingPage1() {
  const navigate = useNavigate();

  // ✅ Import values from context
  const {
    title, setTitle,
    description, setDescription,
    rent, setRent,
    city, setCity,
    landmark, setLandmark,
    country, setCountry,
    state, setState,
    category, setCategory,
    latitude, setLatitude,
    longitude, setLongitude,
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

  const [coordinates, setCoordinates] = useState(null);
  const [isMapLoading, setIsMapLoading] = useState(false);

  // ✅ Geocode address when location fields change
  useEffect(() => {
    const geocodeAddress = async () => {
      if (landmark && city && state && country) {
        setIsMapLoading(true);
        try {
          const fullAddress = `${landmark}, ${city}, ${state}, ${country}`;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}&limit=1`
          );
          const data = await response.json();
          if (data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lng = parseFloat(data[0].lon);
            console.log("✅ Geocoded lat/lng:", lat, lng);

            setCoordinates({ lat, lng });

            // ✅ Add this to update the context values
            setLatitude(lat);
            setLongitude(lng);
          }
        } catch (error) {
          console.error("Geocoding error:", error);
        } finally {
          setIsMapLoading(false);
        }
      }
    };

    const timer = setTimeout(geocodeAddress, 1000); // Debounce
    return () => clearTimeout(timer);
  }, [landmark, city, state, country]);

  useEffect(() => {
    console.log("📦 Coordinates from context:", latitude, longitude);
  }, [latitude, longitude]);

  // ✅ Image handlers
  const createImageHandler = (setBack, setFront) => (e) => {
    const file = e.target.files[0];
    setBack(file);
    setFront(URL.createObjectURL(file));
  };

  const imageHandlers = [
    createImageHandler(setBackEndImage1, setFrontEndImage1),
    createImageHandler(setBackEndImage2, setFrontEndImage2),
    createImageHandler(setBackEndImage3, setFrontEndImage3),
    createImageHandler(setBackEndImage4, setFrontEndImage4),
    createImageHandler(setBackEndImage5, setFrontEndImage5),
  ];

  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center relative">
      <form
        className="max-w-[900px] w-[90%] h-[90vh] flex flex-col items-start gap-5 overflow-y-auto px-4 py-6 shadow-lg border rounded-xl"
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/listingpage2");
        }}
      >
        {/* Back Button */}
        <div
          className="w-12 h-12 bg-red-600 cursor-pointer absolute top-4 left-4 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition"
          onClick={() => navigate("/")}
        >
          <FaArrowLeft className="w-6 h-6 text-white" />
        </div>

        {/* Title */}
        <div className="w-full">
          <label className="font-semibold">Title</label>
          <input
            className="w-full border px-3 py-2 rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div className="w-full">
          <label className="font-semibold">Description</label>
          <textarea
            className="w-full border px-3 py-2 rounded-lg"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Rent */}
        <div className="w-full">
          <label className="font-semibold">Rent</label>
          <input
            type="number"
            className="w-full border px-3 py-2 rounded-lg"
            value={rent}
            onChange={(e) => setRent(e.target.value)}
            required
          />
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div>
            <label>Country</label>
            <input
              className="w-full border px-3 py-2 rounded-lg"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          <div>
            <label>State</label>
            <input
              className="w-full border px-3 py-2 rounded-lg"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>
          <div>
            <label>City</label>
            <input
              className="w-full border px-3 py-2 rounded-lg"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Landmark</label>
            <input
              className="w-full border px-3 py-2 rounded-lg"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Map */}
        <div className="w-full h-64 border rounded-lg mt-4 overflow-hidden">
          {isMapLoading ? (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Loading map...
            </div>
          ) : coordinates ? (
            <MapContainer center={[coordinates.lat, coordinates.lng]} zoom={15} style={{ height: "100%", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[coordinates.lat, coordinates.lng]}>
                <Popup>
                  {landmark}<br />
                  {city}, {state}, {country}
                </Popup>
              </Marker>
            </MapContainer>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Enter address to see map
            </div>
          )}
        </div>

        {/* Images */}
        {[1, 2, 3, 4, 5].map((num, idx) => (
          <div key={num} className="w-full">
            <label>Image {num}</label>
            <input
              type="file"
              className="w-full border px-3 py-2 rounded-lg"
              onChange={imageHandlers[idx]}
              required={num === 1}
            />
          </div>
        ))}

        <button
          type="submit"
          className="mt-6 px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
        >
          Next
        </button>
      </form>
    </div>
  );
}

export default ListingPage1;
