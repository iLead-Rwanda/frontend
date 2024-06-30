import React from 'react';
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import NewStudentNav from '../components/NewStudentNav';
import AddNewStudent from '../components/AddNewStudent';

const NewStudent=()=>{
    return(
        <div className="w-full flex">
        <Sidebar />
        <div className="h-full w-[82.5%] bg-[#f3f2f1] p-10 flex flex-col gap-10 absolute right-0">
          <Navbar />
          <NewStudentNav />
          <AddNewStudent />
        </div>
      </div>
    )
}

export default NewStudent;