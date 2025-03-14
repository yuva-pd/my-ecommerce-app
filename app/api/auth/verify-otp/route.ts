import { NextResponse } from "next/server";
import OtpModel from "../../../models/Otp";
import { connectDB } from "../../../utils/db";

export async function POST(req: Request) {
  const { phoneNumber, otp } = await req.json();
  await connectDB();

  const storedOtp = await OtpModel.findOne({ phoneNumber, otp });

  if (!storedOtp) {
    return NextResponse.json(
      { error: "Invalid or expired OTP" },
      { status: 401 }
    );
  }

  // ✅ OTP is correct, delete it from MongoDB
  await OtpModel.deleteOne({ _id: storedOtp._id });

  return NextResponse.json({ success: true, message: "OTP Verified" });
}
