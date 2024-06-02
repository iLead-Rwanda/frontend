import React from "react";
import Sidebar from "../ui/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";

const AppLayout = () => {
  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-grow overflow-hidden flex flex-col">
        <Navbar />
        <div className="p-4 flex-grow overflow-y-auto bg-background">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
