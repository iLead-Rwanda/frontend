import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useUser } from "../../contexts/UserContext";

const Navbar = ({ onSearchClick }) => {
  const { logout, user } = useUser();
  const icons = [
    {
      icon: "solar:upload-outline",
      className: "icon rotate-90",
      action: logout,
    },
  ];

  return (
    <div className="py-4  w-full flex justify-between items-center px-12 bg-background">
      <div className="font-semibold flex flex-col justify-start items-start">
        <p>Welcome {user?.name} 👋</p>
        {/* <p className="text-[#686B6E] text-xs">Get all courses down here!</p> */}
      </div>
      <div className="flex justify-center items-center gap-4">
        {/* <div className="flex justify-center items-center gap-2">
          <input
            type="text"
            placeholder="Search from certificates..."
            className="px-4 py-1.5 border border-1 border-[#e0dfdd] rounded-2xl outline-none text-sm"
          />
          <div
            className="p-2 border border-1 border-[#e0dfdd] rounded-2xl cursor-pointer hover:bg-[#B58A5F] hover:text-[#fceac5]"
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
        </div> */}
        {icons.map((icon, index) => (
          <div
            key={index}
            onClick={icon.action}
            className="p-2 border border-1 border-[#e0dfdd] rounded-full cursor-pointer hover:bg-[#B58A5F] hover:text-[#fceac5]"
          >
            <Icon
              icon={icon.icon}
              className={`transition duration-300 ease-in-out ${icon.className}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
