// src/App.tsx
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthModalProvider } from "./context/AuthModalContext";
import { ToastProvider } from "./context/ToastContext";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import LoginModal from "./components/shared/AuthModal/LoginModal";
import RegisterModal from "./components/shared/AuthModal/RegisterModal";
import Toast from "./components/ui/Toast";
import ScrollToTop from "./components/shared/ScrollToTop/ScrollToTop";
import AuthCheck from "./AuthCheck/AuthCheck";

const App = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthModalProvider>
          {/* ✅ DEFINITIVE FIX: AuthProvider MUST wrap the contexts that depend on it. */}
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <ScrollToTop />
                <LoginModal />
                <RegisterModal />
                <Toast />
                <AppRoutes />
                <AuthCheck />
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </AuthModalProvider>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default App;