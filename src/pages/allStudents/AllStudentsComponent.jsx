import React from "react";
import images from "../../utils/images";

const AllStudentsComponent = () => {
  return (
    <div className={`w-[100%] h-[100%] flex flex-col gap-[10px]`}>
      <div className={`flex gap-[15px] items-center`}>
        <img
          src={images.arrowBack}
          alt="arrow back"
          className={`w-[25px] h-[25px] cursor-pointer`}
        />
        <p className={`text-[#646464] text-[14px] font-bold`}>All students</p>
      </div>

      <table className={`w-[100%] h-[100%]`}>
        <thead>
          <tr>
            <th className={`text-start`}>Name</th>
            <th className={`text-start`}>Category</th>
            <th className={`text-center`}>Certificate</th>
          </tr>
        </thead>
        <tbody className={`w-[100%] h-[100%] overflow-y-scroll`}>
          {Array.from({ length: 10 }).map((_item, index) => (
            <tr key={index}>
              <td className={`flex items-center justify-start gap-[10px] `}>
                <img
                  src={images.profile}
                  alt="Student"
                  className="student-photo"
                />
                Ineza Cinta Castella
              </td>
              <td>iDo</td>
              <td className={`flex justify-center `}>
                <img
                  src={images.smallCert}
                  alt="Certificate"
                  className="certificate-img"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllStudentsComponent;
