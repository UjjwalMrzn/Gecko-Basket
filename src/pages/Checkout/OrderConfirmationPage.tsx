// src/pages/Checkout/OrderConfirmationPage.tsx
import { Link, useParams } from "react-router-dom";
import Button from "../../components/ui/Button";
import { CheckCircle } from "lucide-react";

const OrderConfirmationPage = () => {
  const { orderId } = useParams<{ orderId: string }>();

  return (
    <div className="bg-gray-50 min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border text-center">
        <CheckCircle size={64} className="mx-auto text-green-500" />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-6">Thank You for Your Order!</h1>
        <p className="text-gray-600 mt-2">Your order has been placed successfully.</p>
        {orderId && (
          <p className="text-sm text-gray-500 mt-4">
            Your Order ID is: <span className="font-mono font-medium text-gray-800" data-testid="confirmation-order-id">#{orderId.substring(orderId.length - 8).toUpperCase()}</span>
          </p>
        )}
        <p className="text-sm text-gray-500 mt-1">
          You can view your order details in your account page.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
          <Link to="/account/my-orders">
            <Button variant="outline" testId="confirmation-view-orders-button">View My Orders</Button>
          </Link>
          <Link to="/shop">
            <Button testId="confirmation-continue-shopping-button">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;