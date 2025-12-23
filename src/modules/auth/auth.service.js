import bcrypt from "bcryptjs";
import sendMail from "../../utils/sendMail.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "./auth.model.js";

export const register = async ({ name, email, password }) => {
  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
  });

  //  convert mongoose document → plain object
  const userObj = user.toObject();
  delete userObj.password;

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  return {
    user: userObj,
    token,
  };
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  // safe removal of password
  const userObj = user.toObject();
  delete userObj.password;

  return {
    user: userObj,
    token,
  };
};

export const changePassword = async (
  userId,
  { oldPassword, newPassword, confirmNewPassword }
) => {
  if (!oldPassword || !newPassword || !confirmNewPassword) {
    throw new Error("All fields are required");
  }

  if (newPassword !== confirmNewPassword) {
    throw new Error("New password and confirm password do not match");
  }

  const user = await User.findById(userId).select("+password");
  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(oldPassword, user.password);
  if (!match) throw new Error("Old password is incorrect");

  if (oldPassword === newPassword) {
    throw new Error("New password must be different from old password");
  }

  if (newPassword.length < 8) {
    throw new Error("Password must be at least 8 characters long");
  }
  const hashed = await bcrypt.hash(newPassword, 10);
  user.password = hashed;
  await user.save();
};

export const forgotPassword = async ({ email }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const resetToken = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

  await user.save();

  const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";

  const resetUrl = `${clientUrl}/reset-password/${resetToken}`;
  const token = resetToken;

  await sendMail({
    to: user.email,
    subject: "Password Reset Request",
    html: `
      <p>You requested a password reset.</p>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
        <p>For Testing please copy the link and paste in the reset-password body .</p>
         <p> <b>Copy from Here:</b> ${token}</p>
      <p>This link will expire in 15 minutes.</p>
    `,
  });

  return { message: "Password reset link sent to email" };
};

export const resetPassword = async ({ token, newPassword }) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) throw new Error("Token is invalid or expired");

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  return { message: "Password reset successful" };
};

export const updateName = async (userId, { name }) => {
  if (!name || name.trim().length < 2) {
    throw new Error("Name must be at least 2 characters long");
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { name: name.trim() },
    { new: true }
  ).select("-password");

  if (!user) throw new Error("User not found");

  return user;
};

export const deleteAccount = async (userId, { password }) => {
  if (!password) {
    throw new Error("Password is required to delete account");
  }

  const user = await User.findById(userId).select("+password");
  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Incorrect password");

  await User.findByIdAndDelete(userId);

  return { message: "Account deleted successfully" };
};
