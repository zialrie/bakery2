import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Menu = () => {
  const { addToCart, totalItems } = useCart();

  const menuItems = [
    { id: 1, title: "Butter Croissant", desc: "Renyah di luar, lembut di dalam.", img: "src/img/bakery.jpg", price: 20000 },
    { id: 2, title: "Chocolate Cake", desc: "Kue cokelat lembut dengan topping premium.", img: "src/img/coklatkek.jpg", price: 25000 },
    { id: 3, title: "Cheese Cake", desc: "Kue keju lembut dan creamy yang langsung dari Italy.", img: "src/img/ciskek.jpg", price: 30000 },
    { id: 4, title: "Strawberry Tart", desc: "Tart renyah dengan stroberi segar.", img: "src/img/tart.jpg", price: 22000 },
    { id: 5, title: "Danish Strawberry", desc: "Pastry berlapis dengan buah segar.", img: "src/img/strawberry.jpg", price: 18000 },
    { id: 6, title: "Croissant Matcha", desc: "Croissant dengan rasa matcha lumer.", img: "src/img/matcha.jpg", price: 24000 },
    { id: 7, title: "Spanakopita", desc: "pai yang diisi dengan bayam dan dibalut filo renyah.", img: "src/img/spinokota.jpg", price: 24000 },
    { id: 8, title: "Choux Pastry", desc: "Kue renyah dengan isian krim atau coklat", img: "src/img/Choux.jpg", price: 24000 },
    { id: 9, title: "Chocolate Baklava", desc: "Baklava dengan cokelat dan kacang.", img: "src/img/baklava.jpg", price: 24000 },
    { id: 10, title: "Cromnoloni", desc: "Roti gulung berisi coklat cair yang meleleh di dalamnya.", img: "src/img/kromboloni.jpg", price: 24000 }
  ];

  return (
    <div className="min-h-screen px-6 md:px-10 pt-24 pb-16 bg-gradient-to-b from-pink-50 via-yellow-50 to-orange-50">
      <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">
        🍰 Menu Pastry Kami
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {menuItems.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition">
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-40 object-cover rounded-xl mb-4"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/300x200?text=Menu+Item";
              }}
            />
            <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
            <p className="mt-2 text-gray-600 text-sm">{item.desc}</p>
            <p className="mt-3 text-lg font-bold text-pink-600">
              Rp {item.price.toLocaleString("id-ID")}
            </p>
            <button
              onClick={() => addToCart(item)}
              className="mt-4 w-full bg-gradient-to-r from-pink-500 to-yellow-500 text-white py-2 rounded-lg hover:opacity-90 transition"
            >
              ➕ Tambah
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/pembayaran"
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg shadow"
        >
          🛒 Keranjang ({totalItems}) → Bayar
        </Link>
      </div>
    </div>
  );
};

export default Menu;