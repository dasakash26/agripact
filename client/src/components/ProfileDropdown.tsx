// import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, SquareChevronUp } from "lucide-react";
import { SidebarMenuButton } from "./ui/sidebar";
import { Card } from "./ui/card";
// import axios from "axios";
import api from "@/api/axiosConfig";
import { toast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";

function ProfileDropdown() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await api.get("/user/logout");
      toast({
        title: "Logged out successfully!",
      });
      navigate("/login");
    } catch (error: any) {
      toast({
        title: error.response.data.message,
      });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton>
            <User /> User
            <SquareChevronUp className="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <Card>
          <DropdownMenuContent
            side="top"
            className="w-[--radix-popper-anchor-width] bg-[#47663B] shadow-lg rounded-lg p-2"
          >
            <Link to="/profile">
              <DropdownMenuItem className="p-2 on text-white rounded-lg cursor-pointer">
                <span>Account</span>
              </DropdownMenuItem>
            </Link>
            <Link to="/offer/all">
              <DropdownMenuItem className="p-2 on text-white rounded-lg cursor-pointer">
                <span>Offers</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="p-2 text-white rounded-lg">
              <span>Payments</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-2 text-white rounded-lg">
              <span>Contracts</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleLogout}
              className="p-2  text-white rounded-lg"
            >
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </Card>
      </DropdownMenu>
    </>
  );
}

export default ProfileDropdown;
