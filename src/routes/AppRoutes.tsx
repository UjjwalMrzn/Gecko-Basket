import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../Layout/MainLayout/MainLayout";
import AdminLayout from "../Layout/AdminLayout/AdminLayout";

// Pages
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import ProductDetail from "../pages/Product/ProductDetail";
import Error from "../pages/Error/Error";
import WishlistPage from "../pages/Wishlist/Wishlist";
import CartPage from "../pages/Cart/CartPage";
import SearchPage from "../pages/Search/SearchPage";
import AccountPage from "../pages/Account/AccountPage";
import MyOrdersPage from "../pages/Account/MyOrderPage";
import CheckoutPage from "../pages/Checkout/CheckoutPage"; 

// Admin Pages
import Dashboard from "../pages/Admin/Dashboard";
import Products from "../pages/Admin/Products";
import AddProduct from "../pages/Admin/AddProduct";
import EditProduct from "../pages/Admin/EditProducts";
import Users from "../pages/Admin/User";

const AppRoutes = () => {
  return (
    <Routes>
      {/* MainLayout Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/search" element={<SearchPage />} />
        
        {/* Protected Customer Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/my-orders" element={<MyOrdersPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;