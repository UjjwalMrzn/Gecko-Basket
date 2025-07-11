import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./context/AuthContext";
import { AuthModalProvider } from "./context/AuthModalContext";

import MainLayout from "./Layout/MainLayout/MainLayout";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Error from "./pages/Error/Error";
import Shop from "./pages/Shop/Shop";
import Product from "./pages/Product/ProductDetail";
import LoginModal from "./components/shared/AuthModal/LoginModal";
import RegisterModal from "./components/shared/AuthModal/RegisterModal";

const App = () => {
  return (
    <BrowserRouter>
      <AuthModalProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              {/* Global Modals */}
              <LoginModal />
              <RegisterModal />

              {/* Route Definitions */}
              <Routes>
                {/* Pages using MainLayout */}
                <Route element={<MainLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/product/:id" element={<Product />} />
                  <Route path="*" element={<Error />} />
                </Route>

                {/* Add more layout-separated routes if needed */}
              </Routes>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </AuthModalProvider>
    </BrowserRouter>
  );
};

export default App;
