import React from "react";
import imgPlaceholder from "../../Assets/img-placeholder.svg";

const Certificate = () => {
  return (
    <div
      className={`w-[345px] h-[200px] p-[5px] bg-[#D8C5AE] rounded-[10px] flex flex-col`}
    >
      <div className={`w-[100%] h-[100%] bg-[#fff] flex flex-col`}>
        <div className={`w-[100%] flex items-center`}>
          <div
            className={`h-[40px] w-[46%] bg-[#D8C5AE] card-top flex justify-center items-center`}
          >
            <p className={`text-[#000] font-bold text-[12px] text-center`}>
              View <span className="block">students</span>
            </p>
          </div>

          <p
            className={`text-[#ABB4BA] w-[54%] text-[10px] font-bold text-center`}
          >
            1,734,430 Files
          </p>
        </div>

        <div
          className={`flex bg-[#fff] flex-col mt-[8px] px-[3%] items-start gap-[10px] justify-center w-[100%] h-[100%]`}
        >
          <p className={`text-[#ABB4BA] text-[11px]`}>School:</p>

          <div className={`w-[100%] flex items-center justify-between`}>
            <p className={`font-bold text-[15px] text-[#000]`}>
              Rwanda Coding <span className="block">Academy</span>
            </p>
            <img
              src={imgPlaceholder}
              alt="placeholder"
              className={`w-[48px] h-[48px]`}
            />
          </div>
        </div>

        <div className={`w-[100%] flex items-center`}>
          <p
            className={`text-[#ABB4BA] w-[64%] text-[10px] font-bold text-center`}
          >
            iChoose
          </p>
          <div
            className={`h-[40px] w-[36%] bg-[#D8C5AE] card-bottom flex justify-center items-center`}
          >
            <p className={`text-[#062D47] font-bold text-[12px] text-center`}>
              View <span className="block">certificates</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
