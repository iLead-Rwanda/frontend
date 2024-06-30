import React from 'react';
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import NewStudentNav from '../Components/NewStudentNav';
import AddNewStudent from '../Components/AddNewStudent';

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