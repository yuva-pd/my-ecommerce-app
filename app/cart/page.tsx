"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  quantity: number; // Added quantity field
}

export default function Cart() {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(cartItems);
  }, []);

  // 🔼 Increase Quantity
  const increaseQuantity = (id: string) => {
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCart);
  };

  // 🔽 Decrease Quantity (Remove if quantity reaches 0)
  const decreaseQuantity = (id: string) => {
    const updatedCart = cart
      .map((item) =>
        item._id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    updateCart(updatedCart);
  };

  // ❌ Remove Item from Cart
  const removeItem = (id: string) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    updateCart(updatedCart);
  };

  // 📦 Update Cart in localStorage
  const updateCart = (updatedCart: Product[]) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storage")); // Notify navbar
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cart.map((product) => (
              <div key={product._id} className="bg-gray-800 p-4 rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-bold">{product.name}</h2>
                <p className="text-lg font-bold mt-2">${product.price}</p>

                {/* Quantity Controls */}
                <div className="flex items-center mt-3 space-x-3">
                  <button
                    onClick={() => decreaseQuantity(product._id)}
                    className="px-3 py-1 bg-gray-700 text-white rounded"
                  >
                    -
                  </button>
                  <span className="text-lg font-bold">{product.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(product._id)}
                    className="px-3 py-1 bg-gray-700 text-white rounded"
                  >
                    +
                  </button>
                </div>

                {/* Remove Item Button */}
                <button
                  onClick={() => removeItem(product._id)}
                  className="mt-3 w-full bg-red-500 text-white font-bold py-2 rounded hover:bg-red-700 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">Your cart is empty.</p>
        )}
      </div>
    </main>
  );
}
