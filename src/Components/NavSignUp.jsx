import React from "react";
import arrow from "../Assets/arrowCorner.png";
import logo from "../Assets/ilead.png";
import { Link } from "react-router-dom";
const NavSignUp = () => {
  return (
    <div className="flex w-full justify-start items-center gap-72">
      <Link to="/" className="cursor_pointer">
        <img src={logo} alt="" />
      </Link>
      <Link to="/login">
        <button className="button-signin flex justify-center items-center gap-2 p-1 hover:p-2 px-3 border rounded-md transition duration-300 hover:bg-[#D8C5AE] hover:text-white">
          <img src={arrow} alt="" />
          Sign in
        </button>
      </Link>
    </div>
  );
};

export default NavSignUp;
