// src/Layout/AuthLayout/AuthLayout.tsx
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <section>
      <Outlet /> {/* ✅ Renders Login/Register */}
    </section>
  );
};

export default AuthLayout;
