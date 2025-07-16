import { useEffect, useState } from "react";
import { Package, ShoppingBag, Users, DollarSign } from "lucide-react";
import Skeleton from "../../components/ui/Skeleton";
import { useAuth } from "../../context/AuthContext";
import { fetchDashboardStats } from "../../api/adminApi";

const Dashboard = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0,
  });

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const getStats = async () => {
      setLoading(true);
      try {
        const data = await fetchDashboardStats(token);
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    getStats();
  }, [token]);

  const cards = [
    { label: "Total Products", value: stats.products, icon: Package },
    { label: "Total Orders", value: stats.orders, icon: ShoppingBag },
    { label: "Total Users", value: stats.users, icon: Users },
    {
      label: "Total Revenue",
      value: `Rs. ${stats.revenue.toLocaleString()}`,
      icon: DollarSign,
    },
  ];

  return (
    <section className="w-full">
      <h1 className="text-2xl font-bold text-[#272343] mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-center gap-4"
          >
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
        ))}
      </div>
    </section>
  );
};

export default Dashboard;