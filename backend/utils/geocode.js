// utils/geocode.js
import axios from "axios";

/**
 * Convert address to { lat, lng } using OpenStreetMap Nominatim API
 * @param {string} address - Full address (e.g., "Landmark, City, State, Country")
 * @returns {Promise<{ lat: number, lng: number } | null>}
 */
export const getLatLngFromAddress = async (address) => {
  try {
    const response = await axios.get("https://nominatim.openstreetmap.org/search", {
      params: {
        q: address,
        format: "json",
        limit: 1,
      },
      headers: {
  "User-Agent": process.env.USER_AGENT
},

    });

    if (response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return {
        lat: parseFloat(lat),
        lng: parseFloat(lon),
      };
    } else {
      return null;
    }
  } catch (err) {
    console.error("❌ Geocoding failed:", err.message);
    return null;
  }
};
