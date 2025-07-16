import { BrowserRouter } from "react-router-dom";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./context/AuthContext";
import { AuthModalProvider } from "./context/AuthModalContext";

import LoginModal from "./components/shared/AuthModal/LoginModal";
import RegisterModal from "./components/shared/AuthModal/RegisterModal";
import ScrollToTop from "./components/shared/ScrollToTop/ScrollToTop";
import AppRoutes from "./routes/AppRoutes";
import { ToastProvider } from "./context/ToastContext";

const App = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthModalProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <ScrollToTop />
                <LoginModal />
                <RegisterModal />
                <AppRoutes />
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </AuthModalProvider>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default App;