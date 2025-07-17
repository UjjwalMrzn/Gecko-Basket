// src/components/admin/AdminHeader.tsx
import { Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

type Props = {
  onMenuClick: () => void;
};

const AdminHeader = ({ onMenuClick }: Props) => {
  const { user } = useAuth();
  const adminName = user?.name?.split(' ')[0] || 'Admin';

  return (
    <header className="px-4 sm:px-6 py-4 bg-white border-b flex items-center justify-between lg:justify-end">
      {/* This button is only visible on screens smaller than lg */}
      <button
        onClick={onMenuClick}
        className="lg:hidden text-gray-600 hover:text-[#59b143]"
        aria-label="Open sidebar"
      >
        <Menu size={24} />
      </button>
      
      <p className="text-sm font-semibold text-[#272343]">
        Welcome, {adminName}
      </p>
    </header>
  );
};

export default AdminHeader;