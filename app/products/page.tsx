"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export default function Products() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/login");
    } else {
      setToken(storedToken);
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addToCart = (product: Product) => {
    alert("Item  added");
    let cart: any[] = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingItem = cart.find((item) => item._id === product._id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage")); // Notify other components
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Our Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="bg-gray-800 p-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
              >
                {/* Click to View Details */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-lg mb-4 cursor-pointer"
                  onClick={() => router.push(`/products/${product._id}`)}
                />
                <h2 className="text-xl font-bold">{product.name}</h2>
                <p className="text-gray-400">{product.description}</p>
                <p className="text-lg font-bold mt-2">${product.price}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-3 w-full bg-white text-black font-bold py-2 rounded hover:bg-gray-300 transition"
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">Loading products...</p>
          )}
        </div>
      </section>
    </main>
  );
}
