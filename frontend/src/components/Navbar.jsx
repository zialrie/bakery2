import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 w-full flex justify-between items-center p-4 md:p-6 z-50 shadow-md bg-white text-gray-800"
    >
      {/* Logo */}
      <div className="text-2xl font-bold text-pink-500">Zeetri Pastry</div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-8 text-sm md:text-base items-center">
        <li>
          <Link to="/" className="hover:text-pink-500 transition-colors font-medium">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-pink-500 transition-colors font-medium">
            About
          </Link>
        </li>
        <li>
          <Link to="/menu" className="hover:text-pink-500 transition-colors font-medium">
            Menu
          </Link>
        </li>
        <li>
          <a href="/#contact" className="hover:text-pink-500 transition-colors font-medium">
            Contact
          </a>
        </li>
        {/* Login & Signup */}
        <li>
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white transition-all"
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            to="/signup"
            className="px-4 py-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition-all"
          >
            Sign Up
          </Link>
        </li>
      </ul>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-pink-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="absolute top-16 right-6 mt-1 p-4 w-48 rounded-lg shadow-xl bg-white text-gray-800">
          <ul className="flex flex-col gap-3">
            <li>
              <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-pink-500 transition-colors font-medium">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setIsOpen(false)} className="hover:text-pink-500 transition-colors font-medium">
                About
              </Link>
            </li>
            <li>
              <Link to="/menu" onClick={() => setIsOpen(false)} className="hover:text-pink-500 transition-colors font-medium">
                Menu
              </Link>
            </li>
            <li>
            <a href="/#contact" className="hover:text-pink-500 transition-colors font-medium">
              Contact
            </a>
            </li>
            <li>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="hover:text-pink-500 transition-colors font-medium"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="hover:text-pink-500 transition-colors font-medium"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
