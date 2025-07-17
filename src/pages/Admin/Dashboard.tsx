// src/pages/Admin/Dashboard.tsx
import { useEffect, useState } from "react";
import { Package, ShoppingBag, Users, DollarSign } from "lucide-react";
import Skeleton from "../../components/ui/Skeleton";
import { useAuth } from "../../context/AuthContext";
import { fetchAllProducts } from "../../api/productsApi";
import { fetchAllOrders } from "../../api/orderApi";
import { fetchAllUsers } from "../../api/adminApi";

interface Stats {
  products: number;
  orders: number;
  users: number;
  revenue: number;
}

const StatCard = ({ label, value, icon: Icon, loading }: { label: string, value: string | number, icon: React.ElementType, loading: boolean }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-center gap-4">
    <div className="p-3 bg-[#e6f4e7] text-[#59b143] rounded-full">
      <Icon size={20} />
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      {loading ? (
        <Skeleton className="h-5 w-20 mt-1" />
      ) : (
        <p className="text-xl font-bold text-[#272343]">{value}</p>
      )}
    </div>
  </div>
);

const Dashboard = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState<Stats>({ products: 0, orders: 0, users: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!token) return;

      try {
        setLoading(true);
        const [productsRes, ordersRes, usersRes] = await Promise.all([
          fetchAllProducts(),
          fetchAllOrders(token),
          fetchAllUsers(token)
        ]);
        
        const totalRevenue = ordersRes.data.reduce((acc: number, order: any) => acc + order.totalPrice, 0);

        setStats({
          // This now works correctly because fetchAllProducts returns the full response
          products: productsRes.data.length,
          orders: ordersRes.data.length,
          users: usersRes.data.length,
          revenue: totalRevenue,
        });

      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  const cards = [
    { label: "Total Products", value: stats.products, icon: Package },
    { label: "Total Orders", value: stats.orders, icon: ShoppingBag },
    { label: "Total Users", value: stats.users, icon: Users },
    { label: "Revenue", value: `Rs. ${stats.revenue.toLocaleString()}`, icon: DollarSign },
  ];

  return (
    <section>
      <h1 className="text-2xl font-bold text-[#272343] mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map(({ label, value, icon }) => (
          <StatCard key={label} label={label} value={value} icon={icon} loading={loading} />
        ))}
      </div>
    </section>
  );
};

export default Dashboard;