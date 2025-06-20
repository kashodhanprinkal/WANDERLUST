import React, { useContext, useState } from 'react';
import logo from '../assets/logo.png';
import { MdSearch } from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';
import { RxAvatar } from 'react-icons/rx';
import {
  FireIcon,
  HomeModernIcon,
  BuildingStorefrontIcon,
  CakeIcon,
  CubeTransparentIcon,
  BuildingLibraryIcon,
  SparklesIcon,
  SunIcon,
  BanknotesIcon,
  HomeIcon,
  TruckIcon,
  CloudIcon,
  MoonIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { authDataContext } from "../Context/AuthContext";
import { userDataContext } from '../Context/UserContext';
import { ListingDataContext } from '../Context/ListingContext';


function Nav() {
  let [showpopup, setShowpopup] = useState(false);
  let navigate = useNavigate()
  let {serverUrl} = useContext(authDataContext)
  let { userData, setUserData} = useContext(userDataContext)
let [cate, setCate] = useState("Trending");
const { listingData, setListingData , setNewListData , newListData} = useContext(ListingDataContext);

  const handleLogout = async () => {
  try {
    const { data } = await axios.post('http://localhost:8000/api/auth/logout', {}, {
      withCredentials: true,
    });

    // Clear user data
    localStorage.removeItem("user");
    setUserData(null);

    // Redirect
    navigate('/');

    // Log result
    console.log("Logout successful:", data.message);

  } catch (error) {
    console.error("Logout error:", error);
  }
};
  
const handleCategory = (category) => {
  setCate(category);

  if (category === "Trending") {
    setNewListData(listingData); // Show all listings
  } else {
    // Filter listings by matching category (case-insensitive)
    const filtered = listingData.filter(
      (list) => list.category?.toLowerCase() === category.toLowerCase()
    );
    setNewListData(filtered);
  }
};





  
  return (
    <div className='fixed top-0 bg-white '>
      {/* First nav bar */}
      <div className="w-[100vw] min-h-[80px] border-b-[1px] border-[#dcdcdc] px-[40px] flex items-center justify-between ">
        <div>
          <img src={logo} alt="Wanderlust Logo" className="w-[138px]" />
        </div>

        <div className="w-[35%] relative hidden md:block">
          <input
            type="text"
            className="w-full px-[30px] pr-[50px] py-[10px] border-[2px] border-[#dcdcdc] outline-none overflow-auto rounded-[30px] text-[17px]"
            placeholder="Any Where | any location | any city"
          />
          <button className="absolute top-[8px] right-[15px] bg-red-600 p-[10px] rounded-full">
            <MdSearch className="w-[20px] h-[20px] text-white" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-[10px] relative">
          <span className="text-[18px] cursor-pointer rounded-[50px] hover:bg-[#ded9d9] px-[8px] py-[5px] hidden md:block "onClick={()=>(navigate("/listingpage1"))} >
            list your home
          </span>
          <button
  className="px-[20px] py-[10px] flex items-center justify-center gap-[5px] border-[1px] border-[#8d8c8c] rounded-[50px] hover:shadow-lg"
  onClick={() => setShowpopup((prev) => !prev)}
>
  <span>
    <GiHamburgerMenu className="w-[20px] h-[20px]" />
  </span>
  {userData ? (
    <span className="w-[30px] h-[30px] bg-[black] text-[white] rounded-full flex items-center justify-center">
      {userData.name?.slice(0, 1)}
    </span>
  ) : (
    <span>
      <RxAvatar className="w-[23px] h-[23px]" />
    </span>
  )}
</button>


          {showpopup && (
            <div className="w-[220px] h-[300px] absolute top-[110%] right-[5%] border-[1px] border-[#aaa9a9] z-10 bg-white rounded-lg">
              <ul className="w-[100%] h-[100%] text-[17px] flex items-start justify-around flex-col py-[10px]">
 {!userData && <li
    className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3]"
    onClick={() => {
      navigate("/login");
      setShowpopup(false);
    }}
  >
    Login
  </li>}
  {!userData && <li
    className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3]"
    onClick={() => {
      navigate("/signup");
      setShowpopup(false);
    }}
  >
    Signup
  </li>}
  {userData && <li
    className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3]"
    onClick={() => {
      handleLogout();
      setShowpopup(false);
    }}
  >
    Logout
  </li>}
  <div className="w-[100%] border-[1px] border-black"></div>
  <li
    className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3]"
    onClick={() => {
      navigate("/MyListing");
      setShowpopup(false);
    }}
  >
    My Listing
  </li>



  <li
    className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3]"
    onClick={() => {
      navigate("/listingpage1"); // Update this if a different page is intended
      setShowpopup(false);
    }}
  >
    List Your Home
  </li>
  <li
    className="w-[100%] px-[15px] py-[10px] hover:bg-[#f4f3f3]"
    onClick={() => {
      navigate("/mybooking"); // Use the correct route
      setShowpopup(false);
    }}
  >
    My Booking
  </li>
</ul>

            </div>
            
          )}
        </div>
      </div>

      <div className='w-[100%] flex items-center justify-center h-[60px]  md:hidden '>
      <div className="w-[80%] relative  ">
          <input
            type="text"
            className="w-[100%] px-[30px] pr-[50px] py-[10px] border-[2px] border-[#dcdcdc] outline-none overflow-auto rounded-[30px] text-[17px]"
            placeholder="Any Where | any location | any city"
          />
          <button className="absolute top-[8px] right-[15px] bg-red-600 p-[10px] rounded-full">
            <MdSearch className="w-[20px] h-[20px] text-white" />
          </button>
        </div>
        </div>


      {/* Second nav bar */}
      <div className="w-[100vw] h-[85px] bg-white flex items-center justify-start gap-[30px] px-[20px] overflow-x-auto md:justify-center ">
        {[
          ['Trending', <FireIcon />],
          ['Modern', <HomeModernIcon />],
          ['City', <BuildingStorefrontIcon />],
          ['Events', <CakeIcon />],
          ['Design', <CubeTransparentIcon />],
          ['Historic', <BuildingLibraryIcon />],
          ['Luxury', <SparklesIcon />],
          ['Beach', <SunIcon />],
          ['Budget', <BanknotesIcon />],
          ['Homes', <HomeIcon />],
          ['Campers', <TruckIcon />],
          ['Nature', <CloudIcon />],
          ['Unique', <RocketLaunchIcon />],
        ].map(([label, Icon], index) => (
          <div
            key={index}
            onClick={() => handleCategory(label)}
      className={`flex items-center justify-center cursor-pointer flex-col hover:border-b-[2px] border-[#a6a5a5] ${
        cate === label ? "border-b-[2px] font-semibold text-black" : ""
      }`}
          >
            {React.cloneElement(Icon, { className: 'w-[30px] h-[30px] text-black' })}
            <h3 className="text-[13px]">{label}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Nav;
