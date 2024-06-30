import React from "react";
import arrowBack from "../../Assets/arrow-back.svg";
import add from "../../Assets/add.svg";
import Certificate from "./Certificate";

const CertificatesComponent = () => {
  return (
    <div className={`w-[100%] h-[100%] flex flex-col`}>
      <div
        className={`w-[100%] flex items-center justify-between px-[2%] py-[10px]`}
      >
        <div className={`flex gap-[15px] items-center`}>
          <img
            src={arrowBack}
            alt="arrow back"
            className={`w-[25px] h-[25px] cursor-pointer`}
          />
          <p className={`text-[#646464] text-[14px] font-bold`}>Certificates</p>
        </div>

        <button
          className={`flex gap-[10px] items-center justify-center p-[10px] rounded-[5px] bg-[#B58A5F]`}
        >
          <img src={add} alt="add" className={`w-[12px] h-[12px]`} />
          <p className={`text-[#fff] text-[12px]`}>Add new school</p>
        </button>
      </div>

      <div
        className={`flex flex-wrap justify-evenly gap-[10px] w-[100%] h-[100%] overflow-y-scroll`}
      >
        {Array.from({ length: 10 }).map(() => (
          <Certificate />
        ))}
      </div>
    </div>
  );
};

export default CertificatesComponent;
