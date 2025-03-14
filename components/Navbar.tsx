"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store/redux/store";
import { logout } from "../app/store/redux/slices/authSlice";
import { signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const cart = useSelector((state: RootState) => state.cart);
  const cartCount = cart.items?.length || 0;

  const handleLogout = () => {
    dispatch(logout());
    signOut();
    router.push("/login");
  };

  // 🔹 Profile Modal State
  const [showProfile, setShowProfile] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // 🔹 Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowProfile(false);
      }
    };

    if (showProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfile]);

  return (
    <nav className="flex justify-between p-4 bg-black text-white relative">
      <h1 className="text-2xl font-bold">My E-Commerce Store</h1>
      <div className="space-x-4 flex items-center">
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/cart" className="relative">
          Cart{" "}
          {cartCount > 0 && (
            <span className="bg-red-500 text-white px-2 py-1 rounded">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Profile Dropdown */}
        {auth.accessToken ? (
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="bg-gray-800 px-4 py-2 rounded text-white font-bold"
            >
              {auth.user?.name || "Profile"}
            </button>

            {showProfile && (
              <div
                ref={modalRef}
                className="absolute right-0 mt-2 w-60 bg-gray-900 shadow-lg rounded-lg p-4 z-50"
              >
                <p className="text-white">
                  Logged in as <br />
                  <span className="font-bold">
                    {auth.user?.email || "User"}
                  </span>
                </p>
                <button
                  onClick={handleLogout}
                  className="mt-3 w-full bg-red-500 text-white font-bold py-2 rounded hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
