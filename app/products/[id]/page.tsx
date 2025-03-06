"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${id}`);
      if (!res.ok) throw new Error("Product not found");
      const data = await res.json();
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  const handleBuyNow = () => {
    alert(`Buying ${quantity} of ${product?.name}`);
    // You can implement the checkout or payment logic here
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

            {/* Quantity Selector */}
            <div className="mt-4 flex items-center space-x-4">
              <label htmlFor="quantity" className="text-lg">
                Quantity:
              </label>
              <input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value)))
                }
                className="w-16 p-2 bg-gray-700 border border-gray-600 rounded text-white text-center"
                min="1"
              />
            </div>

            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              className="mt-4 w-full bg-white text-black font-bold py-2 rounded hover:bg-gray-300 transition"
            >
              Buy Now
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-400">
            Loading product details...
          </p>
        )}
      </div>
    </main>
  );
}
