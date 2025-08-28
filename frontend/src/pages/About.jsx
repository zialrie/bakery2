import { Link } from "react-router-dom";
export default function About() {
  return (
      <div className="pt-24 px-6 max-w-4xl mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">📌 Tentang Kami</h1>

          <div className="mb-8">
            <p className="text-lg leading-relaxed">
              Kami adalah tim kreatif dan penuh semangat yang sedang menjelajahi dunia
              pengembangan web menggunakan <strong>React</strong>. Berawal dari rasa penasaran
              dan semangat belajar, kami membangun Zeetri Pastry sebagai proyek latihan yang
              akhirnya menjadi lebih dari sekadar eksperimen—sebuah representasi dari kerja tim,
              desain, dan kode yang penuh rasa.
            </p>

            <p className="mt-4 text-lg leading-relaxed">
              Kami percaya bahwa belajar paling efektif adalah dengan praktik langsung. Maka,
              kami menggabungkan konsep toko pastry virtual ini dengan teknologi modern, termasuk
              <strong> React, Tailwind CSS,</strong> dan <strong>React Router</strong> untuk routing yang mulus.
            </p>
          </div>

          <img
            src="src/img/tim.jpg"
            alt="Tim Zeetri Pastry"
            className="mx-auto rounded-xl shadow-lg w-full md:w-3/4 max-w-2xl"
          />

          <p className="mt-8 text-base">
            🎯 Kami masih terus berkembang, dan kami sangat terbuka untuk kolaborasi dan saran.
            Jika kamu tertarik untuk tahu lebih banyak atau ikut andil dalam perjalanan ini,
            jangan ragu untuk menghubungi kami!
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
