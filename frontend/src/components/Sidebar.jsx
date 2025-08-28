import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Users, FileText, LogOut, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <Home size={18} />, path: "/dashboard-admin" },
    { name: "Users", icon: <Users size={18} />, path: "/dashboard-users" },
    { name: "Reports", icon: <FileText size={18} />, path: "/reports" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      {/* Tombol Hamburger (mobile) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-lg"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white flex-col shadow-lg z-40">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          Admin Panel
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition ${
                location.pathname === item.path
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-gray-800 hover:text-red-300 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar + Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)} // klik overlay tutup sidebar
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="lg:hidden fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white flex flex-col shadow-lg z-40"
            >
              <div className="p-4 text-2xl font-bold border-b border-gray-700">
                Admin Panel
              </div>

              <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      navigate(item.path);
                      setIsOpen(false); // auto close
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition ${
                      location.pathname === item.path
                        ? "bg-gray-700 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </button>
                ))}
              </nav>

              <div className="p-4 border-t border-gray-700">
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-gray-800 hover:text-red-300 transition"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
