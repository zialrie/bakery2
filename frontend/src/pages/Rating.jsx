// src/pages/Rating.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Rating() {
  const location = useLocation();
  const formData = location.state || {};

  const [menu, setMenu] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data review:", {
      ...formData,
      menu,
      rating,
    });
    alert("Terima kasih sudah memberikan rating!");
  };

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg">
          <h2 className="text-xl font-bold mb-4">Beri Rating & Pilih Menu</h2>

          {/* data dari Home.jsx */}
          <div className="mb-4 p-3 border rounded bg-gray-50">
            <p><strong>Nama:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Pesan:</strong> {formData.message}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Pilih Menu */}
            <div>
              <label className="block mb-1 font-medium">Pilih Menu</label>
              <select
                value={menu}
                onChange={(e) => setMenu(e.target.value)}
                className="w-full border rounded p-2"
                required
              >
                <option value="">-- Pilih Menu --</option>
                <option value="Croissant">Croissant</option>
                <option value="Éclair">Éclair</option>
                <option value="Mille-feuille">Mille-feuille</option>
                <option value="Macaron">Macaron</option>
              </select>
            </div>

            {/* Rating */}
            <div>
              <label className="block mb-1 font-medium">Beri Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-2xl ${
                      star <= rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
            >
              Kirim Rating
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
