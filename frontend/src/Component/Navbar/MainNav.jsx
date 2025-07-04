// MainNav.jsx
import React from "react";
import logo from "../../assets/logo.png";
import { MdSearch } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxAvatar } from "react-icons/rx";

function MainNav({ userData, navigate, setShowpopup, showpopup }) {
  return (
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
      </div>
    </div>
  );
}

export default MainNav;
