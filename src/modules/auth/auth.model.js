import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    pin: { type: String }, // hashed PIN
    isLocked: { type: Boolean, default: false },
  },

  { timestamps: true }
);

export default mongoose.model("User", userSchema);
