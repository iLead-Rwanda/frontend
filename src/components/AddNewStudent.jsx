import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

const AddNewStudent = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="border border-1 border-[#A4A4A4] rounded-md w-[60%] flex flex-col justify-center items-center gap-12 p-4 py-10">
        <p className="text-[#0F0F0F] text-lg font-bold">Add new Student</p>
        <div className="p-3 rounded-md  w-full flex justify-center items-start gap-2">
          <div className="border border-3 border-[#A4A4A4] p-3 rounded-md w-[80%] flex flex-col gap-5">
            <input
              className="p-[5px] w-full rounded-md px-3 text-md text-[#4E4E4E]"
              type="text"
              name="info"
              id="info"
              placeholder="Add info..."
            />
            <input
              className="p-[5px] w-full rounded-md px-3 text-md text-[#4E4E4E]"
              type="text"
              name="name"
              id="name"
              placeholder="Name"
            />
            <select
              className="p-[5px] w-full rounded-md px-3 text-md text-[#4E4E4E] focus:border-[0.5px] focus:border-[#B58A5F] focus:outline-none focus:shadow-[0_0_5px_rgba(183,138,95,0.5)]"
              name="cat"
              id="cat"
            >
              <option value="ichoose">iChoose</option>
              <option value="ido">iDo</option>
              <option value="ilead">iLead</option>
            </select>
          </div>
          <div className="flex flex-col gap-6 py-3">
            <div className="p-2 h-8 w-8 flex justify-center items-center border border-1 border-[#e0dfdd] rounded-full cursor-pointer hover:bg-[#B58A5F] hover:text-[#fceac5]">
              <Icon
                icon="mingcute:add-fill"
                className={`transition duration-300 ease-in-out`}
              />
            </div>
            <div className="p-2 h-8 w-8 flex justify-center items-center border border-1 border-[#e0dfdd] rounded-full cursor-pointer hover:bg-[#B58A5F] hover:text-[#fceac5]">
              <Icon
                icon="tabler:trash"
                className={`transition duration-300 ease-in-out`}
              />
            </div>
          </div>
        </div>
        <div className="w-full pl-28">
          <Link to="/all">
            <button className="bg-[#B58A5F] hover:bg-[#ccb298] p-2 text-base font-medium rounded-md w-[75%] text-white">
              ADD STUDENT
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddNewStudent;
