import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (username === "admin" && password === "12345") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify({
        username: "zidan",
        password: "123",
        role: "admin"
      }));
      navigate("/dashboardadmin");
      return;
    }

    if (
      savedUser &&
      username === savedUser.username &&
      password === savedUser.password
    ) {
      localStorage.setItem("isLoggedIn", "true");

      // cek role
      if (savedUser.role === "admin") {
        navigate("/dashboardadmin");
      } else {
        navigate("/"); // user biasa ke home
      }
    } else {
      alert("Username atau password salah!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-color: white">
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg w-80 border border-pink-100"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-pink-600 font-serif">
          Login
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
          className="w-full mb-6 px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          required
        />

        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded-lg font-medium hover:bg-pink-600 transition"
        >
          Login
        </button>

        <p className="text-center text-gray-600 text-sm mt-4">
          Belum punya akun?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-pink-600 hover:underline cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}
