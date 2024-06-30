import React from "react";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-grow overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
