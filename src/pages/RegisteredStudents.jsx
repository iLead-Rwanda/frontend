import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import StudentNav from '../components/StudentNav';
import StudentList from '../components/StudentList';

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