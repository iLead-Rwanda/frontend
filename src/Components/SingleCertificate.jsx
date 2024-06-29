import React from 'react';
import certificate from "../Assets/certificate.png"

const SingleCertificate = () => {
  return (
    <div className='flex flex-col w-full justify-start items-center gap-3'>
      <div className='flex w-full justify-center items-start gap-3'>
        <img  src={certificate} alt="" id="certificate-img" />
      </div>
    </div>
  );
};

export default SingleCertificate;