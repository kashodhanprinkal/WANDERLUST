// SearchBarMobile.jsx
import React from "react";
import { MdSearch } from "react-icons/md";

function SearchBarMobile() {
  return (
    <div className="w-[100%] flex items-center justify-center h-[60px] md:hidden">
      <div className="w-[80%] relative">
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
  );
}

export default SearchBarMobile;
