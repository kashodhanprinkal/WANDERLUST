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
  const [searchData, setSearchData]= useState(null)
const handleReset = () => {
  setSearchData(null);            
  setNewListData(listingData);   
  toast.success("Reset to all listings ✈️");
};



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

    // 🔍 Debug address (IMPORTANT)
    console.log("📍 Address data:", {
      landmark,
      city,
      state,
      country,
    });

    // 🚨 Validate required fields
    if (!title || !description || !rent || !landmark || !city || !state || !country) {
      toast.error("Please fill all required fields");
      return;
    }

    // 🧭 Get coordinates if missing
    let finalLat = latitude;
    let finalLng = longitude;

    if (finalLat == null || finalLng == null) {
      const fullAddress = `${landmark}, ${city}, ${state}, ${country}`;

      const response = await axios.post(
        `${serverUrl}/api/geocode`,
        { address: fullAddress },
        { withCredentials: true }
      );

      finalLat = response.data.latitude;
      finalLng = response.data.longitude;

      setLatitude(finalLat);
      setLongitude(finalLng);
    }

    // 📦 FormData
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

    // 📸 Images (safe append)
    if (backEndImage1) formData.append("image1", backEndImage1);
    if (backEndImage2) formData.append("image2", backEndImage2);
    if (backEndImage3) formData.append("image3", backEndImage3);
    if (backEndImage4) formData.append("image4", backEndImage4);
    if (backEndImage5) formData.append("image5", backEndImage5);

    // 🚀 API CALL (FIXED - NO AUTH HEADER)
    const { data } = await axios.post(
      `${serverUrl}/api/listing/add`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("✅ SUCCESS:", data);

    setAdding(true);
    toast.success("Listing created successfully!");

    setTimeout(() => {
      navigate("/mylisting");
    }, 1500);

    resetForm();

    return data;

  } catch (error) {
    console.log("❌ FULL ERROR:", error);

    if (error.response) {
      console.log("STATUS:", error.response.status);
      console.log("DATA:", error.response.data);
      toast.error(error.response.data.message || "Failed to create listing");
    } else {
      toast.error("Server not responding");
    }

    setError(error.message);

  } finally {
    setLoading(false);
    setAdding(false);
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


const handleSearch = async (query) => {
  if (!query || query.trim() === "") {
    setSearchData(null); // 🔄 Reset to default
    return;
  }

  try {
    const res = await axios.get(`${serverUrl}/api/listing/search?query=${query}`);
    setSearchData(res.data);
  } catch (error) {
    console.log("Search error:", error);
    setSearchData([]); // ❌ If error or not found, clear result
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
  // Form fields...
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

  // Image fields...
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
  setListingData,        // ✅ Optional, but already needed
  newListData,
  setNewListData,        // ✅ REQUIRED: this fixes the error
  cardDetails, setCardDetails,
  adding, setAdding,
searchData, setSearchData,
  // Status
  loading,
  error, setError,

  // Functions
  handleAddListing,
  resetForm,
  handleViewCard,
  getListing,
  handleSearch,
  handleReset,
};


  return (
    <ListingDataContext.Provider value={value}>
      {children}
    </ListingDataContext.Provider>
  );
}

export { ListingProvider, ListingDataContext };
