import React from "react";
import images from "../../utils/images";
import { useUser } from "../../contexts/UserContext";
import { Icon } from "@iconify/react/dist/iconify.js";

const MobileNav = () => {
  const { logout } = useUser();
  return (
    <div className="bg-[#D8C5AE]  flex justify-between items-center">
      <img src={images.ilead} alt="" className=" h-14" />
      <div className="py-3 pr-5">
        <div
          onClick={logout}
          className="p-2 border border-1 border-[#e0dfdd] rounded-full cursor-pointer hover:bg-[#B58A5F] bg-white hover:text-[#fceac5]"
        >
          <Icon
            icon={"solar:upload-outline"}
            className={`transition duration-300 ease-in-out icon rotate-90`}
          />
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
