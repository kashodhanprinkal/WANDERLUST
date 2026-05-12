import axios from "axios";

export const getLatLngFromAddress = async (address) => {
  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: address,
          format: "json",
          limit: 1,
        },
        headers: {
          // ✅ FIX: hardcoded safe user-agent (IMPORTANT)
          "User-Agent": "wanderlust-app",
        },
      }
    );

    console.log("🌍 GEO RESPONSE:", response.data);

    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];

      return {
        lat: parseFloat(lat),
        lng: parseFloat(lon),
      };
    }

    return null;

  } catch (err) {
    console.error("❌ Geocoding failed:", err.message);
    return null;
  }
};