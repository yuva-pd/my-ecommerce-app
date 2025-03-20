import mongoose from "mongoose";
import { NextResponse } from "next/server";

const MONGODB_URI = process.env.MONGODB_URI || "";
console.log(MONGODB_URI, "MONGODB_URI");

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is missing in .env.local");
}

export const connectToDatabase = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }
    await mongoose.connect(MONGODB_URI, {
      dbName: "ecommerce", // Change to your database name
    });
    console.log("✅ MongoDB Connected!");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    throw error;
  }
};
