import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { fetchMyOrders } from "../../api/orderApi";
import { Order } from "../../types/order";
import Loader from "../../components/ui/Loader";
import ErrorMessage from "../../components/ui/ErrorMessage";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });
};

const MyOrdersPage = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getOrders = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetchMyOrders(token);
        setOrders(response.data);
      } catch (err) {
        setError("Failed to fetch your orders.");
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, [token]);

  if (loading) return <div className="flex justify-center py-20"><Loader /></div>;
  if (error) return <ErrorMessage message={error} />;

  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-semibold text-gray-800">No Orders Found</h2>
        <p className="text-gray-500 mt-2">You haven't placed any orders with us yet.</p>
        <Link to="/shop">
          <Button className="mt-6">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">My Orders</h2>
      <div className="overflow-x-auto border rounded-xl bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 text-left">
            <tr>
              <th className="px-4 py-3 font-semibold">Order ID</th>
              <th className="px-4 py-3 font-semibold">Date</th>
              <th className="px-4 py-3 font-semibold">Total</th>
              <th className="px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="px-4 py-3 font-mono text-xs text-gray-500">#{order._id.substring(order._id.length - 8)}</td>
                <td className="px-4 py-3 text-gray-600">{formatDate(order.createdAt)}</td>
                <td className="px-4 py-3 font-medium text-gray-800">Rs. {order.totalPrice.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${order.isDelivered ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {order.isDelivered ? "Delivered" : "Processing"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrdersPage;