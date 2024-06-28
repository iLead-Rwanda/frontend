import React from 'react';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import StudentNav from '../Components/StudentNav';
import StudentList from '../Components/StudentList';

const RegisteredStudents=()=>{
    return(
        <div className='w-full flex'>
        <Sidebar />
        <div className='w-[82.5%] bg-[#f3f2f1] p-10 flex flex-col gap-8 absolute right-0 h-full'>
          <Navbar />
          <StudentNav />
          <StudentList />
        </div>
    </div>
    )
}

export default RegisteredStudents