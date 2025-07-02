import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ListingDataContext = createContext();

function ListingProvider({ children }) {
  // Basic listing info
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rent, setRent] = useState("");
  const [category, setCategory] = useState("");

  // Location info
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // Image handling (frontend previews)
  const [frontEndImage1, setFrontEndImage1] = useState(null);
  const [frontEndImage2, setFrontEndImage2] = useState(null);
  const [frontEndImage3, setFrontEndImage3] = useState(null);
  const [frontEndImage4, setFrontEndImage4] = useState(null);
  const [frontEndImage5, setFrontEndImage5] = useState(null);

  // Image handling (actual file objects for backend)
  const [backEndImage1, setBackEndImage1] = useState(null);
  const [backEndImage2, setBackEndImage2] = useState(null);
  const [backEndImage3, setBackEndImage3] = useState(null);
  const [backEndImage4, setBackEndImage4] = useState(null);
  const [backEndImage5, setBackEndImage5] = useState(null);

  // Listing state
  const [listingData, setListingData] = useState([]);
  const [newListData, setNewListData] = useState([]);
  const [adding, setAdding] = useState(false);
  const [cardDetails, setCardDetails] = useState(null);

  // Status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);

  // ✅ Add new listing using multipart/form-data
  const handleAddListing = async () => {
    try {
      setLoading(true);
      setError(null);

      // 🧭 Geocode if no coordinates present
      let finalLat = latitude;
      let finalLng = longitude;
      if (!latitude || !longitude) {
        const fullAddress = `${landmark}, ${city}, ${state}, ${country}`;
        const response = await axios.post(`${serverUrl}/api/geocode`, { address: fullAddress }, { withCredentials: true });
        finalLat = response.data.latitude;
        finalLng = response.data.longitude;
        setLatitude(finalLat);
        setLongitude(finalLng);
      }

      // 🧾 Construct form data for multipart submission
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("rent", rent);
      formData.append("category", category);
      formData.append("landmark", landmark);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("country", country);
      formData.append("latitude", finalLat);
      formData.append("longitude", finalLng);

      // ✅ Required fields (5 images)
      formData.append("image1", backEndImage1);
      formData.append("image2", backEndImage2);
      formData.append("image3", backEndImage3);
      formData.append("image4", backEndImage4);
      formData.append("image5", backEndImage5);

      const { data } = await axios.post(`${serverUrl}/api/listing/add`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      // Success
  // ✅ Show toast and redirect
setAdding(prev => !prev);
toast.success("Listing created successfully! Redirecting to My Listings...");

setTimeout(() => {
  navigate("/mylisting");
}, 2000); // 2 second delay

resetForm();
return data;


    } catch (error) {
      console.error("Listing creation failed:", error);
      const msg = error.response?.data?.message || error.message || "Failed to add listing";
      setError(msg);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Reset form and images
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setRent("");
    setCategory("");
    setLandmark("");
    setCity("");
    setState("");
    setCountry("");
    setLatitude(null);
    setLongitude(null);

    setFrontEndImage1(null);
    setFrontEndImage2(null);
    setFrontEndImage3(null);
    setFrontEndImage4(null);
    setFrontEndImage5(null);

    setBackEndImage1(null);
    setBackEndImage2(null);
    setBackEndImage3(null);
    setBackEndImage4(null);
    setBackEndImage5(null);

    setError(null);
  };

  // ✅ View listing card by ID
  const handleViewCard = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`${serverUrl}/api/listing/findlistingbyid/${id}`, {
        withCredentials: true,
      });
      setCardDetails(res.data);
      navigate("/viewcard");
    } catch (error) {
      console.error("Error loading listing:", error);
      setError("Failed to load listing details");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load all listings
  const getListing = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${serverUrl}/api/listing/get`, { withCredentials: true });
      setListingData(res.data);
      setNewListData(res.data);
    } catch (error) {
      console.error("Error fetching listings:", error);
      setError("Failed to load listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListing();
  }, [adding]);

  const value = {
    // Form fields
    title, setTitle,
    description, setDescription,
    rent, setRent,
    category, setCategory,
    landmark, setLandmark,
    city, setCity,
    state, setState,
    country, setCountry,
    latitude, setLatitude,
    longitude, setLongitude,

    // Image fields
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

    // Listing data
    listingData,
    newListData,
    cardDetails, setCardDetails,
    adding, setAdding,

    // Status
    loading,
    error, setError,

    // Functions
    handleAddListing,
    resetForm,
    handleViewCard,
    getListing
  };

  return (
    <ListingDataContext.Provider value={value}>
      {children}
    </ListingDataContext.Provider>
  );
}

export { ListingProvider, ListingDataContext };
