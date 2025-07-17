// src/Layout/AdminLayout/AdminLayout.tsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen font-inter bg-[#f9fafb]">
      <Sidebar 
        isMobileOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      <div className="flex-1 lg:ml-64">
        <header className="sticky top-0 z-30">
          <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
        </header>
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;