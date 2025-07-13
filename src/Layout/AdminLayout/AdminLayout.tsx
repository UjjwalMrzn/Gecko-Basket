// src/layouts/AdminLayout.tsx
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";

const AdminLayout = () => {
  return (
    <div className="flex font-inter">
      {/* Fixed Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 ml-64 bg-[#fdfcf2] min-h-screen">
        {/* Sticky Admin Header */}
        <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
          <AdminHeader />
        </div>

        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
