import Logo from "./Logo";
import { SidebarTrigger } from "./ui/sidebar";
import Notification from "./Notification";

function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-[#1f3d1f]/95 to-[#224422]/95 backdrop-blur-sm h-16 flex items-center justify-between px-4 sm:px-6 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out z-20">
      <div className="flex items-center gap-4 sm:gap-6">
        <SidebarTrigger className="text-white/90 hover:text-white active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-[#1f3d1f] rounded-lg" />
        <div className="hover:opacity-90 active:opacity-100 transition-all duration-200">
          <Logo />
        </div>
      </div>
      <div className="hover:opacity-90 active:opacity-100 transition-all duration-200">
        <Notification />
      </div>
    </div>
  );
}

export default Header;
