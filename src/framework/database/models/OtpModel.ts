import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
  name: {type: String},
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  password: {type: String},
  createdAt: { type: Date, default: Date.now, expires: 300 } // 5 min expiry
});

export default mongoose.model("Otp", OtpSchema);
