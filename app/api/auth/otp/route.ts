import { NextResponse } from "next/server";
import OtpModel from "../../../models/Otp";
import { connectDB } from "../../../utils/db";
import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const TWILIO_PHONE = process.env.TWILIO_PHONE_NUMBER;

export async function POST(req: Request) {
  try {
    const { phoneNumber } = await req.json();

    if (!phoneNumber.startsWith("+91")) {
      return NextResponse.json(
        { error: "Invalid phone number format" },
        { status: 400 }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await connectDB();

    // Store OTP in MongoDB
    await OtpModel.create({
      phoneNumber,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 min expiry
    });

    await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: TWILIO_PHONE,
      to: phoneNumber,
    });

    return NextResponse.json({ success: true, message: "OTP Sent!" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
