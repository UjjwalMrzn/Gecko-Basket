// src/App.tsx
import { Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout/MainLayout";
import AuthLayout from "./Layout/AuthLayout/AuthLayout";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Error from "./pages/Error/Error";
import AuthCheck from "./AuthCheck/AuthCheck";

const App = () => {
  return (
    <Routes>
      {/*  Routes WITH MainLayout */}
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={
            <AuthCheck>
              <Home />
            </AuthCheck>
          }
        />
        <Route path="auth" element={<Auth />} />
        <Route path="*" element={<Error />} />
      </Route>

      {/*  Routes WITHOUT MainLayout */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default App;
