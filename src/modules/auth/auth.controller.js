import * as authService from "./auth.service.js";

export const register = async (req, res) => {
  console.log("Register controller called with body:", req.body);
  const user = await authService.register(req.body);
  res.status(201).json({ success: true, user });
};

export const login = async (req, res) => {
  const data = await authService.login(req.body);
  res.json({ success: true, data });
};
export const changePassword = async (req, res) => {
  await authService.changePassword(req.user.id, req.body);
  res.json({ success: true, message: "Password changed successfully" });
};

export const forgotPassword = async (req, res) => {
  try {
    const result = await forgotPassword(req.body);
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const result = await resetPassword(req.body);
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const updateName = async (req, res) => {
  const user = await authService.updateName(req.user.id, req.body);

  res.json({
    success: true,
    message: "Name updated successfully",
    user,
  });
};


export const deleteAccount = async (req, res) => {
  const result = await authService.deleteAccount(
    req.user.id,
    req.body
  );

  res.json({
    success: true,
    ...result,
  });
};
