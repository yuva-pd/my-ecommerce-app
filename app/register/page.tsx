"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/redux/slices/authSlice";
import { NextResponse } from "next/server";
import React from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const router = useRouter();
  const dispatch = useDispatch();
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (password !== confirmPassword) {
  //     alert("Passwords do not match!");
  //     return;
  //   }

  //   const res = await fetch("/api/auth/register", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ email, password }),
  //   });

  //   const data = await res.json();
  //   if (res.ok) {
  //     alert("Signup successful!");
  //     window.location.href = "/login"; // Redirect to login
  //   } else {
  //     alert(data.error || "Something went wrong");
  //   }
  // };
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
      dispatch(login({ accessToken: data.token, user: data.user }));
      localStorage.setItem("token", data.token); // ✅ Save token after signup
      router.push("/products"); // ✅ Redirect to products page instead of login
    } else {
      alert(data.error || "Signup failed");
    }
  };
  // const verifyOtp = async () => {
  //   const res = await fetch("/api/auth/verify-otp", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ email, otp }),
  //   });

  //   const data = await res.json();
  //   console.log("data.tokendata.tokendata.token", data);

  //   if (res.ok) {
  //     localStorage.setItem("token", data.token);
  //     dispatch(
  //       login({
  //         accessToken: data.token,
  //         user: undefined,
  //       })
  //     );
  //     // setStep(0);
  //     alert("OTP Verified! Account Created.");
  //   } else {
  //     alert("Invalid OTP");
  //   }
  // };

  const [phoneNumber, setPhoneNumber] = useState("");
  const verifyOtp = async () => {
    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: `+91${phoneNumber}`, otp }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("OTP Verified! ✅");
      } else {
        alert(data.error || "Invalid OTP ❌");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
  };
  const sendOtp = async () => {
    console.log("Sending OTP to:", phoneNumber); // Debugging log
    let formattedPhoneNumber = phoneNumber.trim();

    // ✅ Ensure +91 is added only if it's missing
    if (!formattedPhoneNumber.startsWith("+91")) {
      formattedPhoneNumber = `+91${formattedPhoneNumber}`;
    }
    const res = await fetch("/api/auth/otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber: formattedPhoneNumber }), // ✅ Send phoneNumber, not email
    });

    // const data = await res.json();
    if (res.ok) {
      // localStorage.setItem("otp", data.otp.toString());
      // alert(`OTP Sent: ${data.otp}`); // For testing only
      setStep(0);
    } else {
      alert("Failed to send OTP");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md p-6 bg-gray-900 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        {true ? (
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
        ) : step === 1 ? (
          <>
            <input
              type="text"
              placeholder="Enter Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-2 mt-1 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-white"
            />
            <button
              onClick={sendOtp}
              className="mt-2 bg-blue-500 text-white py-2 rounded"
            >
              Send OTP
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={verifyOtp}>Verify OTP</button>
          </>
        )}

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
