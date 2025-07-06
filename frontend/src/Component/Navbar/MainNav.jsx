import React from "react";
import logo from "../../assets/logo.png";
import { MdSearch } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxAvatar } from "react-icons/rx";
import NotificationBell from "../Navbar/NotificationBell"; // 🔔 Import NotificationBell

function MainNav({ userData, navigate, setShowpopup }) {
  const userToken = localStorage.getItem("token");

  return (
    <div className="w-full min-h-[80px] border-b border-[#dcdcdc] px-6 md:px-10 flex items-center justify-between">
      {/* Logo */}
      <div>
        <img src={logo} alt="Wanderlust Logo" className="w-[138px]" />
      </div>

      {/* Search bar */}
      <div className="w-[35%] relative hidden md:block">
        <input
          type="text"
          className="w-full px-[30px] pr-[50px] py-[10px] border-2 border-[#dcdcdc] outline-none rounded-[30px] text-[17px]"
          placeholder="Anywhere | Any location | Any city"
        />
        <button className="absolute top-[8px] right-[15px] bg-red-600 p-[10px] rounded-full">
          <MdSearch className="w-[20px] h-[20px] text-white" />
        </button>
      </div>

      {/* Right side - buttons */}
   <div className="flex items-center justify-center gap-[10px] relative">
  <span
    className="text-[18px] cursor-pointer rounded-[50px] hover:bg-[#ded9d9] px-[8px] py-[5px] hidden md:block"
    onClick={() => navigate("/listingpage1")}
  >
    list your home
  </span>


  <button
    className="px-[20px] py-[10px] flex items-center justify-center gap-[5px] border-[1px] border-[#8d8c8c] rounded-[50px] hover:shadow-lg"
    onClick={() => setShowpopup((prev) => !prev)}
  >
    <GiHamburgerMenu className="w-[20px] h-[20px]" />
    {userData ? (
      userData.avatar ? (
        <img
          src={`http://localhost:8000${userData.avatar}`}
          alt="avatar"
          className="w-[30px] h-[30px] rounded-full object-cover border"
        />
      ) : (
        <span className="w-[30px] h-[30px] bg-black text-white rounded-full flex items-center justify-center">
          {userData.name?.slice(0, 1)}
        </span>
      )
    ) : (
      <RxAvatar className="w-[23px] h-[23px]" />
    )}
  </button>
    {/* ✅ Only show bell when logged in */}
  {userData && (
    <NotificationBell userData={userData} />
  )}

</div>

    </div>
  );
}

export default MainNav;
