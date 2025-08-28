// src/pages/Home.jsx
import React, { useState } from "react";
import "../index.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [messages, setMessages] = useState([]); // state untuk menyimpan semua pesan

  // handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    // simpan pesan baru ke state messages
    setMessages((prev) => [...prev, formData]);

    setIsSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        id="home"
        className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-20 bg-gradient-to-r from-pink-200 via-pink-100 to-yellow-50 md:min-h-screen"
        style={{ paddingTop: "100px" }}
      >
        <div className="max-w-lg">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight font-serif">
            Zeetri <span className="text-pink-500">Pastry</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 italic">Kenikmatan dalam setiap gigitan.</p>
        </div>
        <img
          src="src/img/zbV2-removebg-preview.png"
          alt="Pastry"
          className="rounded-2xl shadow-lg mt-8 md:mt-0 w-48 md:w-64"
        />
      </section>

      {/* About Section */}
      <section id="about" className="px-8 md:px-20 py-16 bg-white">
        <h2 className="text-3xl font-bold text-center mb-6 font-serif">About Us</h2>
        <p className="text-center max-w-2xl mx-auto text-gray-600">
          Zeetri Pastry hadir untuk menghadirkan kebahagiaan lewat pastry yang dibuat dengan penuh cinta dan kualitas terbaik. 
          Setiap gigitan adalah perpaduan sempurna antara rasa lembut, renyah, dan manis yang pas. Cocok untuk menemani kopi pagi, 
          bersantai sore hari, atau momen istimewa bersama orang tersayang. Kami percaya, setiap pastry bukan sekadar makanan, 
          tapi pengalaman. Dari aroma oven yang menggoda hingga tampilan yang cantik, Zeetri Pastry selalu siap membuat hari Anda lebih manis. 
          Jangan hanya makan, nikmati setiap detik kebahagiaan bersama kami!
        </p>
      </section>

      {/* Menu Section */}
      <section id="menu" className="px-8 md:px-20 py-16 bg-gradient-to-b from-pink-50 to-yellow-50">
        <h2 className="text-3xl font-bold text-center mb-10">Menu Favorite</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Butter Croissant",
              desc: "Renyah di luar, lembut di dalam, sempurna dengan secangkir kopi.",
              img: "src/img/bakery.jpg",
              price: "$304",
            },
            {
              title: "Chocolate Cake",
              desc: "Kue cokelat lembut dengan topping premium.",
              img: "src/img/coklatkek.jpg",
              price: "$132",
            },
            {
              title: "Cheese Cake",
              desc: "Kue keju lembut dengan topping premium.",
              img: "src/img/ciskek.jpg",
              price: "$223",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl shadow hover:shadow-lg transition bg-gradient-to-br from-pink-100 via-pink-50 to-yellow-50"
            >
              <img
                src={item.img}
                alt={item.title}
                className="rounded-xl mb-4 w-full h-40 object-cover"
              />
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-gray-600">{item.desc}</p>
              <p className="mt-2 font-bold text-pink-600">{item.price}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <Link to="/menu">
            <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-xl shadow hover:from-pink-600 hover:to-orange-500 transition">
              Menu Lainnya
            </button>
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-8 md:px-20 py-16 bg-white">
        <h2 className="text-3xl font-bold text-center mb-6">Contact Us</h2>
        <p className="text-center mb-8 text-gray-600">
          Ingin pesan atau kerjasama? Hubungi kami di bawah ini!
        </p>

        {/* WhatsApp Button */}
        <div className="flex justify-center mb-10">
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.874.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a8.06 8.06 0 01-4.032-1.109l-.365-.212-3.742.974 1.04-3.612-.24-0.375a8.06 8.06 0 01-1.148-4.167c0-4.444 3.612-8.06 8.06-8.06s8.06 3.616 8.06 8.06c0 2.2-1.278 4.4-3.27 5.762l-.36.228 1.062 3.68-3.72.975-.338-.205c-2.022 1.38-4.306 2.119-6.67 2.119" />
            </svg>
            Chat via WhatsApp
          </a>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold text-center mb-6">
            Atau isi formulir di bawah
          </h3>
          {isSubmitted ? (
            <p className="text-center text-green-500 font-medium">
              Pesan Anda berhasil dikirim! Terima kasih.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-pink-500 outline-none transition bg-white border-gray-300 text-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-pink-500 outline-none transition bg-white border-gray-300 text-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Pesan</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  required
                  className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-pink-500 outline-none transition bg-white border-gray-300 text-gray-800"
                  placeholder="Tuliskan pesan Anda..."
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-xl shadow hover:from-pink-600 hover:to-orange-500 transition"
                >
                  Kirim Pesan
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Rating / Testimonial Section */}
      <section id="rating" className="px-8 md:px-20 py-16 bg-yellow-50">
        <h2 className="text-3xl font-bold text-center mb-6">Pesan dari Pengunjung</h2>
        {messages.length === 0 ? (
          <p className="text-center text-gray-600">Belum ada pesan.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {messages.map((msg, index) => (
              <div key={index} className="p-4 rounded-xl shadow bg-white">
                <h3 className="font-semibold text-pink-500">{msg.name}</h3>
                <p className="text-gray-600">{msg.message}</p>
                <p className="text-sm text-gray-400">{msg.email}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
