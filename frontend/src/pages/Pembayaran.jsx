import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Pembayaran() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handlePayment = () => {
    alert("Pembayaran berhasil! 🎉 Terima kasih sudah belanja.");
    clearCart();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-8 md:px-20 pt-24 py-16 bg-gradient-to-b from-yellow-50 to-pink-50">
      {cart.length === 0 ? (
        // ✅ Tampilan jika keranjang kosong
        <div className="text-center bg-white p-10 rounded-xl shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Opss..</h2>
          <p className="text-gray-600 mb-6">Pesanan kamu kosong nih</p>
          <Link
            to="/menu"
            className="inline-block bg-red-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-600 transition"
          >
            Kembali ke Menu
          </Link>
        </div>
      ) : (
        // ✅ Tampilan jika ada item di keranjang
        <div className="w-full space-y-6">
          <h1 className="text-3xl font-bold text-center mb-10 font-serif">
            Keranjang Belanja
          </h1>

          {cart.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white p-4 rounded-xl shadow"
            >
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">
                  Rp {item.price.toLocaleString()} x {item.qty}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.title)}
                className="text-red-500 hover:underline"
              >
                Hapus
              </button>
            </div>
          ))}

          <div className="text-right font-bold text-xl text-pink-700">
            Total: Rp {total.toLocaleString()}
          </div>

          <button
            onClick={handlePayment}
            className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition"
          >
            Lanjutkan Pembayaran
          </button>

          <p className="mt-6 text-center">
            <Link
              to="/menu"
              className="text-pink-500 hover:underline font-medium transition"
            >
              ← Kembali ke Menu
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
