"use client";
import Link from "next/link"; // ✅ Import Link
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/redux/store";
import { LoaderPinwheel } from "lucide-react";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function Home() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const auth = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    setToken(auth.accessToken);
    // if (auth.accessToken) {
    router.push("/products");
    // }
  }, [auth]);
  // return (
  //   <main>
  //     {token
  //     ? (
  //       <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
  //         <h1 className="text-3xl font-bold">Welcome to Dashoard</h1>
  //         <p className="mt-2 text-gray-400">
  //           Start shopping for the best black-and-white themed products.
  //         </p>
  //         <Link href="/products">
  //           <button className="mt-4 px-6 py-2 bg-white text-black font-bold rounded hover:bg-gray-300 transition">
  //             View Products
  //           </button>
  //         </Link>
  //       </div>
  //     ) : (
  //       <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
  //         <h1 className="text-3xl font-bold">Welcome to My E-Commerce Store</h1>
  //         <p className="mt-2 text-gray-400">
  //           Start shopping for the best black-and-white themed products.
  //         </p>
  //         <Link
  //           href="/login"
  //           className="mt-4 px-6 py-2 bg-white text-black font-bold rounded hover:bg-gray-300 transition"
  //         >
  //           Login
  //         </Link>
  //       </div>
  //     )}
  //   </main>
  // );
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <LoadingSkeleton />
    </div>
  );
}
