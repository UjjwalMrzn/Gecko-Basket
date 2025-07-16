import { Link } from 'react-router-dom';
import useCart from '../../hooks/usecart';
import { Trash2 } from 'lucide-react';
import Loader from '../../components/ui/Loader';
import ErrorMessage from '../../components/ui/ErrorMessage';
import Button from '../../components/ui/Button';

// 1. Define the shape of a product and a cart item
interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

// 2. Add the 'price: number' type to the helper function
const formatPrice = (price: number) => `Rs. ${price.toFixed(2)}`;

const CartPage = () => {
  // 3. Remove 'error' from the destructuring, as the hook doesn't return it
  const { cartItems, removeFromCart, addToCart: updateCart, loading } = useCart();

  // 4. Add types to the handler's parameters
  const handleQuantityChange = (product: Product, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(product._id);
    } else {
      updateCart(product, newQuantity);
    }
  };

  const subtotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  if (loading) {
    return <div className="flex justify-center py-20"><Loader /></div>;
  }

  // Since the hook doesn't provide a specific error, we check for an empty cart after loading
  if (!loading && cartItems.length === 0) {
    return (
        <div className="text-center bg-white p-10 rounded-lg shadow-sm">
          <p className="text-lg text-gray-600">Your cart is empty.</p>
          <Link to="/shop">
            <Button className="mt-4">Continue Shopping</Button>
          </Link>
        </div>
      )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Your Shopping Cart</h1>
        
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item: CartItem) => (
                  <li key={item.product._id} className="flex py-6 items-center">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                      <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover"/>
                    </div>
                    <div className="ml-4 flex-1 flex flex-col sm:flex-row sm:justify-between">
                      <div>
                        <h3 className="text-base font-medium text-gray-900">
                          <Link to={`/product/${item.product._id}`}>{item.product.name}</Link>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{formatPrice(item.product.price)} each</p>
                      </div>
                      <div className="flex items-center mt-4 sm:mt-0 sm:ml-6">
                        <div className="flex items-center border rounded-md">
                          <button onClick={() => handleQuantityChange(item.product, item.quantity - 1)} className="px-3 py-1 font-bold text-lg text-gray-600 hover:bg-gray-100">-</button>
                          <span className="px-4 py-1 text-base">{item.quantity}</span>
                          <button onClick={() => handleQuantityChange(item.product, item.quantity + 1)} className="px-3 py-1 font-bold text-lg text-gray-600 hover:bg-gray-100">+</button>
                        </div>
                        <button onClick={() => removeFromCart(item.product._id)} className="ml-4 font-medium text-red-600 hover:text-red-500">
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {/* Order Summary */}
            <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
              <div className="mt-6 space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <p>Subtotal</p>
                  <p>{formatPrice(subtotal)}</p>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between text-base font-medium text-gray-900">
                  <p>Order total</p>
                  <p>{formatPrice(subtotal)}</p>
                </div>
              </div>
              <div className="mt-6">
                <Button fullWidth>Proceed to Checkout</Button>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default CartPage;