import uploadOnCloudinary from "../config/cloudinary.js";
import Listing from "../model/listing.model.js";
import User from "../model/user.model.js";
import { getLatLngFromAddress } from "../utils/geocode.js";

// ✅ CREATE Listing with Geolocation
export const addListing = async (req, res) => {
  try {
    console.log("📦 req.body:", req.body);
    console.log("🖼️ req.files:", req.files);
    console.log("🙋‍♂️ userId:", req.userId);

    const host = req.userId;
    const { title, description, rent, city, state, country, landmark, category } = req.body;

    const fullAddress = `${landmark}, ${city}, ${state}, ${country}`;
    const location = await getLatLngFromAddress(fullAddress);
    if (!location) {
      return res.status(400).json({ message: "Could not get geolocation from address" });
    }

    const image1 = req.files?.image1?.[0] ? await uploadOnCloudinary(req.files.image1[0].path) : null;
    const image2 = req.files?.image2?.[0] ? await uploadOnCloudinary(req.files.image2[0].path) : null;
    const image3 = req.files?.image3?.[0] ? await uploadOnCloudinary(req.files.image3[0].path) : null;
    const image4 = req.files?.image4?.[0] ? await uploadOnCloudinary(req.files.image4[0].path) : null;
    const image5 = req.files?.image5?.[0] ? await uploadOnCloudinary(req.files.image5[0].path) : null;

    const listing = await Listing.create({
      title,
      description,
      rent,
      city,
      state,
      country,
      landmark,
      category,
      latitude: location.lat,
      longitude: location.lng,
      image1: image1 ? image1.url : null,
      image2: image2 ? image2.url : null,
      image3: image3 ? image3.url : null,
      image4: image4 ? image4.url : null,
      image5: image5 ? image5.url : null,
      host,
    });

    const user = await User.findByIdAndUpdate(
      host,
      { $push: { listing: listing._id } },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    res.status(201).json(listing);
  } catch (error) {
    console.error("❌ Error in addListing:", error);
    res.status(500).json({ message: `Add listing failed: ${error.message}` });
  }
};

// ✅ READ - All Listings
export const getListing = async (req, res) => {
  try {
    const listing = await Listing.find().sort({ createdAt: -1 });
    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ message: `getListing error ${error}` });
  }
};

// ✅ READ - Single Listing by ID
export const findListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ message: `findListing error ${error}` });
  }
};

// ✅ UPDATE Listing + Update Lat/Lng if Address Changed
export const updateListing = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, rent, city, state, country, landmark, category } = req.body;

    const existingListing = await Listing.findById(id);
    if (!existingListing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Re-geocode only if address changed
    let newLat = existingListing.latitude;
    let newLng = existingListing.longitude;

    const addressChanged =
      city !== existingListing.city ||
      state !== existingListing.state ||
      country !== existingListing.country ||
      landmark !== existingListing.landmark;

    if (addressChanged) {
      const fullAddress = `${landmark}, ${city}, ${state}, ${country}`;
      const location = await getLatLngFromAddress(fullAddress);
      if (!location) {
        return res.status(400).json({ message: "Failed to update geolocation" });
      }
      newLat = location.lat;
      newLng = location.lng;
    }

    const image1 = req.files?.image1?.[0] ? await uploadOnCloudinary(req.files.image1[0].path) : null;
    const image2 = req.files?.image2?.[0] ? await uploadOnCloudinary(req.files.image2[0].path) : null;
    const image3 = req.files?.image3?.[0] ? await uploadOnCloudinary(req.files.image3[0].path) : null;
    const image4 = req.files?.image4?.[0] ? await uploadOnCloudinary(req.files.image4[0].path) : null;
    const image5 = req.files?.image5?.[0] ? await uploadOnCloudinary(req.files.image5[0].path) : null;

    const updatedData = {
      title,
      description,
      rent,
      city,
      state,
      country,
      landmark,
      category,
      latitude: newLat,
      longitude: newLng,
      image1: image1 ? image1.url : existingListing.image1,
      image2: image2 ? image2.url : existingListing.image2,
      image3: image3 ? image3.url : existingListing.image3,
      image4: image4 ? image4.url : existingListing.image4,
      image5: image5 ? image5.url : existingListing.image5,
    };

    const updatedListing = await Listing.findByIdAndUpdate(id, updatedData, { new: true });

    return res.status(200).json({ message: "Listing updated successfully", listing: updatedListing });
  } catch (error) {
    console.error("❌ Update error:", error);
    return res.status(500).json({ message: `Update failed: ${error.message}` });
  }
};

// ✅ DELETE Listing
export const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(
      listing.host,
      { $pull: { listing: listing._id } },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    return res.status(201).json({ message: "Listing deleted" });
  } catch (error) {
    return res.status(500).json({ message: `delete listing error ${error}` });
  }
};
export const search =async(req,res)=>{
  try {
    const { query } = req.query;
    if (!query){
      return res.status(400).json({message:"Search Query is required"})
    }
    const listing = await Listing.find({
      $or:[
        { landmark : {$regex: query, $options:"i"}},
        { city : {$regex: query, $options:"i"}},
        { title : {$regex: query, $options:"i"}},
        { state : {$regex: query, $options:"i"}},
        { country : {$regex: query, $options:"i"}},
      ]
    });
    return res.status(200).json(listing);
  } catch (error) {
    console.error("search error:",error);
   return res.status(500).json({message:"internal serever error"});
  }
}


