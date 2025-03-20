import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "../../models/Order";

export async function POST(req: Request) {
  try {
    const { items, totalAmount, name, email, phone, address } =
      await req.json();

    // Validate payload
    if (!items || !totalAmount || !name || !email || !phone || !address) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Initialize Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: totalAmount * 100, // Convert amount to paise
      currency: "INR",
      payment_capture: true,
      notes: { name, email, phone, ...address },
    });

    // Save order in MongoDB
    const newOrder = new Order({
      user: email,
      items,
      totalAmount,
      shippingAddress: address,
      email,
      phone,
      paymentStatus: "Pending",
      razorpayOrderId: order.id,
    });

    await newOrder.save();
    console.log("Order saved:", newOrder);

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order", details: error },
      { status: 500 }
    );
  }
}
