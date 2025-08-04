import { useState, FormEvent, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart, CartItem } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';
import { createOrder } from '../../api/orderApi';
import { Order } from '../../types/order';
import axios from 'axios';

const CheckoutPage = () => {
  const { user, token } = useAuth();
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0 && !isSubmitting) {
      navigate('/cart');
    }
  }, [cartItems, navigate, isSubmitting]);

  const subtotal = cartItems.reduce((acc: number, item: CartItem) => acc + item.product.price * item.quantity, 0);
  const shippingCost = 100;
  const tax = 0;
  const total = subtotal + shippingCost + tax;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) {
      addToast("You must be logged in to place an order.", "error");
      return;
    }
    setIsSubmitting(true);

    const orderData = {
      orderItems: cartItems.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
        image: item.product.image,
        price: item.product.price,
        product: item.product._id,
      })),
      shippingAddress: {
        address: shippingInfo.address,
        city: shippingInfo.city,
        postalCode: shippingInfo.postalCode,
        country: shippingInfo.country,
      },
      paymentMethod: 'Cash on Delivery',
      itemsPrice: subtotal,
      taxPrice: tax,
      shippingPrice: shippingCost,
      totalPrice: total,
    };

    try {
      const response = await createOrder(orderData, token);
      const newOrder: Order = response.data;
      addToast("Order placed successfully!", "success");
      clearCart();
      navigate(`/order-confirmation/${newOrder._id}`);
    } catch (error: unknown) {
      let errorMessage = "Failed to place order. Please try again.";
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        if (axiosError.response?.data?.message) {
            errorMessage = axiosError.response.data.message;
        }
      }
      addToast(errorMessage, "error");
      console.error("Order placement failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-10">Checkout</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
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

          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm border sticky top-24">
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
            <Button type="submit" fullWidth className="mt-6" testId="place-order-button" disabled={isSubmitting}>
              {isSubmitting ? 'Placing Order...' : 'Place Order'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;