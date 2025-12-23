import * as authService from "./auth.service.js";

export const register = async (req, res) => {
  const data = await authService.register(req.body);
  res.status(201).json({ success: true, data });
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
  const result = await authService.forgotPassword(req.body);
  res.json({ success: true, ...result });
};

export const resetPassword = async (req, res) => {
  const result = await authService.resetPassword(req.body);
  res.json({ success: true, ...result });
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
  const result = await authService.deleteAccount(req.user.id, req.body);
  res.json({ success: true, ...result });
};
