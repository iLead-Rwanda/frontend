import React from "react";
import no_noti from "../Assets/no_notification.png";
import { Link } from "react-router-dom";

const StudentInfo = () => {
  return (
    <div className="w-full flex flex-col gap-10">
      <p className="text-lg font-bold">iChoose Students registered</p>
      <div className="w-full flex flex-col justify-center items-center gap-10">
        <div className="flex flex-col justify-center items-center gap-2">
          <img src={no_noti} alt="" width={400}/>
          <p className="text-[#4F4F4F] font-bold text-xl">No Students at this time</p>
          <p className="text-[#4F4F4F] text-sm">Students will appear here after they are added .</p>
        </div>
        <div className="flex justify-center items-center gap-3 text-sm text-white font-medium">
            <Link to="/dash"><button className="bg-[#FFECE8] hover:bg-[#c7baa1] p-2 rounded-md w-36">Back to dashboard</button></Link>
            <Link to="/add"><button className="bg-[#B58A5F] hover:bg-[#e0dfdd] p-2 rounded-md w-36 transition duration-300 ease-in-out">Add students</button></Link>
        </div>
      </div>
    </div>
  );
};
export default StudentInfo;
