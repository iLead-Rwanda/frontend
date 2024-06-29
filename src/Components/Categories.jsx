import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import certi from "../Assets/certi.png";
import arrow from "../Assets/arrowCorner.png";
import { Link } from "react-router-dom";

const categories = [
  { title: "iChoose" },
  { title: "iDo" },
  { title: "iLead" },
];

const Category = () => {
  return (
    <div className="w-full p-4 flex justify-between items-center">
      <div className="flex justify-center items-center h-8 w-8 hover:h-10 hover:w-10 p-2 border border-1 border-[#e0dfdd] rounded-full cursor-pointer hover:bg-[#B58A5F] hover:text-[#fceac5]">
        <Icon icon="formkit:arrowleft" className="transition duration-300 ease-in-out" />
      </div>
      <div className="flex justify-center items-center gap-6">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center justify-center gap-2">
            <Icon icon="mingcute:certificate-fill" className="text-yellow-600" style={{ fontSize: 24 }} />
            <p className="text-lg font-bold">{category.title}</p>
            <img src={certi} alt="" width={250} />
            <Link to="/one">
            <button className="button-signin relative top-[-55px] flex justify-center items-center gap-2 p-1 px-2 rounded-full transition duration-300 bg-[#eeeae5] hover:bg-[#D8C5AE] hover:text-white text-sm">
              <img src={arrow} alt="" />
              Generate certificate
            </button>
            </Link>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center h-8 w-8 hover:h-10 hover:w-10 p-2 border border-1 border-[#e0dfdd] rounded-full cursor-pointer hover:bg-[#B58A5F] hover:text-[#fceac5]">
        <Icon icon="formkit:arrowright" className="transition duration-300 ease-in-out" />
      </div>
    </div>
  );
};

export default Category;