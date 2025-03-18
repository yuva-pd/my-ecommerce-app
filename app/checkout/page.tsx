"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../store/redux/store";
declare global {
  interface Window {
    Razorpay: any; // Use the Razorpay type if installed (replace 'any' if types available)
  }
}
const Checkout = () => {
  const router = useRouter();
  const cart = useSelector((state: RootState) => state.cart.items);
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: { street: "", city: "", state: "", zip: "" },
  });

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

  const handlePayment = async () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address.street
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const response = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          totalAmount: total,
          ...formData,
        }),
      });

      const order = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        order_id: order.id,
        handler: () => {
          alert("Payment successful!");
          router.push("/success");
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
      };

      const razor = new (window as any).Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Try again.");
    }
  };

  return (
    <main className="p-8 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

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

      <input
        type="text"
        placeholder="Full Name"
        value={formData.name}
        onChange={(e) => handleChange(e, "name")}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => handleChange(e, "email")}
        required
      />
      <input
        type="tel"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => handleChange(e, "phone")}
        required
      />
      <input
        type="text"
        placeholder="Street"
        value={formData.address.street}
        onChange={(e) => handleChange(e, "address", "street")}
        required
      />
      <input
        type="text"
        placeholder="City"
        value={formData.address.city}
        onChange={(e) => handleChange(e, "address", "city")}
        required
      />

      <button onClick={handlePayment} className="mt-4 bg-green-500 p-2 rounded">
        Pay Now
      </button>
    </main>
  );
};

export default Checkout;
