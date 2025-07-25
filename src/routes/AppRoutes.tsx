import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
// Layouts
import MainLayout from "../Layout/MainLayout/MainLayout";
import AdminLayout from "../Layout/AdminLayout/AdminLayout";

// Pages
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import About from"../pages/About/About";
import Contact from '../pages/Contact/Contact';
import Product from "../pages/Product/ProductDetail";
import Auth from "../pages/Auth/Auth";
import Error from "../pages/Error/Error";
import Helpcenter from '../pages/Helpcenter/Helpcenter';
import Return from '../pages/Return/Return';
import Privacy from '../pages/Privacy/Privacy';
import Termscondition from '../pages/Termscondition/Termscondition';
// Admin Pages
import Dashboard from "../pages/Admin/Dashboard";
import Products from "../pages/Admin/Products";
import AddProduct from "../pages/Admin/AddProduct";
import WishlistPage from "../pages/Wishlist/Wishlist";
import CartPage from "../pages/Cart/CartPage";
// import EditProduct from "../pages/Admin/EditProduct";
// import Users from "../pages/Admin/Users";

const AppRoutes = () => {
  return (
    <Routes>
      {/* MainLayout Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Error />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/helpcenter" element={<Helpcenter />} />
        <Route path="/return" element={<Return />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/termscondition" element={<Termscondition />} />

      </Route>

      {/* Admin Routes */}
     <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/add" element={<AddProduct />} />
          {/* <Route path="products/edit/:id" element={<EditProduct />} /> */}
        </Route>
        </Route>
    </Routes>
  );
};

export default AppRoutes;
