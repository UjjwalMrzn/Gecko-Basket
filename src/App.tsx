import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/NavBar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Error from "./pages/Error/Error";
import AuthCheck from "./AuthCheck/AuthCheck";

const App = () => {
  return (
    <>
      <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <AuthCheck>
                <Home />
              </AuthCheck>
            }
          />
          <Route path="auth" element={<Auth />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<Error />} />
        </Routes>
      <Footer />
    </>
  );
};

export default App;
