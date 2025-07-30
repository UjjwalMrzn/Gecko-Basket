import { Link } from 'react-router-dom';
import { useCart, CartItem } from '../../context/CartContext';
import Button from '../../components/ui/Button';
import { Trash2, Minus, Plus } from 'lucide-react';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();

  const subtotal = cartItems.reduce((acc: number, item: CartItem) => acc + item.product.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto text-center py-20 px-4">
        <h1 className="text-3xl font-bold text-gray-800">Your Cart is Empty</h1>
        <p className="text-gray-600 mt-4">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/shop">
          <Button className="mt-6" testId="continue-shopping-button">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Cart Items */}
          <div className="w-full lg:w-2/3 bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h1 className="text-2xl font-bold">Shopping Cart ({cartItems.length})</h1>
              <button onClick={clearCart} className="text-sm text-red-500 hover:underline" data-testid="clear-cart-button">Clear all</button>
            </div>
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item: CartItem) => (
                <li key={item.product._id} className="flex py-6 items-start sm:items-center">
                  <img src={item.product.image} alt={item.product.name} className="h-24 w-24 sm:h-28 sm:w-28 rounded-md border object-contain"/>
                  <div className="ml-4 flex-1 flex flex-col sm:flex-row justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">
                        <Link to={`/product/${item.product._id}`}>{item.product.name}</Link>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">Rs. {item.product.price}</p>
                      <button onClick={() => removeFromCart(item.product._id)} className="mt-3 text-xs font-medium text-red-500 hover:text-red-700 flex items-center gap-1 sm:hidden" data-testid={`remove-from-cart-button-mobile-${item.product._id}`}>
                        <Trash2 size={12} /> Remove
                      </button>
                    </div>
                    <div className="flex items-center gap-4 mt-3 sm:mt-0">
                      <div className="flex items-center border rounded-lg">
                        <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)} className="px-3 py-2 text-gray-500 hover:bg-gray-100 transition" data-testid={`quantity-decrease-button-${item.product._id}`}><Minus size={14}/></button>
                        <span className="px-4 font-bold text-sm" data-testid={`quantity-display-${item.product._id}`}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)} className="px-3 py-2 text-gray-500 hover:bg-gray-100 transition" data-testid={`quantity-increase-button-${item.product._id}`}><Plus size={14}/></button>
                      </div>
                      <button onClick={() => removeFromCart(item.product._id)} className="text-gray-400 hover:text-red-500 transition hidden sm:block" title="Remove item" data-testid={`remove-from-cart-button-${item.product._id}`}>
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 border-b pb-4">Order Summary</h2>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <p>Subtotal</p>
                <p>Rs. {subtotal.toLocaleString()}</p>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <p>Shipping</p>
                <p>Free</p>
              </div>
            </div>
            <div className="border-t mt-4 pt-4 flex justify-between text-base font-bold text-gray-900">
              <p>Order Total</p>
              <p>Rs. {subtotal.toLocaleString()}</p>
            </div>
            <Link to="/checkout" className="block mt-6">
              <Button fullWidth testId="checkout-button">Proceed to Checkout</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;