

import bcrypt from "bcryptjs";
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
