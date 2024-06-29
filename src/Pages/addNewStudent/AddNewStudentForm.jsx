import React from "react";
import arrowBack from "../../Assets/arrow-back.svg";
import AddNewStudentSubForm from "./AddNewStudentSubForm";

const AddNewStudentForm = () => {
  return (
    <div
      className={`w-[100%] h-[100%] flex flex-col items-center justify-center`}
    >
      <div className={`flex gap-[15px] items-center mb-[20px] self-start`}>
        <img
          src={arrowBack}
          alt="arrow back"
          className={`w-[25px] h-[25px] cursor-pointer`}
        />
        <p className={`text-[#646464] text-[14px] font-bold`}>
          Add new student
        </p>
      </div>

      <div
        className={`w-[60%] h-[550px] rounded-[10px] py-[20px] px-[2%] border-solid border-[#B58A5F] border-[1px] bg-[#fff] flex flex-col items-center justify-start`}
      >
        <h3 className={`text-[#0F0F0F] font-bold text-[18px] mb-[50px]`}>
          Add new student
        </h3>

        <div
          className={`add-student-forms flex flex-col items-start justify-start gap-[15px] w-[100%] h-[100%] overflow-y-scroll`}
        >
          <AddNewStudentSubForm />
        </div>

        <button
          className={`rounded-[5px] px-[15%] py-[10px] bg-[#B58A5F] text-center text-[#fff] font-bold text-[15px]`}
        >
          Add students
        </button>
      </div>
    </div>
  );
};

export default AddNewStudentForm;
