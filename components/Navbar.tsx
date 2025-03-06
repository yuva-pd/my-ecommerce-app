"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const totalQuantity = cart.reduce(
        (acc: number, item: any) => acc + item.quantity,
        0
      );
      setCartCount(totalQuantity);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount); // Listen for cart updates

    return () => {
      window.removeEventListener("storage", updateCartCount); // Cleanup listener
    };
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
  return (
    <nav className="flex justify-between p-4 bg-black text-white">
      {/* <h1 className="text-xl font-bold">Store</h1> */}
      <nav className="bg-gray-900 p-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold">My E-Commerce Store</h1>
      </nav>
      <div className="space-x-4 flex items-center">
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/cart" className="relative">
          Cart{" "}
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded text-white font-bold hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
