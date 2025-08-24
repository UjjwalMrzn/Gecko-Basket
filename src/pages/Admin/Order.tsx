// src/pages/Admin/Order.tsx

import { useEffect, useState, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { adminGetAllOrders, adminUpdateOrderStatus } from "../../api/orderApi";
import type { Order } from "../../types/order";
import Skeleton from "../../components/ui/Skeleton";
import ErrorMessage from "../../components/ui/ErrorMessage";
import { Search, ChevronLeft, ChevronRight, RefreshCw, Truck, CheckCircle, XCircle, ChevronDown } from "lucide-react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useToast } from "../../context/ToastContext";
import CustomSelect from "../../components/ui/CustomSelect";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
};

const statusOptions = [
  { value: 'Processing', label: 'Processing', Icon: RefreshCw, className: 'text-yellow-600 bg-yellow-100' },
  { value: 'Shipped', label: 'Shipped', Icon: Truck, className: 'text-blue-600 bg-blue-100' },
  { value: 'Delivered', label: 'Delivered', Icon: CheckCircle, className: 'text-green-600 bg-green-100' },
  { value: 'Cancelled', label: 'Cancelled', Icon: XCircle, className: 'text-red-600 bg-red-100' },
];

const Order = () => {
  const { token } = useAuth();
  const { addToast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  useEffect(() => {
    const getOrders = async () => {
      if (!token) { setLoading(false); return; }
      try {
        setLoading(true);
        const response = await adminGetAllOrders(token);
        setOrders(response.data);
      } catch (err) { setError("Failed to fetch orders."); } finally { setLoading(false); }
    };
    getOrders();
  }, [token]);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    if (!token) return;
    try {
      const response = await adminUpdateOrderStatus(orderId, newStatus, token);
      const updatedOrder = response.data;
      setOrders(prev => prev.map(o => o._id === orderId ? updatedOrder : o));
      addToast(`Order status updated to ${newStatus}.`, "success");
    } catch (err) { addToast("Failed to update order status.", "error"); }
  };

  // FIX: Make the filter logic robust to handle orders with missing user data
  const filteredOrders = useMemo(() => {
    if (!searchTerm) return orders;
    return orders.filter(order => {
      const customerName = order.user?.name || ''; // Safely get name, default to ''
      const orderId = order._id || '';
      const lowerCaseSearchTerm = searchTerm.toLowerCase();

      return (
        customerName.toLowerCase().includes(lowerCaseSearchTerm) ||
        orderId.toLowerCase().includes(lowerCaseSearchTerm)
      );
    });
  }, [orders, searchTerm]);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const handleNextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };
  const handlePrevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };

  const renderStatusTrigger = (value: { value: string; }, isOpen: boolean) => {
    const selected = statusOptions.find(opt => opt.value === value.value) || statusOptions[0];
    return (
      <div className={`flex items-center justify-between px-3 py-1.5 text-xs font-semibold rounded-full transition ${selected.className}`} >
        <div className="flex items-center gap-1.5">
          <selected.Icon size={14} />
          <span>{selected.label}</span>
        </div>
        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
    );
  };

  const renderStatusOption = (option: typeof statusOptions[0], isSelected: boolean) => (
    <div className={`flex items-center gap-2 px-3 py-2 text-xs cursor-pointer ${isSelected ? 'bg-gray-100' : 'hover:bg-gray-50'}`}>
      <option.Icon size={14} className={option.className.split(' ')[0]} />
      <span className="text-gray-800">{option.label}</span>
    </div>
  );

  if (loading) return <div className="space-y-2"><Skeleton className="h-10 w-1/3 mb-4" />{Array.from({ length: 5 }).map((_, i) => (<Skeleton key={i} className="h-16 w-full" />))}</div>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="font-inter" data-testid="admin-orders-page">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-[#272343]">Manage Orders</h1>
        <div className="relative w-full sm:w-64">
          <Input type="text" label="" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by name or ID..." className="w-full" testId="order-search-input" />
          <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <div className="overflow-x-auto border rounded-xl bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 text-left">
            <tr>
              <th className="px-4 py-3 font-semibold w-16">S.N</th>
              <th className="px-4 py-3 font-semibold">Customer</th>
              <th className="px-4 py-3 font-semibold">Order ID</th>
              <th className="px-4 py-3 font-semibold">Date</th>
              <th className="px-4 py-3 font-semibold">Total</th>
              <th className="px-4 py-3 font-semibold text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentOrders.map((order, index) => {
              const selectedOption = statusOptions.find(opt => opt.value === order.status) || statusOptions[0];
              return (
                <tr key={order._id}>
                  <td className="px-4 py-3 font-medium text-gray-500">{indexOfFirstOrder + index + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{order.user?.name || 'N/A'}</td>
                  <td className="px-4 py-3 text-gray-600 font-mono text-xs">#{order._id.substring(order._id.length - 8).toUpperCase()}</td>
                  <td className="px-4 py-3 text-gray-500">{formatDate(order.createdAt)}</td>
                  <td className="px-4 py-3 font-bold text-gray-800">Rs. {order.totalPrice.toLocaleString()}</td>
                  <td className="px-4 py-3 flex justify-center">
                    <CustomSelect
                      value={selectedOption}
                      options={statusOptions}
                      onChange={(option) => handleStatusChange(order._id, option.value)}
                      renderTrigger={renderStatusTrigger}
                      renderOption={renderStatusOption}
                      testId={`status-select-${order._id}`}
                    />
                  </td>
                </tr>
              )}
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          <span>Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong></span>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={handlePrevPage} disabled={currentPage === 1} testId="pagination-prev-button"><ChevronLeft size={16} /> Previous</Button>
            <Button size="sm" variant="outline" onClick={handleNextPage} disabled={currentPage === totalPages} testId="pagination-next-button">Next <ChevronRight size={16} /></Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Order;