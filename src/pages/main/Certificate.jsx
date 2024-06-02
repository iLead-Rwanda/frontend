import React from "react";
import { Link } from "react-router-dom";
import images from "../../utils/images";
const Certificate = () => {
  return (
    <div className="">
      <p className="px-5 text-xl text-gray-800 font-semibold mb-5">
        All Certificates
      </p>
      <div className="grid grid-cols-4 gap-3">
        <img src={images.certificate} alt="" className="w-full" />
        <img src={images.certificate} alt="" className="w-full" />
        <img src={images.certificate} alt="" className="w-full" />
      </div>
    </div>
  );
};

export default Certificate;
