import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMap as useMapContext, MapProvider } from "../Context/MapContext"; // Renamed useMap to useMapContext

// Fix default icon issue
const DefaultIcon = L.icon({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});
L.Marker.prototype.options.icon = DefaultIcon;

// ➕ Safe context fallback
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

// 🔄 Updates map center on change
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
  const { location } = useSafeMapContext();

  const center =
    location.lat && location.lng
      ? [location.lat, location.lng]
      : listings[0]
        ? [listings[0].latitude, listings[0].longitude]
        : null;

  if (!center) {
    return <p className="text-red-500">📍 Location unavailable</p>;
  }

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={false}
      style={{
        height: "300px",
        width: "100%",
        borderRadius: "1rem",
        marginTop: "1rem",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Marker for current location */}
      {location.lat && location.lng && (
        <Marker position={[location.lat, location.lng]}>
          <Popup>
            {location.landmark && <div className="font-bold">{location.landmark}</div>}
            <div>{location.city}, {location.state}</div>
            <div>{location.country}</div>
          </Popup>
        </Marker>
      )}

      {/* Additional listings */}
      {listings.map((listing, index) => (
        <Marker
          key={index}
          position={[listing.latitude, listing.longitude]}
        >
          <Popup>
            <div className="font-bold">{listing.title}</div>
            <div>₹{listing.rent}/month</div>
          </Popup>
        </Marker>
      ))}

      <MapUpdater center={center} />
    </MapContainer>
  );
};

export default MapView;
