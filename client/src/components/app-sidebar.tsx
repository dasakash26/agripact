import { useState } from "react";
import {
  HandCoinsIcon,
  Handshake,
  Home,
  Search,
  Settings,
  Menu,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import ProfileDropdown from "./ProfileDropdown";
import Logo from "./Logo";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Find Offers",
    url: "/search",
    icon: Search,
  },
  {
    title: "Create Offer",
    url: "/offer/new",
    icon: HandCoinsIcon,
  },
  {
    title: "Negotiations",
    url: "/negotiations",
    icon: Handshake,
  },
  {
    title: "Contracts",
    url: "/contracts",
    icon: Handshake,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

const getLinkClassName = ({ isActive }: { isActive: boolean }) => {
  return [
    "w-full flex items-center gap-3 p-2.5 rounded-lg transition-all duration-200 whitespace-nowrap",
    isActive
      ? "bg-primary/10 text-primary font-medium"
      : "text-muted-foreground hover:bg-primary/5 hover:text-primary",
  ].join(" ");
};

export function AppSidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 z-20 m-4">
        <Button variant="outline" size="icon" onClick={toggleMobileMenu}>
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      <Sidebar
        className={`bg-background border-border shadow-sm transition-all duration-300 ease-in-out min-h-screen ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        collapsible="offcanvas"
        variant="sidebar"
      >
        <div className="flex items-center justify-center h-16 bg-primary text-primary-foreground overflow-hidden">
          <Logo />
        </div>
        <SidebarContent className="relative px-3 py-4">
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground px-2 mb-2 overflow-hidden">
              Menu
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={getLinkClassName}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="w-5 h-5 shrink-0 flex-none" />
                      <span className="flex-grow text-sm">{item.title}</span>
                    </NavLink>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="px-3 py-4 border-t">
          <SidebarMenu>
            <SidebarMenuItem>
              <ProfileDropdown />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-foreground/50 z-10 md:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </>
  );
}
