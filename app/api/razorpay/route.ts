import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "../../models/Order";

export async function POST(req: Request) {
  try {
    const { items, totalAmount, name, email, phone, address } =
      await req.json();

    await connectToDatabase();

    // Initialize Razorpay instance
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    // Create Razorpay Order
    const order = await razorpay.orders.create({
      amount: totalAmount * 100, // Razorpay needs amount in paise
      currency: "INR",
      payment_capture: 1,
      notes: { name, email, phone, ...address },
    });

    // Store order in MongoDB
    const newOrder = new Order({
      user: email,
      items,
      totalAmount,
      shippingAddress: address,
      email,
      phone,
      paymentStatus: "Pending", // Update after successful payment
    });

    await newOrder.save();
    console.log("Order saved:", newOrder);

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
