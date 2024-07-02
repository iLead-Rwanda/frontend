import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const CertiNav = () => {

  return (
    <div className="flex justify-between items-center">
      <p className="text-lg font-bold">Student's report cards</p>
      <div className="flex">
        <select name="filter" id="filter" className="text-[#85878D] text-sm p-1 rounded-md focus:border-[#B58A5F] focus:border-[0.5px] focus:outline-none focus:shadow-[0_0_5px_rgba(183,138,95,0.5)]">
            <option value="filter">Add filter</option>
            <option value="ichoose">iChoose</option>
            <option value="ido">iDo</option>
            <option value="ilead">iLead</option>
        </select>
        <div className="flex flex-col justify-between items-center gap-48">
          <div className="flex justify-center items-center gap-2">
            <div className="p-2 rounded-md cursor-pointer hover:bg-[#B58A5F] hover:text-[#fceac5]">
              <Icon icon="mingcute:search-line" />
            </div>
            <input
              type="text"
              placeholder="Search from certificates..."
              className="p-1 rounded-md"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-3">
      <button
          className="bg-[#B58A5F] hover:bg-[#c5ab91] flex justify-center items-center gap-1 p-1 px-3 text-white rounded-md"
        >
          <Icon icon="mingcute:add-fill"/>
          <p>Download All certificates</p>
        </button>
      </div>
    </div>
  );
};

export default CertiNav;
