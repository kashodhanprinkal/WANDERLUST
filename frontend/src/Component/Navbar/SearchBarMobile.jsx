import React, { useState } from "react";
import { MdSearch } from "react-icons/md";

function SearchBarMobile({ handleSearch }) {
  const [query, setQuery] = useState("");

  const onSearch = () => {
    if (query.trim()) {
      handleSearch(query);
    }
  };

  return (
    <div className="w-[100%] flex items-center justify-center h-[60px] md:hidden">
      <div className="w-[80%] relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-[100%] px-[30px] pr-[50px] py-[10px] border-[2px] border-[#dcdcdc] outline-none overflow-auto rounded-[30px] text-[17px]"
          placeholder="Anywhere | Any location | Any city"
        />
        <button
          onClick={onSearch}
          className="absolute top-[8px] right-[15px] bg-red-600 p-[10px] rounded-full"
        >
          <MdSearch className="w-[20px] h-[20px] text-white" />
        </button>
      </div>
    </div>
  );
}

export default SearchBarMobile;
