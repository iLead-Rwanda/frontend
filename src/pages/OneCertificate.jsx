import React from 'react';
import Sidebar from '../components/ui/Sidebar';
import Navbar from '../components/ui/Navbar';
import SingleCertifiate from '../components/SingleCertificate';
import CertiOneNav from '../components/CertiOneNav';

const OneCertifiate=()=>{
    return(
        <div className='w-full flex'>
        <Sidebar />
        <div className=' h-full w-[82.5%] bg-[#f3f2f1] p-10 flex flex-col gap-8 absolute right-0'>
          <Navbar />
          <CertiOneNav />
          <SingleCertifiate />
        </div>
    </div>
    )
}

export default OneCertifiate;