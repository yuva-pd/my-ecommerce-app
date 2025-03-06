"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      alert("Invalid email or password");
    } else {
      router.push("/dashboard"); // Redirect on successful login
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold">Login</h1>

      {/* Email/Password Form */}
      <form onSubmit={handleSubmit} className="mt-4 w-80 space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-white text-black py-2 rounded font-bold"
        >
          Login
        </button>
      </form>

      {/* Google Sign-in */}
      <button
        onClick={() => signIn("google")}
        className="mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Continue with Google
      </button>
    </div>
  );
}
