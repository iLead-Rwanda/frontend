import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

const Choose = () => {
  return (
    <div className="choose flex flex-col justify-center items-center gap-10">
      <div className="flex w-[85%] justify-between items-start">
        <p className="text-xl font-semibold text-[#B58A5F]">
          Choose the category to generate Certificate!
        </p>
        <button className="flex justify-start items-center gap-2 text-white bg-[#B58A5F] rounded-md cursor-pointer hover:bg-[#e0dfdd] hover:text-white p-2 text-sm transition duration-300 ease-in-out">
          <Icon icon="mingcute:add-fill" />
          <p>Add new category</p>
        </button>
      </div>
      <div className="w-full flex items-center justify-center gap-5">
        {[
          { name: "iChoose", icon: "mingcute:certificate-fill" },
          { name: "iDo", icon: "mingcute:certificate-fill" },
          { name: "iLead", icon: "mingcute:certificate-fill" },
        ].map((item, index) => (
          <div
            key={index}
            className="border-1 border-[#e0dfdd] shadow-md flex flex-col items-center justify-center w-[25%] p-8 pb-16 gap-4 bg-white rounded-2xl"
          >
            <div className="flex flex-col justify-center items-center">
              <Icon
                icon={item.icon}
                className="text-yellow-600"
                style={{ fontSize: 48 }}
              />
              <p className="text-lg font-bold">{item.name}</p>
            </div>
            <Link to="/students">
              {" "}
              <button className="text-xs text-[#B58A5F] bg-[#f3ece5] hover:bg-[#CCAD8F] hover:text-white p-2 py-1 rounded-lg transition duration-300 ease-in-out">
                View students
              </button>
            </Link>

            <div className="flex flex-col justify-center items-center text-[#000000B2]">
              <p className="font-bold text-base">Student No</p>
              <p className="font-normal text-sm">No student yet!</p>
            </div>
            <div className="flex flex-col justify-center items-center text-[#000000B2]">
              <p className="font-bold text-base">Qualification Met</p>
              <p className="h font-normal text-sm text-center w-52">
                Scoring above 80% on attending and helping others in the program
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Choose;
