import React from "react";
import addDark from "../../Assets/add_dark.svg";
import deleteDark from "../../Assets/delete_dark.svg";

const AddNewStudentSubForm = () => {
  return (
    <div className={`w-[100%] h-[200px] flex items-start gap-[10px]`}>
      <div
        className={`w-[100%] h-[100%] border-[#A4A4A4] border-[1px] border-solid rounded-[10px] px-[2%] py-[15px] flex flex-col items-start justify-start`}
      >
        <p className={`text-[13px] font-medium text-[#4E4E4E] mb-[40px]`}>
          Add information
        </p>

        <input
          type="text"
          placeholder="Write student full names ..."
          className={`rounded-[5px] bg-[#F3F3F3] outline-none border-none w-[100%] p-[12px] text-[14px] mb-[10px]`}
        />

        <input
          type="text"
          placeholder="Write student category ..."
          className={`rounded-[5px] bg-[#F3F3F3] outline-none border-none w-[100%] p-[12px] text-[14px]`}
        />
      </div>

      <div className={`flex flex-col gap-[20px]`}>
        <button className={`rounded-full bg-[#F3F3F3] p-[12px]`}>
          <img src={addDark} alt="add" />
        </button>

        <button className={`rounded-full bg-[#F3F3F3] p-[12px]`}>
          <img src={deleteDark} alt="delete" />
        </button>
      </div>
    </div>
  );
};

export default AddNewStudentSubForm;
