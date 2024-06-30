import React from "react";
import { Link } from "react-router-dom";
import images from "../utils/images";

const AllCertificates = () => {
  return (
    <div className="flex flex-col w-full justify-start items-center gap-3">
      <div className="flex w-full justify-center items-start gap-3">
        <Link to="/one">
          <img src={images.certificate} alt="" width={350} />
        </Link>
        <Link to="/one">
          <img src={images.certificate} alt="" width={350} />
        </Link>
        <Link to="/one">
          <img src={images.certificate} alt="" width={350} />
        </Link>
      </div>
    </div>
  );
};

export default AllCertificates;
