import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMap as useMapContext } from "../Context/MapContext"; // Optional context use

// Fix Leaflet's default icon issue
const DefaultIcon = L.icon({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});
L.Marker.prototype.options.icon = DefaultIcon;

// Optional context fallback (not required for this case)
const useSafeMapContext = () => {
  try {
    const context = useMapContext();
    if (!context || typeof context !== "object") throw new Error();
    return context;
  } catch {
    return {
      location: {
        lat: null,
        lng: null,
        city: "",
        state: "",
        country: "",
        landmark: "",
      },
    };
  }
};

// 🗺️ Center updater
const MapUpdater = ({ center }) => {
  const map = useMap();
  React.useEffect(() => {
    if (center) {
      map.setView(center, 13);
    }
  }, [center, map]);
  return null;
};

const MapView = ({ listings = [] }) => {
  const center =
    listings.length > 0
      ? [listings[0].latitude, listings[0].longitude]
      : null;

  if (!center) {
    return <p className="text-red-500">📍 Location unavailable</p>;
  }

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={true}
      style={{
        height: "350px",
        width: "100%",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {listings.map((listing, index) => (
        <Marker
          key={index}
          position={[listing.latitude, listing.longitude]}
        >
          <Popup>
            <div className="font-bold">{listing.title}</div>
            <div>Rent: ₹{listing.rent} / day</div>
            <div className="text-sm mt-1 text-gray-600">
              {listing.landmark}, {listing.city}, {listing.state}, {listing.country}
            </div>
          </Popup>
        </Marker>
      ))}

      <MapUpdater center={center} />
    </MapContainer>
  );
};

export default MapView;
