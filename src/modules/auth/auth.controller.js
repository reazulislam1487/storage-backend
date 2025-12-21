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
