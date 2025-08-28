import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default role
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simpan user baru ke localStorage
    const newUser = { username, password, role };
    localStorage.setItem("user", JSON.stringify(newUser));

    alert("Akun berhasil dibuat! Silakan login.");
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-color: white">
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg w-80 border border-pink-100"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-pink-600 font-serif">
          Sign Up
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          required
        />

        {/* Pilih role */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full mb-6 px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded-lg font-medium hover:bg-pink-600 transition"
        >
          Sign Up
        </button>

        <p className="text-center text-gray-600 text-sm mt-4">
          Sudah punya akun?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-pink-600 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
