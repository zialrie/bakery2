import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Menu() {
  const { addToCart } = useCart();

  const menuItems = [
    {
      title: "Butter Croissant",
      desc: "Renyah di luar, lembut di dalam, sempurna dengan secangkir kopi.",
      img: "src/img/bakery.jpg",
      price: 20000,
    },
    {
      title: "Chocolate Cake",
      desc: "Kue cokelat lembut dengan topping premium.",
      img: "src/img/coklatkek.jpg",
      price: 25000,
    },
    {
      title: "Cheese Cake",
      desc: "Kue keju lembut dengan rasa yang creamy dan manis seimbang.",
      img: "src/img/ciskek.jpg",
      price: 30000,
    },
    {
      title: "Strawberry Tart",
      desc: "Tart renyah dengan isian krim vanilla dan topping stroberi segar.",
      img: "src/img/tart.jpg",
      price: 22000,
    },
    {
      title: "Danish Strawberry",
      desc: "Pastry berlapis dengan buah strawberry segar.",
      img: "src/img/strawberry.jpg",
      price: 18000,
    },
    {
      title: "Croissant Matcha",
      desc: "Perpaduan antara rasa croissant yang khas dan matcha yang lumer.",
      img: "src/img/matcha.jpg",
      price: 24000,
    },
  ];

  return (
    <div className="min-h-screen px-8 md:px-20 pt-24 py-16 bg-gradient-to-b from-pink-50 to-yellow-50">
      <h1 className="text-3xl font-bold text-center mb-10 font-serif">
        Menu Pastry Kami
      </h1>

      <div className="grid md:grid-cols-5 gap-8">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-2xl shadow hover:shadow-lg transition bg-gradient-to-br from-pink-100 via-pink-50 to-yellow-50 flex flex-col"
          >
            <img
              src={item.img}
              alt={item.title}
              className="rounded-xl mb-4 w-full h-40 object-cover"
            />
            <h3 className="text-xl font-semibold text-gray-800">
              {item.title}
            </h3>
            <p className="mt-2 text-gray-600 flex-grow">{item.desc}</p>
            <p className="mt-2 text-lg font-bold text-pink-600">
              Rp {item.price.toLocaleString()}
            </p>

            <button
              onClick={() => addToCart(item)}
              className="mt-4 bg-gradient-to-r from-pink-500 to-yellow-500 text-white py-2 px-4 rounded-lg hover:opacity-90 transition"
            >
              Tambah ke Keranjang
            </button>
          </div>
        ))}
      </div>

      {/* Tombol menuju keranjang/pembayaran */}
      <div className="mt-10 text-center">
        <Link
          to="/pembayaran"
          className="inline-block bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition"
        >
          🛒 Lihat Keranjang & Bayar
        </Link>
      </div>
    </div>
  );
}
