// Footer.jsx
import { MessageCircle, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Brand + Deskripsi */}
      <div className="container mx-auto px-6 py-6 text-center">
        <h2 className="text-xl font-bold text-white">Zeetri Pastry</h2>
        <p className="mt-2 text-xs max-w-md mx-auto leading-relaxed">
          Zeetri Pastry menghadirkan cita rasa pastry Prancis ke meja Anda. 
          Freshly baked setiap hari, dibuat dengan bahan premium dan sentuhan cinta.
        </p>

        {/* Sosial Media */}
        <div className="flex justify-center gap-3 mt-4">
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-500 hover:bg-green-500 hover:text-white transition"
          >
            <MessageCircle size={16} />
          </a>
          <a
            href="#"
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-500 hover:bg-pink-500 hover:text-white transition"
          >
            <Instagram size={16} />
          </a>
          <a
            href="#"
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-500 hover:bg-sky-400 hover:text-white transition"
          >
            <Twitter size={16} />
          </a>
        </div>
      </div>

      {/* Copyright + Menu */}
      <div className="border-t border-gray-700 py-3 px-6 flex flex-col md:flex-row justify-between items-center text-xs">
        <p className="text-gray-400">
          © 2025 <span className="text-white font-medium">Zeetri Pastry</span> | All Rights Reserved.
        </p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="/" className="hover:text-white transition">Home</a>
          <a href="/menu" className="hover:text-white transition">Menu</a>
          <a href="/about" className="hover:text-white transition">About</a>
        </div>
      </div>
    </footer>
  );
}
