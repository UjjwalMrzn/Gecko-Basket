// src/pages/Admin/Dashboard.tsx
import { useEffect, useState } from "react";
import { Package, ShoppingBag, Users, DollarSign } from "lucide-react";
import Skeleton from "../../components/ui/Skeleton";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0,
  });

  useEffect(() => {
    setTimeout(() => {
      setStats({
        products: 128,
        orders: 452,
        users: 78,
        revenue: 64000,
      });
      setLoading(false);
    }, 1500);
  }, []);

  const cards = [
    { label: "Total Products", value: stats.products, icon: Package },
    { label: "Total Orders", value: stats.orders, icon: ShoppingBag },
    { label: "Total Users", value: stats.users, icon: Users },
    {
      label: "Revenue",
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
