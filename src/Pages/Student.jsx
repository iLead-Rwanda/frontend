import React from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import StudentInfo from '../Components/StudentInfo';

const Student=()=>{
    return(
        <div className='w-full flex'>
        <Sidebar />
        <div className='w-[82.5%] bg-[#f3f2f1] p-10 flex flex-col gap-8 absolute right-0 h-full'>
          <Navbar />
          <StudentInfo />       
        </div>
    </div>
    )
}

export default Student;