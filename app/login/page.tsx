"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useSession, signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import { login } from "../store/redux/slices/authSlice";

export default function Login() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      dispatch(login({ accessToken: data.token, user: data.user }));
      console.log(data, "datadatadata");
      localStorage.setItem("user", email);
      localStorage.setItem("token", data.token); // ✅ Store token in localStorage
      router.push("/products");
    } else {
      alert(data.error || "Login failed");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <main className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleLogin} className="mt-4 space-y-4">
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
          <button
            type="submit"
            className="w-full py-2 font-bold text-black bg-white rounded hover:bg-gray-300 transition"
          >
            Login
          </button>
        </form>

        {/* Google Sign-In Button  { callbackUrl: "/products" }*/}
        <button
          onClick={() => signIn("google", { callbackUrl: "/products" })}
          className="mt-4 w-full flex justify-center items-center gap-2 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
        >
          <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

        <p className="mt-4 text-center text-gray-400">
          Don't have an account?{" "}
          <a href="/register" className="text-white hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </main>
  );
}
