import bcrypt from "bcryptjs";
import User from "../auth/auth.model.js";

export const setPin = async (userId, pin) => {
  const hashedPin = await bcrypt.hash(pin, 10);

  await User.findByIdAndUpdate(userId, {
    pin: hashedPin,
  });
};

export const lockApp = async (userId) => {
  await User.findByIdAndUpdate(userId, {
    isLocked: true,
  });
};

export const unlockApp = async (userId, pin) => {
  const user = await User.findById(userId);
  if (!user?.pin) throw new Error("PIN not set");

  const match = await bcrypt.compare(pin, user.pin);
  if (!match) throw new Error("Invalid PIN");

  await User.findByIdAndUpdate(userId, {
    isLocked: false,
  });
};
