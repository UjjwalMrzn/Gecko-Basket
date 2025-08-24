// src/pages/Account/MyCancellationsPage.tsx

import { Link } from "react-router-dom";
import { XCircle } from "lucide-react";
import Button from "../../components/ui/Button";
import { Order } from "../../types/order"; // Import the Order type
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { fetchMyOrders } from "../../api/orderApi";
import Loader from "../../components/ui/Loader";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
};

const MyCancellationsPage = () => {
  const { token } = useAuth();
  const [cancellations, setCancellations] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // This logic will fetch real data once the backend is ready
  useEffect(() => {
    const getOrders = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetchMyOrders(token);
        // We filter for orders with the 'Cancelled' status
        setCancellations(response.data.filter(order => order.status === 'Cancelled'));
      } catch (err) {
        console.error("Failed to fetch cancelled orders.");
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, [token]);


  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">My Cancellations</h2>
      {cancellations.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed rounded-lg" data-testid="no-cancellations-message">
          <XCircle size={40} className="mx-auto text-gray-400" />
          <p className="text-sm text-gray-500 mt-4">You have no cancelled orders.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {cancellations.map(order => (
            <div key={order._id} className="border rounded-lg p-4 flex justify-between items-center" data-testid={`cancellation-card-${order._id}`}>
              <div>
                <p className="font-semibold text-gray-800">{order.orderItems[0]?.name || 'Order'}</p>
                <p className="text-sm text-gray-500 mt-1">Cancelled on: {formatDate(order.createdAt)}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800">Rs. {order.totalPrice.toLocaleString()}</p>
                <span className="text-xs bg-red-100 text-red-700 font-medium px-2 py-0.5 rounded-full mt-1">Cancelled</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCancellationsPage;