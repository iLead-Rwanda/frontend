import React from "react";
import arrowBack from "../../Assets/arrow-back.svg";
import profile from "../../Assets/profile.svg";
import smallCert from "../../Assets/small_cert.png";
import { Link } from "react-router-dom";

const AllStudentsComponent = () => {
  return (
    <div className={`w-[100%] h-[100%] flex flex-col gap-[10px]`}>
      <Link to="/all">
      <div className={`flex gap-[15px] items-center`}>
        <img
          src={arrowBack}
          alt="arrow back"
          className={`w-[25px] h-[25px] cursor-pointer`}
        />
        <p className={`text-[#646464] text-[14px] font-bold`}>All students</p>
      </div></Link>

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
                <img src={profile} alt="Student" className="student-photo" />
                Ineza Cinta Castella
              </td>
              <td>iDo</td>
              <td className={`flex justify-center `}>
                <img
                  src={smallCert}
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
