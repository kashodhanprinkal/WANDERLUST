import express from "express";
import axios from "axios";
import { getLatLngFromAddress } from "../utils/geocode.js"; // ✅ Fixed import path

const geocodeRouter = express.Router();

/**
 * GET /api/geocode/suggestions
 * Dynamic suggestions for country, state, city, landmark
 */
geocodeRouter.get("/suggestions", async (req, res) => {
  const { type, query = "", country, state, city } = req.query;

  if (!type || !query) {
    return res.status(400).json({ error: "Missing required 'type' or 'query'" });
  }

  let context = query;
  if (type === "state" && country) context += `, ${country}`;
  if (type === "city" && state && country) context += `, ${state}, ${country}`;
  if (type === "landmark" && city && state && country) context += `, ${city}, ${state}, ${country}`;

  try {
    const response = await axios.get("https://nominatim.openstreetmap.org/search", {
      params: {
        q: context,
        format: "json",
        addressdetails: 1,
        limit: 10,
      },
      headers: {
        "User-Agent": "WunderlustApp/1.0 (prinkal@example.com)",
      },
    });

    const suggestions = [...new Set(
      response.data.map((place) => {
        const addr = place.address;
        if (type === "country") return addr.country;
        if (type === "state") return addr.state;
        if (type === "city") return addr.city || addr.town || addr.village;
        if (type === "landmark") return addr.road || addr.neighbourhood || place.display_name.split(",")[0];
      }).filter(Boolean)
    )];

    res.json(suggestions);
  } catch (err) {
    console.error("❌ Suggestions fetch error:", err.message);
    res.status(500).json({ error: "Failed to fetch suggestions" });
  }
});

/**
 * POST /api/geocode
 * Convert address to coordinates
 */
geocodeRouter.post('/', async (req, res) => {
  try {
    const { address } = req.body;
    
    if (!address) {
      return res.status(400).json({ error: "Address is required" });
    }

    const location = await getLatLngFromAddress(address);
    
    if (!location) {
      return res.status(404).json({ error: "Address not found" });
    }

    res.json({
      latitude: location.lat,
      longitude: location.lng,
    });
  } catch (err) {
    console.error("❌ Geocoding error:", err);
    res.status(500).json({ 
      error: "Geocoding failed",
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

export default geocodeRouter;