import React from "react";
import { Link } from "react-router-dom";
import images from "../utils/images";
const NavLogin = () => {
  return (
    <div className="flex w-full justify-start items-center gap-72">
      <Link to="/" className="cursor_pointer">
        <img src={images.ilead} alt=""  className="h-20"/>
      </Link>
      {/* <Link to="/register">
        <button className="button-signin flex justify-center items-center gap-2 p-1 hover:p-2 px-3 border rounded-md transition duration-300 hover:bg-[#D8C5AE] hover:text-white">
          <img src={images.arrowCorner} alt="" />
          Sign up
        </button>
      </Link> */}
    </div>
  );
};

export default NavLogin;
