"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/redux/slices/productSlice";
import { AppDispatch, RootState } from "../store/redux/store";
import { addToCart } from "../store/redux/slices/cartSlice";
// import Image from "next/image";
import React from "react";
import BNavbar from "@/components/Bottomnav";
import LoadingSkeleton from "@/components/LoadingSkeleton";

// Define the Product interface here for better reusability
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  quantity?: number; // Optional quantity for cart
}

export default function Products() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  // Fetch products on component mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Handle add to cart functionality
  const handleAddToCart = (product: Product) => {
    const productWithQuantity = { ...product, quantity: 1 }; // Add default quantity
    dispatch(addToCart(productWithQuantity)); // Dispatch the product to cart
    alert("Item added to cart");
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <section className="p-6">
        {/* <h1 className="text-3xl font-bold text-center mb-6">Our Products</h1> */}
        <div className="min-h-screen grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="flex  justify-center">
              {/* <p className="flex items-center justify-center">
                {"       "}
                <LoadingSkeleton />
              </p> */}
              <LoadingSkeleton />
            </div>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            products.map((product) => (
              <div
                key={product._id}
                className="bg-gray-800 p-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-100 object-cover rounded-lg mb-4 cursor-pointer"
                  onClick={() => router.push(`/products/${product._id}`)} // Navigate to product detail page
                />
                <h2 className="text-xl font-bold">{product.name}</h2>
                <p className="text-gray-400">{product.description}</p>
                <p className="text-lg font-bold mt-2">₹ {product.price}</p>
                <button
                  onClick={() => handleAddToCart(product)} // Add to cart functionality
                  className="mt-3 w-full bg-white text-black font-bold py-2 rounded hover:bg-gray-300 transition"
                >
                  Add to Cart
                </button>
              </div>
            ))
          )}
        </div>
      </section>
      <BNavbar />
    </main>
  );
}
