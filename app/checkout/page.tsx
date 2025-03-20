"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../store/redux/store";

// Razorpay response interface
interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// Razorpay options interface
interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  order_id: string;
  name: string;
  description?: string;
  image?: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name: string;
    email: string;
    contact: string;
  };
  theme?: {
    color: string;
  };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open: () => void };
  }
}

const Checkout = () => {
  const router = useRouter();
  const cart = useSelector((state: RootState) => state.cart.items);
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // State for user form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: { street: "", city: "", state: "", zip: "" },
  });

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    subField?: string
  ) => {
    if (subField) {
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [subField]: e.target.value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    }
  };

  // Handle payment initiation
  const handlePayment = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address.street
    ) {
      // alert("Please fill all required fields.");
      return;
    }

    try {
      // Send order data to backend
      const response = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          totalAmount: total,
          ...formData,
        }),
      });

      if (!response.ok) throw new Error("Failed to create Razorpay order.");

      const order = await response.json();

      // Razorpay options
      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY || "",
        amount: order.amount,
        currency: "INR",
        order_id: order.id,
        name: "Your Store",
        description: "Purchase Items",
        image: "/logo.png",
        handler: (response: RazorpayResponse) => {
          alert("Payment successful!");
          console.log("Payment ID:", response.razorpay_payment_id);
          router.push("/success");
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#3399cc",
        },
      };
      console.log(order, options, "orderorderorderorderorder");
      // Check if Razorpay is available
      if (typeof window !== "undefined" && window.Razorpay) {
        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.open();
      } else {
        console.error("Razorpay SDK not loaded.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Try again.");
    }
  };

  return (
    <main className="p-8 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Cart Items */}
      <div>
        {cart.map((item) => (
          <div key={item._id} className="flex justify-between p-2 border-b">
            <p>{item.name}</p>
            <p>
              ₹{item.price} x {item.quantity}
            </p>
          </div>
        ))}
      </div>

      {/* User Information Form */}
      <input
        type="text"
        placeholder="Full Name"
        value={formData.name}
        onChange={(e) => handleChange(e, "name")}
        // required
        className="block p-2 mb-4 bg-gray-800 text-white w-full"
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => handleChange(e, "email")}
        // required
        className="block p-2 mb-4 bg-gray-800 text-white w-full"
      />
      <input
        type="tel"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => handleChange(e, "phone")}
        // required
        className="block p-2 mb-4 bg-gray-800 text-white w-full"
      />
      <input
        type="text"
        placeholder="Street"
        value={formData.address.street}
        onChange={(e) => handleChange(e, "address", "street")}
        // required
        className="block p-2 mb-4 bg-gray-800 text-white w-full"
      />
      <input
        type="text"
        placeholder="City"
        value={formData.address.city}
        onChange={(e) => handleChange(e, "address", "city")}
        // required
        className="block p-2 mb-4 bg-gray-800 text-white w-full"
      />
      <input
        type="text"
        placeholder="State"
        value={formData.address.state}
        onChange={(e) => handleChange(e, "address", "state")}
        // required
        className="block p-2 mb-4 bg-gray-800 text-white w-full"
      />
      <input
        type="text"
        placeholder="ZIP Code"
        value={formData.address.zip}
        onChange={(e) => handleChange(e, "address", "zip")}
        // required
        className="block p-2 mb-4 bg-gray-800 text-white w-full"
      />

      {/* Pay Now Button */}
      <button
        onClick={handlePayment}
        className="mt-4 bg-green-500 p-2 rounded w-full"
      >
        Pay Now
      </button>
    </main>
  );
};

export default Checkout;
