// src/pages/Account/MyOrderPage.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Order } from "../../types/order";
import { fetchMyOrders } from "../../api/orderApi";
import Loader from "../../components/ui/Loader";
import ErrorMessage from "../../components/ui/ErrorMessage";
import Button from "../../components/ui/Button";
import { ShoppingBag, ChevronDown, RefreshCw, Truck, CheckCircle, XCircle } from "lucide-react";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
};

// FIX 1: Create a professional status badge component
const StatusBadge = ({ status }: { status: Order['status'] }) => {
  const statusConfig = {
    Delivered: { Icon: CheckCircle, className: 'bg-green-100 text-green-800' },
    Shipped: { Icon: Truck, className: 'bg-blue-100 text-blue-800' },
    Cancelled: { Icon: XCircle, className: 'bg-red-100 text-red-800' },
    Processing: { Icon: RefreshCw, className: 'bg-yellow-100 text-yellow-800' },
  };

  const { Icon, className } = statusConfig[status] || statusConfig.Processing;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full ${className}`}>
      <Icon size={14} />
      {status}
    </span>
  );
};


const OrderRow = ({ order, index }: { order: Order, index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <tr 
        onClick={() => setIsOpen(!isOpen)} 
        className="cursor-pointer hover:bg-gray-50/70 transition-colors"
        data-testid={`order-row-${order._id}`}
      >
        <td className="px-6 py-4 font-medium text-gray-600">{index + 1}</td>
        <td className="px-6 py-4 font-mono text-xs text-gray-600">#{order._id.substring(order._id.length - 8).toUpperCase()}</td>
        <td className="px-6 py-4 text-gray-800">{formatDate(order.createdAt)}</td>
        <td className="px-6 py-4 font-bold text-gray-900">Rs. {order.totalPrice.toLocaleString()}</td>
        <td className="px-6 py-4">
          {/* FIX 2: Use the new StatusBadge component */}
          <StatusBadge status={order.status} />
        </td>
        <td className="px-6 py-4 text-right">
          <ChevronDown size={20} className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </td>
      </tr>

      {isOpen && (
        <tr className="bg-gray-50/60">
          <td colSpan={6} className="p-4 sm:p-6" data-testid={`order-details-${order._id}`}>
            <h4 className="font-semibold text-gray-800 text-sm mb-4">Items in this order:</h4>
            <ul className="space-y-4 max-w-2xl">
              {order.orderItems.map((item, idx) => (
                <li key={idx} className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg border bg-white object-contain p-1" />
                  <div className="flex-1 text-sm">
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-800">Rs. {item.price.toLocaleString()}</p>
                </li>
              ))}
            </ul>
          </td>
        </tr>
      )}
    </>
  );
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

  if (loading) return <div className="flex justify-center items-center h-full"><Loader /></div>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Order History</h1>
        <p className="text-gray-600 mt-2 text-sm">Click on an order to view the items inside.</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed rounded-lg" data-testid="no-orders-message">
          <ShoppingBag size={40} className="mx-auto text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-800 mt-5">You Have No Orders Yet</h2>
          <p className="text-gray-500 mt-2 text-sm">When you place an order, it will appear here.</p>
          <Link to="/shop">
            <Button className="mt-6" testId="start-shopping-button">Start Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto border rounded-xl bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50/80 text-gray-600 text-left">
              <tr>
                <th className="px-6 py-4 font-semibold w-16">S.N</th>
                <th className="px-6 py-4 font-semibold">Order ID</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Total</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order, index) => (
                <OrderRow key={order._id} order={order} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;