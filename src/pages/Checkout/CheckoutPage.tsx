// src/pages/Checkout/CheckoutPage.tsx
import { useState, FormEvent } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';

const CheckoutPage = () => {
  const { user } = useAuth();
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Nepal',
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingCost = 100; // Example shipping cost
  const total = subtotal + shippingCost;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In the future, this will call the API to create an order.
    addToast("Order placement is for UI demonstration only for now.", "info");
    clearCart(); // Clear the cart after "placing" the order
    navigate('/account/my-orders'); // Redirect to order history
  };
  
  if (cartItems.length === 0) {
    navigate('/cart');
    return null; // Redirect if cart is empty
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-10">Checkout</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Shipping Details */}
          <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-xl shadow-sm border">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Shipping Information</h2>
            <div className="space-y-4">
              <Input label="Full Name" type="text" name="fullName" value={shippingInfo.fullName} onChange={handleChange} required testId="checkout-name-input" />
              <Input label="Address" type="text" name="address" value={shippingInfo.address} onChange={handleChange} placeholder="Street Address, P.O. Box" required testId="checkout-address-input" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="City" type="text" name="city" value={shippingInfo.city} onChange={handleChange} placeholder="e.g., Kathmandu" required testId="checkout-city-input" />
                <Input label="Postal Code" type="text" name="postalCode" value={shippingInfo.postalCode} onChange={handleChange} placeholder="e.g., 44600" required testId="checkout-postal-input" />
              </div>
              <Input label="Country" type="text" name="country" value={shippingInfo.country} onChange={() => {}} disabled testId="checkout-country-input" />
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-lg font-bold text-gray-900 border-b pb-4">Order Summary</h2>
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              {cartItems.map(item => (
                <div key={item.product._id} className="flex justify-between">
                  <span className="truncate pr-2">{item.product.name} x{item.quantity}</span>
                  <span>Rs. {(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t mt-4 pt-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <p>Subtotal</p>
                <p>Rs. {subtotal.toLocaleString()}</p>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <p>Shipping</p>
                <p>Rs. {shippingCost.toLocaleString()}</p>
              </div>
            </div>
            <div className="border-t mt-4 pt-4 flex justify-between text-base font-bold text-gray-900">
              <p>Total</p>
              <p>Rs. {total.toLocaleString()}</p>
            </div>
            <Button type="submit" fullWidth className="mt-6" testId="place-order-button">Place Order</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;