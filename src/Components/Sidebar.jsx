import React from "react";
import logo from "../Assets/ilead.png";
import profile from "../Assets/profile.png";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const sidebarItems = [
    {
      icon: "teenyicons:home-solid",
      text: "Home",
      bgColor: "#F84E111A",
      textColor: "#11BBF8",
      containerBgColor: "#FFFFFF",
      hasNew: true,
      link: "/dash",
    },
    {
      icon: "solar:gallery-bold",
      text: "Certificates",
      bgColor: "#F84E111A",
      textColor: "#F84E11",
      containerBgColor: "#FFFFFF",
      link: "/certi",
    },
    {
      icon: "clarity:analytics-solid-badged",
      text: "Analytics",
      bgColor: "#def8f0",
      textColor: "#41EDBA",
      containerBgColor: "#FFFFFF",
      link: "/ana",
    },
    {
      icon: "ph:student-fill",
      text: "Students",
      bgColor: "#C211F81A",
      textColor: "#C211F8",
      containerBgColor: "#FFFFFF",
      link: "/all",
    },
    {
      icon: "solar:document-bold",
      text: "Documents",
      bgColor: "#47F8111A",
      textColor: "#47F811",
      containerBgColor: "#FFFFFF",
      hasNew: true,
      link: "/docs",
    },
    {
      icon: "material-symbols:favorite",
      text: "Favorites",
      bgColor: "#E87D7D1A",
      textColor: "#E87D7D",
      containerBgColor: "#FFFFFF",
      link: "/fav",
    },
    {
      icon: "mingcute:add-fill",
      text: "Add student",
      bgColor: "#E87D7D1A",
      textColor: "#E87D7D",
      containerBgColor: "#FFFFFF",
      link: "/add",
    },
  ];

  const location = useLocation();
  return (
    <div className="fixed w-[17.5%] flex flex-col justify-start items-center gap-6 bg-[#D8C5AE] h-screen">
      <Link to="/dash"><img src={logo} alt="" className="" /></Link>
      <div className="w-full flex flex-col justify-between h-full items-center">
      <div className="flex flex-col justify-center items-center w-full gap-3">
  {sidebarItems.map((item, index) => (
    <Link to={item.link} key={index} className="w-full flex justify-center items-center">
      <div
        className={`sidebar-item ${location.pathname === item.link? 'bg-[#B58A5F]' : 'bg-[#F84E111A]'}`}
      >
        <div className="flex flex-col justify-start items-start gap-1">
          <div
            style={{
              backgroundColor: item.bgColor,
              color: item.textColor,
            }}
            className={`p-1 rounded-md flex items-center justify-center text-[${item.textColor}] focus:bg-[#B58A5F]`}
          >
            <Icon icon={item.icon} style={{ fontSize: "10px" }} />
          </div>
          <p className="text-[#0A0F1F] font-bold text-xs">
            {item.text}
          </p>
        </div>
      </div>
      {item.hasNew && (
        <div className="flex justify-center items-center gap-1 absolute right-10">
          <p className="text-white font-semibold text-xs ab">New</p>
          <div className="w-2 h-2 rounded-full bg-[#E87D7D]"></div>
        </div>
      )}
    </Link>
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