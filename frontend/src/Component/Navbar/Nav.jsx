import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import MainNav from "./MainNav";
import DropdownMenu from "./DropdownMenu";
import SearchBarMobile from "./SearchBarMobile";
import CategoryBar from "./CategoryBar";

import { authDataContext } from "../../Context/AuthContext";
import { userDataContext } from "../../Context/UserContext";
import { ListingDataContext } from "../../Context/ListingContext";

function Nav() {
  const [showpopup, setShowpopup] = useState(false);
  const [cate, setCate] = useState("Trending");

  const navigate = useNavigate();
  const { serverUrl } = useContext(authDataContext);
  const { userData, setUserData } = useContext(userDataContext);
  const { listingData, setListingData, setNewListData, newListData } =
    useContext(ListingDataContext);

  const handleLogout = async () => {
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("user");
      setUserData(null);
      navigate("/");
      console.log("Logout successful:", data.message);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleCategory = (category) => {
    setCate(category);
    if (category === "Trending") {
      setNewListData(listingData);
    } else {
      const filtered = listingData.filter(
        (list) => list.category?.toLowerCase() === category.toLowerCase()
      );
      setNewListData(filtered);
    }
  };

  return (
    <div className="fixed top-0 bg-white z-50">
      <MainNav
        userData={userData}
        navigate={navigate}
        showpopup={showpopup}
        setShowpopup={setShowpopup}
      />
      {showpopup && (
        <DropdownMenu
          userData={userData}
          navigate={navigate}
          handleLogout={handleLogout}
          setShowpopup={setShowpopup}
        />
      )}
      <SearchBarMobile />
      <CategoryBar cate={cate} handleCategory={handleCategory} />
    </div>
  );
}

export default Nav;
