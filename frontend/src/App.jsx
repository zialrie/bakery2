import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardUsers from "./pages/DashboardUsers";
import Pembayaran from "./pages/Pembayaran";
import ProtectedRoute from "./pages/Protectedroute";
import { CartProvider } from "./context/CartContext";
import Rating from "./pages/Rating";


// Layout untuk handle Navbar & Footer
function Layout() {
  const location = useLocation();

  // Halaman yang tidak menampilkan Navbar/Footer
  const hideNavbarOn = ["/login", "/signup", "/pembayaran", "/dashboard-admin", "/dashboard-users"];
  const hideFooterOn = ["/login", "/dashboard-admin", "/dashboard-users", "/signup", "/pembayaran", "/menu"];

  return (
    <>
      {!hideNavbarOn.includes(location.pathname) && <Navbar />}
      <div className="pt-20 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pembayaran" element={<Pembayaran />} />
          <Route path="/rating" element={<Rating />} />

          {/* Lindungi route admin */}
          <Route
            path="/dashboard-admin"
            element={
              <ProtectedRoute role="admin">
                <DashboardAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard-users"
            element={
              <ProtectedRoute role="admin">
                <DashboardUsers />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      {!hideFooterOn.includes(location.pathname) && <Footer />}
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <Layout />
      </Router>
    </CartProvider>
  );
}

export default App;
