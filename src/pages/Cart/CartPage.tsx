// src/pages/Cart/CartPage.tsx
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import Button from '../../components/ui/Button';

const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity, loading } = useCart();

    const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    if (loading) {
        return <div className="text-center py-20">Loading Cart...</div>;
    }

    if (cartItems.length === 0) {
        return (
            <div className="text-center py-20 px-4">
                <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
                <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
                <Link to="/shop">
                    <Button testId="cart-continue-shopping-button">Continue Shopping</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-inter">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">Shopping Cart</h1>
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-grow lg:w-2/3 bg-white p-6 rounded-lg shadow-sm">
                        <ul role="list" className="divide-y divide-gray-200">
                            {cartItems.map((item) => (
                                <li key={item.product._id} className="flex py-6" data-testid={`cart-item-${item.product._id}`}>
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                        <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover object-center" />
                                    </div>
                                    <div className="ml-4 flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <h3>
                                                    <Link to={`/product/${item.product._id}`}>{item.product.name}</Link>
                                                </h3>
                                                <p className="ml-4">Rs. {(item.product.price * item.quantity).toLocaleString()}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            <div className="flex items-center border rounded-md">
                                                <button onClick={() => updateQuantity(item.product._id, item.quantity - 1)} className="p-2" data-testid="quantity-decrease-button"><Minus size={14}/></button>
                                                <span className="px-3">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.product._id, item.quantity + 1)} className="p-2" data-testid="quantity-increase-button"><Plus size={14}/></button>
                                            </div>
                                            <div className="flex">
                                                <button
                                                    onClick={() => removeFromCart(item.product._id)}
                                                    type="button"
                                                    className="font-medium text-red-600 hover:text-red-500 flex items-center gap-1"
                                                    data-testid="remove-from-cart-button"
                                                >
                                                   <Trash2 size={16}/> Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-sm h-fit">
                        <h2 className="text-lg font-medium text-gray-900 border-b pb-4">Order Summary</h2>
                        <div className="mt-4 space-y-2">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-600">Subtotal</p>
                                <p className="text-sm font-medium text-gray-900" data-testid="cart-subtotal">Rs. {subtotal.toLocaleString()}</p>
                            </div>
                            {/* Shipping and Tax can be added here */}
                            <div className="flex items-center justify-between border-t pt-4 mt-4">
                                <p className="text-base font-medium text-gray-900">Order total</p>
                                <p className="text-base font-medium text-gray-900" data-testid="cart-total">Rs. {subtotal.toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="mt-6">
                            <Link to="/checkout">
                                <Button fullWidth testId="checkout-button">Proceed to Checkout</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;