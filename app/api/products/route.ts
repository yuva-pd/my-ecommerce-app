import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/lib/models/Product";

// Get all products
export async function GET() {
  try {
    await connectToDatabase();

    // Fetch all products and exclude __v (internal mongoose field)
    const products = await Product.find({}).select("-__v");

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error); // ✅ Log for debugging
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// Add a new product
export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { name, description, price, image, category } = body;

    // Validate required fields
    if (!name || !description || !price || !image || !category) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Create and save the product
    const newProduct = await Product.create({
      name,
      description,
      price,
      image,
      category,
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error adding product:", error); // ✅ Log for debugging
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}
