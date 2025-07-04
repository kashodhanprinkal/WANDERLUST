// CategoryBar.jsx
import React from "react";
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
  RocketLaunchIcon,
} from "@heroicons/react/24/solid";

const categories = [
  ["Trending", <FireIcon />],
  ["Modern", <HomeModernIcon />],
  ["City", <BuildingStorefrontIcon />],
  ["Events", <CakeIcon />],
  ["Design", <CubeTransparentIcon />],
  ["Historic", <BuildingLibraryIcon />],
  ["Luxury", <SparklesIcon />],
  ["Beach", <SunIcon />],
  ["Budget", <BanknotesIcon />],
  ["Homes", <HomeIcon />],
  ["Campers", <TruckIcon />],
  ["Nature", <CloudIcon />],
  ["Unique", <RocketLaunchIcon />],
];

function CategoryBar({ handleCategory, cate }) {
  return (
    <div className="w-[100vw] h-[85px] bg-white flex items-center justify-start gap-[30px] px-[20px] overflow-x-auto md:justify-center">
      {categories.map(([label, Icon], index) => (
        <div
          key={index}
          onClick={() => handleCategory(label)}
          className={`flex items-center justify-center cursor-pointer flex-col hover:border-b-[2px] border-[#a6a5a5] ${
            cate === label ? "border-b-[2px] font-semibold text-black" : ""
          }`}
        >
          {React.cloneElement(Icon, {
            className: "w-[30px] h-[30px] text-black",
          })}
          <h3 className="text-[13px]">{label}</h3>
        </div>
      ))}
    </div>
  );
}

export default CategoryBar;
