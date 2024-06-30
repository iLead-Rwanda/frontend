import React from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import AllCertificates from '../Components/AllCertificates';

import CertiNav from '../Components/CertiNav';
const Certificate=()=>{
    return(
        <div className='w-full flex'>
        <Sidebar />
        <div className=' h-full w-[82.5%] bg-[#f3f2f1] p-10 flex flex-col gap-8 absolute right-0'>
          <Navbar />
          <CertiNav />
          <AllCertificates />
        </div>
    </div>
    )
}

export default Certificate