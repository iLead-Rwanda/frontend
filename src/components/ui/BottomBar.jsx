import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useLocation, useNavigate } from "react-router-dom";
import images from "../../utils/images";
import { useUser } from "../../contexts/UserContext";

const BottomBar = () => {
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
      icon: "lucide:users",
      text: "Students",
      bgColor: "#C211F81A",
      textColor: "#C211F8",
      containerBgColor: "#FFFFFF",
      link: "/students",
      roles: ["Admin", "ProvincialAdmin"],
    },
    {
      icon: "ic:baseline-school",
      text: "Schools",
      bgColor: "#C211F81A",
      textColor: "#C211F8",
      containerBgColor: "#FFFFFF",
      link: "/schools",
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
    <div className="w-full bg-[#D8C5AE] ">
      <div className="w-full flex flex-row justify-between  items-center">
        <div className="flex flex-row justify-between gap-5 space-y-2 w-full px-5 py-5">
          {sidebarItems
            .filter((item) => item.roles.includes(user?.role))
            .map((item, index) => (
              <div
                key={index}
                className={` flex cursor-pointer rounded-2xl px-4 py-2 ${
                  location.pathname === item.link ? "bg-[#B58A5F]" : "bg-white"
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
                    <Icon icon={item.icon} style={{ fontSize: "20px" }} />
                  </div>
                  <p className="hidden md:block text-[#0A0F1F] font-bold text-xs">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
