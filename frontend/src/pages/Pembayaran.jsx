import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Pembayaran = () => {
  const { cart, clearCart, totalPrice, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Keranjang kosong!");
      return;
    }

    const newTransaction = {
      orderId: "ORD-" + Date.now().toString().slice(-6),
      transactionTime: new Date().toLocaleString("id-ID"),
      items: cart.map((item) => ({
        itemName: item.title,
        quantity: item.quantity,
        price: item.price,
      })),
      totalPrice,
    };

    const stored = JSON.parse(localStorage.getItem("transactionData")) || [];
    localStorage.setItem("transactionData", JSON.stringify([newTransaction, ...stored]));

    window.dispatchEvent(new CustomEvent("data-updated", { detail: { type: "transaction" } }));

    clearCart();

    alert(`✅ Pembayaran berhasil!\nTotal: Rp ${totalPrice.toLocaleString("id-ID")}`);
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Pembayaran</h1>

        {cart.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xl text-gray-600 mb-6">Keranjangnya masih kosong nih</p>
            <button
              onClick={() => navigate("/menu")}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-lg hover:from-pink-600 hover:to-yellow-600 transition font-medium shadow"
            >
              🍞 Kembali ke Menu
            </button>
          </div>
        ) : (
          <>
            <ul className="space-y-3 mb-6">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center p-3 bg-pink-50 rounded-lg border border-pink-100"
                >
                  <span className="font-medium text-gray-800">
                    {item.title} × {item.quantity}
                  </span>
                  <div className="flex items-center space-x-4">
                    <span className="font-bold text-green-600">
                      Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-800 font-semibold"
                      title="Hapus item"
                    >
                      Delete item?
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t pt-4 mb-6">
              <p className="text-xl font-bold text-right text-gray-800">
                Total:{" "}
                <span className="text-green-600">
                  Rp {totalPrice.toLocaleString("id-ID")}
                </span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate(-1)}
                className="py-3 px-6 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition font-medium"
              >
                ◀️ Kembali
              </button>

              <button
                onClick={handleCheckout}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition font-medium shadow"
              >
                💳 Bayar Sekarang
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Pembayaran;
