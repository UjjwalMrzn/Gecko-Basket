// src/Layout/MainLayout/MainLayout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "../../components/shared/Navbar/NavBar";
import Footer from "../../components/shared/Footer/Footer";
import StickyWhatsApp from "../../components/shared/StickyWhatsApp/StickyWhatsApp";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> {/*  This renders nested pages */}
      </main>
      <Footer />
      <StickyWhatsApp />
    </>
  );
};

export default MainLayout;
