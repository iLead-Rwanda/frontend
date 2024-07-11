import React from "react";
import Sidebar from "../ui/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";
import BottomBar from "../ui/BottomBar";
import MobileNav from "../ui/MobileNav";

const AppLayout = () => {
  return (
    <>
      <div className="hidden lg:flex w-screen h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-grow overflow-hidden flex flex-col">
          <Navbar />
          <div className="p-4 flex-grow overflow-y-auto bg-background">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="flex lg:hidden w-screen h-screen overflow-hidden flex-col">
        <MobileNav />
        <div className="p-4 flex-grow overflow-y-auto bg-background">
          <Outlet />
        </div>
        <BottomBar />
      </div>
    </>
  );
};

export default AppLayout;
