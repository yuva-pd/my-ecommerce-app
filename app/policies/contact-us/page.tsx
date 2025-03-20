"use client";
import { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent successfully!");
  };

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
        <div>
          <label className="block mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-gray-800 border border-gray-700"
          />
        </div>

        <div>
          <label className="block mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-gray-800 border border-gray-700"
          />
        </div>

        <div>
          <label className="block mb-2">Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 h-32"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Send Message
        </button>
      </form>
    </main>
  );
}
