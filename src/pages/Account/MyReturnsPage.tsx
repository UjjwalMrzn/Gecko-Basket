// src/pages/Account/MyReturnsPage.tsx

import { Undo2 } from "lucide-react";
import { Order } from "../../types/order";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
// We will need a new API function for this in the future
// import { fetchMyReturns } from "../../api/orderApi"; 
import Loader from "../../components/ui/Loader";

const MyReturnsPage = () => {
  const { token } = useAuth();
  const [returns, setReturns] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  
  // This logic will fetch real data once the backend is ready
  useEffect(() => {
    const getReturns = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      // Simulating loading for now, as the API doesn't exist yet
      setTimeout(() => {
        setLoading(false);
      }, 500);
      // In the future:
      // const response = await fetchMyReturns(token);
      // setReturns(response.data);
    };
    getReturns();
  }, [token]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6">My Returns</h2>
      {returns.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed rounded-lg" data-testid="no-returns-message">
          <Undo2 size={40} className="mx-auto text-gray-400" />
          <p className="text-sm text-gray-500 mt-4">You have no return requests.</p>
          <p className="text-xs text-gray-400 mt-1">You can request a return from your completed orders.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* This part will be built when the backend is ready */}
        </div>
      )}
    </div>
  );
};

export default MyReturnsPage;