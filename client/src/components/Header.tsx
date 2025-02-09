// import React from "react";
import Logo from "./Logo";
import { SidebarTrigger } from "./ui/sidebar";
import Notification from "./Notification";

function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-[#224422] h-16 flex items-center justify-between px-4 shadow-md z-20">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-white hover:text-gray-200" />
        <Logo />
      </div>
      <Notification />
    </div>
  );
}

export default Header;
