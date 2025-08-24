// src/pages/Checkout/CheckoutPage.tsx
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
import { ShippingAddress } from '../../types/address';
import { Edit } from 'lucide-react';

// Mock data - in the future, this will come from an API call
const mockAddresses: ShippingAddress[] = [
  {
    _id: '1',
    fullName: 'Ujjwal Maharjan',
    phoneNumber: '9840000001',
    addressLine1: 'Naya Naikap, Bus Stop',
    addressLine2: '',
    city: 'Kathmandu',
    postalCode: '44600',
    country: 'Nepal',
    isDefault: true,
  },
  {
    _id: '2',
    fullName: 'Jen Gecko',
    phoneNumber: '9840000002',
    addressLine1: 'Pulchowk, Lalitpur',
    addressLine2: 'Near the big temple',
    city: 'Lalitpur',
    postalCode: '44700',
    country: 'Nepal',
    isDefault: false,
  },
];


const CheckoutPage = () => {
  const { user, token } = useAuth();
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const { addToast } = useToast();

  // For now, we use mock data. This will be replaced with a real API call.
  const [savedAddresses, setSavedAddresses] = useState(mockAddresses);
  const [selectedAddress, setSelectedAddress] = useState<ShippingAddress | null>(
    savedAddresses.find(addr => addr.isDefault) || (savedAddresses.length > 0 ? savedAddresses[0] : null)
  );

  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || '',
    phoneNumber: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Nepal',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(savedAddresses.length === 0);

  useEffect(() => {
    if (cartItems.length === 0 && !isSubmitting) {
      navigate('/cart');
    }
  }, [cartItems, navigate, isSubmitting]);

  const subtotal = cartItems.reduce((acc: number, item: CartItem) => acc + item.product.price * item.quantity, 0);
  const shippingCost = 100;
  const total = subtotal + shippingCost;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) return;
    if (!selectedAddress && !showAddressForm) {
      addToast("Please select or add a shipping address.", "error");
      return;
    }
    // ... rest of the submit logic
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-10">Checkout</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-xl shadow-sm border">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Shipping Information</h2>

            {/* ✅ SMART UI: Conditionally show address list or form */}
            {!showAddressForm && savedAddresses.length > 0 ? (
              <div className="space-y-4">
                {savedAddresses.map(addr => (
                  <div 
                    key={addr._id} 
                    onClick={() => setSelectedAddress(addr)}
                    className={`p-4 rounded-lg border cursor-pointer transition ${selectedAddress?._id === addr._id ? 'border-green-500 bg-green-50/50 ring-2 ring-green-200' : 'bg-white hover:bg-gray-50'}`}
                    data-testid={`address-option-${addr._id}`}
                  >
                    <p className="font-bold text-gray-800">{addr.fullName}</p>
                    <p className="text-sm text-gray-600 mt-1">{addr.addressLine1}, {addr.city}</p>
                    <p className="text-sm text-gray-600">Phone: {addr.phoneNumber}</p>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => setShowAddressForm(true)} testId="add-new-address-button-checkout">
                  Add a New Address
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Input label="Full Name" type="text" name="fullName" value={shippingInfo.fullName} onChange={() => {}} required testId="checkout-name-input" />
                <Input label="Phone Number" type="tel" name="phoneNumber" value={shippingInfo.phoneNumber} onChange={() => {}} required testId="checkout-phone-input" />
                <Input label="Address" type="text" name="address" value={shippingInfo.address} onChange={() => {}} placeholder="Street Address" required testId="checkout-address-input" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="City" type="text" name="city" value={shippingInfo.city} onChange={() => {}} required testId="checkout-city-input" />
                  <Input label="Postal Code" type="text" name="postalCode" value={shippingInfo.postalCode} onChange={() => {}} required testId="checkout-postal-input" />
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm border sticky top-24">
            {/* ... order summary code ... */}
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