import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true, index: { expires: "5m" } }, // Auto-delete after 5 min
});

const OtpModel = mongoose.models.Otp || mongoose.model("Otp", OtpSchema);
export default OtpModel;
