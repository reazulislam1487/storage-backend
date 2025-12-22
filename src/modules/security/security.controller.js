import * as service from "./security.service.js";

export const setPin = async (req, res) => {
  await service.setPin(req.user.id, req.body.pin);
  res.json({ success: true, message: "PIN set successfully" });
};

export const lock = async (req, res) => {
  await service.lockApp(req.user.id);
  res.json({ success: true, message: "App locked" });
};

export const unlock = async (req, res) => {
  await service.unlockApp(req.user.id, req.body.pin);
  res.json({ success: true, message: "App unlocked" });
};
