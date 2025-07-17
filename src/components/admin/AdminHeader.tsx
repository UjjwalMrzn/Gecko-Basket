import { Menu } from "lucide-react";

// ✅ DEFINE the props for the component
type Props = {
  onMenuClick: () => void;
};

const AdminHeader = ({ onMenuClick }: Props) => {
  return (
    <header className="px-4 sm:px-6 py-4 bg-white border-b flex items-center justify-between lg:justify-end">
      {/* ✅ Hamburger menu button - only visible on mobile */}
      <button onClick={onMenuClick} className="lg:hidden text-gray-600 hover:text-gray-900" aria-label="Open sidebar">
        <Menu size={24} />
      </button>
      
      <h1 className="text-sm font-semibold text-[#272343]">
        Welcome, Admin
      </h1>
    </header>
  );
};

export default AdminHeader;