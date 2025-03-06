import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "../../../lib/models/Product";

// Get all products
export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find({});
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
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

    if (!name || !description || !price || !image || !category) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const newProduct = new Product({
      name,
      description,
      price,
      image,
      category,
    });

    await newProduct.save();
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}
