import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const Navbar = ({ onSearchClick }) => {
  const icons = [
    { icon: "ph:sun-bold" },
    { icon: "solar:share-linear" },
    { icon: "ph:clock" },
    { icon: "system-uicons:write" },
    { icon: "solar:upload-outline", className: "icon rotate-90" },
  ];

  return (
    <div className="navbar w-full flex justify-between items-center px-12">
      <div className="font-semibold flex flex-col justify-start items-start">
        <p>Welcome Castella👋</p>
        <p className="text-[#686B6E] text-xs">Get all courses down here!</p>
      </div>
      <div className="flex flex-col justify-between items-center gap-48">
        <div className="flex justify-center items-center gap-2">
          <input
            type="text"
            placeholder="Search from certificates..."
            className="p-1 border border-1 border-[#e0dfdd] rounded-md"
          />
          <div
            className="p-2 border border-1 border-[#e0dfdd] rounded-md cursor-pointer hover:bg-[#B58A5F] hover:text-[#fceac5]"
            onClick={() => {
              document.getElementById("search").style.display = "flex";
              onSearchClick(); 
            }}
          >
            <Icon icon="mingcute:search-line" />
          </div>
        </div>
        <div
          id="search"
          className="w-full text-2xl font-semibold text-[#B58A5F] tracking-wide flex absolute top-56 items-center justify-center flex-col"
          style={{ display: "none" }}
        >
          Loading...
        </div>
      </div>
      <div className="flex justify-center items-center gap-4">
        {icons.map((icon, index) => (
          <div key={index} className="p-2 border border-1 border-[#e0dfdd] rounded-full cursor-pointer hover:bg-[#B58A5F] hover:text-[#fceac5]">
            <Icon icon={icon.icon} className={`transition duration-300 ease-in-out ${icon.className}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;