import axios from "axios";
import { useNavigate } from 'react-router-dom';
import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";

// ✅ Use function declaration for the provider
function ListingProvider({ children }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rent, setRent] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");

  const [backEndImage1, setBackEndImage1] = useState(null);
  const [backEndImage2, setBackEndImage2] = useState(null);
  const [backEndImage3, setBackEndImage3] = useState(null);
  const [backEndImage4, setBackEndImage4] = useState(null);
  const [backEndImage5, setBackEndImage5] = useState(null);

  const [frontEndImage1, setFrontEndImage1] = useState(null);
  const [frontEndImage2, setFrontEndImage2] = useState(null);
  const [frontEndImage3, setFrontEndImage3] = useState(null);
  const [frontEndImage4, setFrontEndImage4] = useState(null);
  const [frontEndImage5, setFrontEndImage5] = useState(null);

  const [listingData, setListingData] = useState([]);
  let [newListData , setNewListData] = useState([])
  const [adding, setAdding] = useState(false);
  const navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);
  let [cardDetails, setCardDetails]=useState(null)

  const handleAddListing = async () => {
    setAdding(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("rent", rent);
      formData.append("landmark", landmark);
      formData.append("city", city);
      formData.append("category", category);

      if (backEndImage1) formData.append("image1", backEndImage1);
      if (backEndImage2) formData.append("image2", backEndImage2);
      if (backEndImage3) formData.append("image3", backEndImage3);
      if (backEndImage4) formData.append("image4", backEndImage4);
      if (backEndImage5) formData.append("image5", backEndImage5);

      const result = await axios.post(`${serverUrl}/api/listing/add`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Listing created:", result.data);
      setAdding(false);
      navigate("/");

      // Reset form
      setTitle("");
      setDescription("");
      setRent("");
      setLandmark("");
      setCity("");
      setCategory("");
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

    } catch (error) {
      setAdding(false);
      console.error("❌ Error adding listing:", error);
    }
  };

const handleViewCard = async (id) => {
  try {
    let result = await axios.get(`${serverUrl}/api/listing/findlistingByid/${id}`, {
      withCredentials: true
    });
    setCardDetails(result.data)
    navigate("/viewcard");
  } catch (error) {
    console.log("getCurrentUser error:", error);
  }
};


  const getListing = async () => {
   try {
    let result = await axios.get( serverUrl + "/api/listing/get", {withCredentials: true})
    setListingData(result.data)
    setNewListData(result.data)
    
   } catch (error) {
    console.log(error)
   }
  };

  useEffect(() => {
    getListing();
  }, [adding]);

  const value = {
    title, setTitle,
    description, setDescription,
    rent, setRent,
    landmark, setLandmark,
    city, setCity,
    category, setCategory,

    backEndImage1, setBackEndImage1,
    backEndImage2, setBackEndImage2,
    backEndImage3, setBackEndImage3,
    backEndImage4, setBackEndImage4,
    backEndImage5, setBackEndImage5,

    frontEndImage1, setFrontEndImage1,
    frontEndImage2, setFrontEndImage2,
    frontEndImage3, setFrontEndImage3,
    frontEndImage4, setFrontEndImage4,
    frontEndImage5, setFrontEndImage5,

    listingData, setListingData,
    handleAddListing,
    adding, setAdding,
    newListData , setNewListData,
    handleViewCard,
    cardDetails, setCardDetails
  };

  return (
    <ListingDataContext.Provider value={value}>
      {children}
    </ListingDataContext.Provider>
  );
}

// ✅ Use consistent export
export { ListingProvider };
export const ListingDataContext = createContext();


{ /*import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { authDataContext } from "./AuthContext";

// Create a context to share listing data globally
export const ListingDataContext = createContext();

// Provider component to wrap around components that need access to listing data
export const ListingProvider = ({ children }) => {
  // Textual listing fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rent, setRent] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");

  // Image states (only store File objects for uploading)
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [image5, setImage5] = useState(null);

  // Access the server URL from auth context
  const { serverUrl } = useContext(authDataContext);

  // Function to handle adding a new listing
  const handleAddListing = async () => {
    try {
      const formData = new FormData();

      // Append textual fields
      formData.append("title", title);
      formData.append("description", description);
      formData.append("rent", rent);
      formData.append("landmark", landmark);
      formData.append("city", city);
      formData.append("category", category);

      // Append images only if they exist
      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);
      if (image5) formData.append("image5", image5);

      // Send POST request to backend with the form data
      const result = await axios.post(`${serverUrl}/api/listing/add`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ Listing created:", result.data);
    } catch (error) {
      console.error("❌ Error adding listing:", error);
    }
  };

  // Values exposed to context consumers
  const value = {
    title, setTitle,
    description, setDescription,
    rent, setRent,
    landmark, setLandmark,
    city, setCity,
    category, setCategory,
    image1, setImage1,
    image2, setImage2,
    image3, setImage3,
    image4, setImage4,
    image5, setImage5,
    handleAddListing,
  };

  return (
    <ListingDataContext.Provider value={value}>
      {children}
    </ListingDataContext.Provider>
  );
};
*/
}
