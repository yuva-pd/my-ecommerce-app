"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Correct

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  console.log("qwewqwewqwewqwewqwe");
  useEffect(() => {
    console.log("Router Object:", router);
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found. Redirecting to /login...");
      //   router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  //   useEffect(() => {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       router.push("/login"); // ✅ Redirect to login if not authenticated
  //     } else {
  //       setLoading(false);
  //     }
  //   }, []);

  if (loading) return <p className="text-white">Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>
      <button
        onClick={() => {
          //   localStorage.removeItem("token"); // ✅ Logout properly
          //   router.push("/login");
        }}
        className="mt-4 p-2 bg-red-500 text-white"
      >
        Logout
      </button>
    </div>
  );
}
