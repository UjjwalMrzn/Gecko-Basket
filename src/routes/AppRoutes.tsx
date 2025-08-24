// src/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../Layout/MainLayout/MainLayout";
import AdminLayout from "../Layout/AdminLayout/AdminLayout";
import AuthLayout from "../Layout/AuthLayout/AuthLayout";

// Pages
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import ProductDetail from "../pages/Product/ProductDetail";
import Error from "../pages/Error/Error";
import WishlistPage from "../pages/Wishlist/Wishlist";
import CartPage from "../pages/Cart/CartPage";
import SearchPage from "../pages/Search/SearchPage";
import AccountPage from "../pages/Account/AccountPage";
import CheckoutPage from "../pages/Checkout/CheckoutPage";
import OrderConfirmationPage from "../pages/Checkout/OrderConfirmationPage";

// Admin Pages
import Dashboard from "../pages/Admin/Dashboard";
import Products from "../pages/Admin/Products";
import AddProduct from "../pages/Admin/AddProduct";
import EditProduct from "../pages/Admin/EditProducts";
import Users from "../pages/Admin/User";
import Order from "../pages/Admin/Order";
import AdminLoginPage from "../pages/Admin/AdminLoginPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* 1. Public Admin Login Route */}
      <Route element={<AuthLayout />}>
        <Route path="/admin/login" element={<AdminLoginPage />} />
      </Route>
      
      {/* 2. Protected Admin Dashboard Routes */}
      <Route element={<ProtectedRoute adminOnly />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<Order />} />
        </Route>
      </Route>
      
      {/* 3. Main Site Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/search" element={<SearchPage />} />
        
        {/* Regular Protected Routes for logged-in customers */}
        <Route element={<ProtectedRoute />}>
          <Route path="/account" element={<AccountPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;