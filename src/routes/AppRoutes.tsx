import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
// Layouts
import MainLayout from "../Layout/MainLayout/MainLayout";
import AdminLayout from "../Layout/AdminLayout/AdminLayout";

// Pages
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import Product from "../pages/Product/ProductDetail";
import Auth from "../pages/Auth/Auth";
import Error from "../pages/Error/Error";

// Admin Pages
import Dashboard from "../pages/Admin/Dashboard";
import Products from "../pages/Admin/Products";
import AddProduct from "../pages/Admin/AddProduct";
import EditProduct from "../pages/Admin/EditProducts";
// import Users from "../pages/Admin/Users";

const AppRoutes = () => {
  return (
    <Routes>
      {/* MainLayout Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/auth" element={<Auth />} />
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
        </Route>
        </Route>
    </Routes>
  );
};

export default AppRoutes;
