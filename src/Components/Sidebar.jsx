import React from "react";
import logo from "../Assets/ilead.png";
import profile from "../Assets/profile.png";
import { Icon } from "@iconify/react/dist/iconify.js";

const Sidebar = () => {
  const sidebarItems = [
    {
      icon: "solar:gallery-bold",
      text: "Photo Gallery",
      bgColor: "#F84E111A",
      textColor: "#F84E11",
      containerBgColor: "#FFFFFF",
    },
    {
      icon: "clarity:analytics-solid-badged",
      text: "Analytics",
      bgColor: "#def8f0",
      textColor: "#41EDBA",
      containerBgColor: "#FFFFFF",
    },
    {
      icon: "ph:student-fill",
      text: "Students",
      bgColor: "#C211F81A",
      textColor: "#C211F8",
      containerBgColor: "#FFFFFF",
    },
    {
      icon: "solar:document-bold",
      text: "Documents",
      bgColor: "#47F8111A",
      textColor: "#47F811",
      containerBgColor: "#FFFFFF",
      hasNew: true,
    },
    {
      icon: "material-symbols:favorite",
      text: "Favorites",
      bgColor: "#E87D7D1A",
      textColor: "#E87D7D",
      containerBgColor: "#FFFFFF",
    },
  ];
  return (
    <div className="fixed w-[17.5%] flex flex-col justify-start items-center gap-6 bg-[#D8C5AE] h-screen">
      <img src={logo} alt="" className=""/>
     <div className="w-full flex flex-col justify-between h-full items-center">
     <div className="flex flex-col justify-center items-center w-full gap-3">
        <div className="bg-[#B58A5F] hover:bg-[#e7d6c1] transition duration-300 ease-in-out cursor-pointer w-[75%] flex justify-between items-center p-3 border border-white rounded-md">
          <div className="flex flex-col justify-start items-start gap-1">
            <div className="bg-white p-1 rounded-md flex items-center justify-center text-[#11BBF8]">
              <Icon icon="teenyicons:home-solid" style={{ fontSize: '10px' }}/>
            </div>
            <p className="text-[#0A0F1F] font-bold text-xs">Home</p>
          </div>
          <div className="flex justify-center items-center gap-1">
            <p className="text-white font-semibold text-xs">New</p>
            <div className="w-2 h-2 rounded-full bg-[#E87D7D]"></div>
          </div>
        </div>
        {sidebarItems.map((item, index) => (
          <div key={index} className="sidebar-item">
            <div className="flex flex-col justify-start items-start gap-1">
              <div
                style={{ backgroundColor: item.bgColor, color: item.textColor }}
                className={` p-1 rounded-md flex items-center justify-center text-[${item.textColor}]`}
              >
                <Icon icon={item.icon} style={{ fontSize: '10px' }} />
              </div>
              <p className="text-[#0A0F1F] font-bold text-xs">{item.text}</p>
            </div>
            {item.hasNew && (
              <div className="flex justify-center items-center gap-1">
                <p className="text-white font-semibold text-xs">New</p>
                <div className="w-2 h-2 rounded-full bg-[#E87D7D]"></div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="foot mb-1 w-[75%] flex justify-between items-center p-2 bg-[#FFFFFF14]">
        <div className="flex justify-center items-center gap-1">
          <div class="relative inline-block">
            <img
              src={profile}
              alt=""
              class="h-10 w-10 rounded-full cursor-pointer hover:opacity-[0.5]"
            />
            <div class="absolute top-0 right-0 h-3 w-3 rounded-full border-2 border-black bg-green-500"></div>
          </div>
          <div>
            <p className="text-[#FFFFFF] text-sm font-semibold hover:underline cursor-pointer">
              Ryan Lee
            </p>
            <p className="text-[#B58A5F] text-sm font-semibold hover:underline cursor-pointer">
              Premium
            </p>
          </div>
        </div>
        <div className="cursor-pointer hover:text-lg">
          <Icon icon="solar:settings-line-duotone" className="" />
        </div>
      </div>
     </div>
    </div>
  );
};

export default Sidebar;
