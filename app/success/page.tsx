"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Success = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000); // Redirect to home after 5 seconds

    return () => clearTimeout(timer); // Cleanup timer
  }, [router]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-6">Payment Successful! 🎉</h1>
      <p className="text-lg mb-4">
        Thank you for your purchase. Your payment has been successfully
        processed.
      </p>
      <p className="text-md">You will be redirected to the homepage shortly.</p>

      <button
        className="mt-8 px-6 py-3 bg-green-500 rounded text-black font-semibold hover:bg-green-600"
        onClick={() => router.push("/")}
      >
        Go to Homepage
      </button>
    </main>
  );
};

export default Success;
