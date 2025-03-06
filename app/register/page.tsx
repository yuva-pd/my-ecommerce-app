"use client";

import { Router } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Signup successful!");
      window.location.href = "/login"; // Redirect to login
    } else {
      alert(data.error || "Something went wrong");
    }
  };
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Signup successful!");
      localStorage.setItem("token", data.token); // ✅ Save token after signup
      router.push("/products"); // ✅ Redirect to products page instead of login
    } else {
      alert(data.error || "Signup failed");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <form onSubmit={handleSignup} className="mt-4 space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-400">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-white"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-400">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-white"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-400">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 font-bold text-black bg-white rounded hover:bg-gray-300 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-white hover:underline">
            Login
          </a>
        </p>
      </div>
    </main>
  );
}
