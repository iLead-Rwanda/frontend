import React from "react";
import PropTypes from "prop-types"; // For prop types validation
import images from "../../utils/images";

const ICHOOSE = ({ name }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl  pt-40 pb-10 px-[10%] w-full">
      <h1 className="text-[200%] font-bold text-center">
        Certificate of Completion
      </h1>
      <h2 className="text-[150%] text-center mt-4">Hereby certifies that</h2>
      <h3 className="text-[200%] font-semibold text-center mt-4">{name}</h3>
      <div className="border-t-2 border-black my-6"></div>
      <p className="text-lg text-center">
        completed the iChoose leadership values program.
        <br />
        You have learned and applied 16 leadership values and choose to continue
        applying these values daily.
      </p>
      <div className="flex justify-between items-center mt-8">
        <div className="text-lg">
          <p>Date: {new Date().toLocaleDateString()}</p>
        </div>
        <div className="text-center">
          <img
            src={images.signature}
            alt="Signature"
            className="w-32 mx-auto"
          />
          <p className="mt-2">iLead Program Founder</p>
          <p className="font-semibold">John C. Maxwell</p>
        </div>
      </div>
      <div className="flex justify-around items-center mt-8">
        <img
          src={images.maxwellFoundation}
          alt="Maxwell Logo"
          className="h-20"
        />
        <p className="text-lg">In partnership with</p>
        <img
          src={images.africaNewLife}
          alt="Africa New Life Logo"
          className="h-10"
        />
      </div>
    </div>
  );
};

ICHOOSE.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ICHOOSE;
