import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useLocation, useNavigate } from "react-router-dom";
import images from "../../utils/images";
import { useUser } from "../../contexts/UserContext";

const Sidebar = () => {
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const sidebarItems = [
    {
      icon: "teenyicons:home-solid",
      text: "Home",
      bgColor: "#F84E111A",
      textColor: "#11BBF8",
      containerBgColor: "#FFFFFF",
      hasNew: true,
      link: "/",
      roles: ["Admin", "ProvincialAdmin"],
    },
    {
      icon: "ph:User-fill",
      text: "Province & Schools",
      bgColor: "#C211F81A",
      textColor: "#C211F8",
      containerBgColor: "#FFFFFF",
      link: "/province-schools",
      roles: ["Admin"],
    },
    {
      icon: "ph:User-fill",
      text: "Students",
      bgColor: "#C211F81A",
      textColor: "#C211F8",
      containerBgColor: "#FFFFFF",
      link: "/students",
      roles: ["Admin", "ProvincialAdmin"],
    },
    {
      icon: "solar:gallery-bold",
      text: "Certificates",
      bgColor: "#F84E111A",
      textColor: "#F84E11",
      containerBgColor: "#FFFFFF",
      link: "/certificates",
      roles: ["Admin", "ProvincialAdmin"],
    },
  ];

  return (
    <div className="min-w-[20%] w-[20%] flex flex-col justify-start items-center gap-6 bg-[#D8C5AE] h-screen">
      <img src={images.ilead} alt="" className="w-full h-16" />
      <div className="w-full flex flex-col justify-between h-full items-center">
        <div className="space-y-2 w-full px-5">
          {sidebarItems
            .filter((item) => item.roles.includes(user?.role))
            .map((item, index) => (
              <div
                key={index}
                className={`w-full flex cursor-pointer rounded-2xl px-4 py-2 ${
                  location.pathname === item.link
                    ? "bg-[#B58A5F]"
                    : "bg-[#F84E111A]"
                }`}
                onClick={() => navigate(item.link)}
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
            ))}
        </div>
        <div className="mb-2 w-full px-5 flex justify-between items-center p-2">
          <div className="flex justify-center items-center gap-1">
            <div className="relative inline-block">
              <img
                src={user?.profile}
                alt=""
                className="h-10 w-10 rounded-full cursor-pointer hover:opacity-[0.5]"
              />
            </div>
            <div>
              <p className="text-[#FFFFFF] text-sm font-semibold hover:underline cursor-pointer">
                {user?.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
