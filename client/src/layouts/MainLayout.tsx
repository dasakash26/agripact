import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      {" "}
      <SidebarProvider>
        <Header />
        <AppSidebar />
        <Outlet />
      </SidebarProvider>
    </>
  );
}
