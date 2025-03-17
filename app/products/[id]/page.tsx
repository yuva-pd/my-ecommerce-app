"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/app/store/redux/slices/productSlice";
import { addToCart } from "@/app/store/redux/slices/cartSlice";
import Navbar from "@/components/Navbar";
import { RootState, AppDispatch } from "@/app/store/redux/store";
// import Image from "next/image";
import React from "react";
import BNavbar from "@/components/Bottomnav";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => state.products);
  const product = products.find((p) => p._id === id);

  useEffect(() => {
    if (!product) {
      dispatch(fetchProducts());
    }
  }, [dispatch, product]);

  const handleAddToCart = () => {
    if (product) {
      // Ensure the product has a quantity field before dispatching
      const productWithQuantity = { ...product, quantity: 1 };
      dispatch(addToCart(productWithQuantity));
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="p-6">
        {product ? (
          <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-80 object-cover rounded-lg mb-4"
            />
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-lg text-gray-400">{product.description}</p>
            <p className="text-xl font-bold mt-2">${product.price}</p>
            <button
              onClick={handleAddToCart}
              className="mt-4 w-full bg-white text-black font-bold py-2 rounded hover:bg-gray-300 transition"
            >
              Add to Cart
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-400">
            Loading product details...
          </p>
        )}
      </div>
      <BNavbar />
    </main>
  );
}
