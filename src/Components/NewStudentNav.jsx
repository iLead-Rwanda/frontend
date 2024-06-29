import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

const NewStudentNav = () => {
  return (
    <div className="flex justify-between items-center">
      <Link to="/all">
        <div className="flex justify-center items-center gap-2 text-[#646464] font-bold text-base hover:text-lg">
          <Icon icon="formkit:arrowleft" />
          <p>Add new student</p>
        </div>
      </Link>
      <button className="text-sm">Download</button>
    </div>
  );
};

export default NewStudentNav;
