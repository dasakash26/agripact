import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  User,
  Settings,
  FileText,
  CreditCard,
  HandshakeIcon,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Card } from "./ui/card";
import api from "@/api/axiosConfig";
import { toast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/hooks/useUser";

function ProfileDropdown() {
  const navigate = useNavigate();
  const { user, isLoading } = useUser();
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full flex items-center justify-between gap-2 px-2 py-1.5 h-auto"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium">
                {isLoading ? "Loading..." : user?.name || "Guest"}
              </span>
              <span className="text-xs text-muted-foreground">
                {isLoading ? "..." : user?.email || "guest@example.com"}
              </span>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <Card>
        <DropdownMenuContent
          align="start"
          sideOffset={8}
          className="w-56 bg-[var(--primary)] shadow-lg rounded-lg p-3"
        >
          <Link to="/profile">
            <DropdownMenuItem className="flex items-center gap-2 p-2.5 text-white rounded-lg cursor-pointer hover:bg-[var(--secondary)] transition-colors">
              <Settings className="w-4 h-4" />
              <span>Account</span>
            </DropdownMenuItem>
          </Link>
          <Link to="/offer/all">
            <DropdownMenuItem className="flex items-center gap-2 p-2 text-white rounded-lg cursor-pointer hover:bg-[var(--secondary)] transition-colors">
              <FileText className="w-4 h-4" />
              <span>Offers</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="flex items-center gap-2 p-2 text-white rounded-lg cursor-pointer hover:bg-[var(--secondary)] transition-colors">
            <CreditCard className="w-4 h-4" />
            <span>Payments</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 p-2 text-white rounded-lg cursor-pointer hover:bg-[var(--secondary)] transition-colors">
            <HandshakeIcon className="w-4 h-4" />
            <span>Contracts</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="my-2 bg-[var(--secondary)]" />
          <DropdownMenuItem
            onClick={handleLogout}
            className="flex items-center gap-2 p-2 text-white rounded-lg cursor-pointer hover:bg-[var(--secondary)] transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </Card>
    </DropdownMenu>
  );
}

export default ProfileDropdown;
