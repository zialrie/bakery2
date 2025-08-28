import { Link } from "react-router-dom";
export default function About() {
  return (
      <div className="pt-24 px-6 max-w-4xl mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">📌 Tentang Kami</h1>

          <div className="mb-8">
            <p className="text-lg leading-relaxed">
              Selamat datang di <strong>Zeetri Pastry</strong>  sebuah proyek kreatif yang lahir dari
              perpaduan antara rasa penasaran pada dunia <strong>pengembangan web</strong> dan kecintaan
              pada pastry. Apa yang awalnya hanya sekadar latihan coding, kini tumbuh menjadi sebuah
              toko pastry virtual dengan tampilan modern dan penuh rasa manis.
            </p>

            <p className="mt-4 text-lg leading-relaxed">
              Setiap detail di <strong>Zeetri Pastry</strong> kami bangun dengan semangat belajar sekaligus
              menghadirkan pengalaman berbelanja pastry yang hangat dan menyenangkan. Didukung oleh teknologi
              modern seperti <strong>React, Tailwind CSS</strong>, dan <strong>React Router</strong>, kami berusaha
              menyajikan pengalaman yang lembut layaknya croissant, dan rapi layaknya susunan mille-feuille.
            </p>
          </div>

          <img
            src="src/img/tim.jpg"
            alt="Tim Zeetri Pastry"
            className="mx-auto rounded-xl shadow-lg w-full md:w-3/4 max-w-2xl"
          />

          <p className="mt-8 text-base">
            🎯 <strong>Visi kami</strong> sederhana: belajar, berkembang, dan berbagi. Kami sangat terbuka untuk
            kolaborasi maupun ide segar. Jadi, jika kamu ingin ikut serta dalam perjalanan ini atau sekadar
            berbagi saran, jangan ragu untuk menghubungi kami!
          </p>

          <p className="mt-6">
            <Link
              to="/"
              className="text-pink-500 hover:underline font-medium transition"
            >
              ← Kembali ke Beranda
            </Link>
          </p>
        </div>
      </div>
  );
}
