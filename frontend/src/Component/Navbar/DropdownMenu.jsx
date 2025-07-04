import React from "react";
import { RxAvatar } from "react-icons/rx";

function DropdownMenu({ userData, navigate, handleLogout, setShowpopup }) {
  return (
    <div className="w-[260px] absolute top-[45%] right-10 border border-gray-300 bg-white rounded-lg shadow-xl z-50 overflow-hidden">
      {/* ✅ Account Details */}
      <div className="px-4 py-4 border-b border-gray-200">
        {userData ? (
          <div className="flex items-center gap-3">
            {/* Avatar */}
            {userData.avatar ? (
              <img
                src={`http://localhost:8000${userData.avatar}`}
                alt="avatar"
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-white text-xl font-semibold">
                {userData.name?.charAt(0).toUpperCase()}
              </div>
            )}

            {/* Name + Email */}
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{userData.name}</span>
              <span className="text-xs text-gray-500 truncate">{userData.email}</span>

              {/* 👇 View Profile */}
              <button
                onClick={() => {
                  navigate("/profile");
                  setShowpopup(false);
                }}
                className="text-[12px] text-blue-600 underline mt-1 text-left"
              >
                View Profile
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-600">Welcome, Guest</p>
        )}
      </div>

      {/* ✅ Options List */}
      <ul className="flex flex-col text-sm text-gray-700">
        {/* Not Logged In */}
        {!userData && (
          <>
            <li
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                navigate("/login");
                setShowpopup(false);
              }}
            >
              Login
            </li>
            <li
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                navigate("/signup");
                setShowpopup(false);
              }}
            >
              Signup
            </li>
          </>
        )}

        {/* Logged In */}
        {userData && (
          <li
            className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              handleLogout();
              setShowpopup(false);
            }}
          >
            Logout
          </li>
        )}

        {/* Divider */}
        <hr className="my-1" />

        {/* Navigation */}
        <li
          className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
          onClick={() => {
            navigate("/MyListing");
            setShowpopup(false);
          }}
        >
          My Listings
        </li>
        <li
          className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
          onClick={() => {
            navigate("/listingpage1");
            setShowpopup(false);
          }}
        >
          List Your Home
        </li>
        <li
          className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
          onClick={() => {
            navigate("/mybooking");
            setShowpopup(false);
          }}
        >
          My Bookings
        </li>
      </ul>
    </div>
  );
}

export default DropdownMenu;
