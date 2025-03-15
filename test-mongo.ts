import mongoose from "mongoose";
import dotenv from "dotenv";
import { NextResponse } from "next/server";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is missing in .env.local");
}

async function testMongoDB() {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI, { dbName: "testDB" });

    console.log("✅ MongoDB connection successful!");

    // Optional: Fetch databases (if you want to test read operation)
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log(
      "📂 Collections:",
      collections.map((col) => col.name)
    );

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

testMongoDB();
