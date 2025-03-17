"use client";
import Navbar from "@/components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/redux/store"; // Import store types
import {
  increaseQuantity,
  decreaseQuantity,
  removeItem,
} from "../store/redux/slices/cartSlice"; // Import actions
import Image from "next/image";

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items); // Get cart items from Redux

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cart.map((product) => (
              <div key={product._id} className="bg-gray-800 p-4 rounded-lg">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-bold">{product.name}</h2>
                <p className="text-lg font-bold mt-2">${product.price}</p>

                {/* Quantity Controls */}
                <div className="flex items-center mt-3 space-x-3">
                  <button
                    onClick={() => dispatch(decreaseQuantity(product._id))}
                    className="px-3 py-1 bg-gray-700 text-white rounded"
                  >
                    -
                  </button>
                  <span className="text-lg font-bold">{product.quantity}</span>
                  <button
                    onClick={() => dispatch(increaseQuantity(product._id))}
                    className="px-3 py-1 bg-gray-700 text-white rounded"
                  >
                    +
                  </button>
                </div>

                {/* Remove Item Button */}
                <button
                  onClick={() => dispatch(removeItem(product._id))}
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
