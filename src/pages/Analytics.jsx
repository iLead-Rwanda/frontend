import React from 'react';
import Sidebar from "../components/ui/Sidebar";
import Navbar from "../components/ui/Navbar";
import Gif from '../components/Gif';

const Analytics=()=>{
    return(
        <div className="w-full flex">
        <Sidebar />
        <div className="h-full w-[82.5%] bg-[#f3f2f1] p-10 flex flex-col gap-8 absolute right-0">
          <Navbar />
          <Gif />
        </div>
      </div>
    )
}
export default Analytics