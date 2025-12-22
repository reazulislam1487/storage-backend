import { Router } from "express";
import * as authController from "./auth.controller.js";
import asyncHandler from "../../middlewares/asyncHandler.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", asyncHandler(authController.register));
router.post("/login", asyncHandler(authController.login));
router.post(
  "/change-password",
  authMiddleware,
  asyncHandler(authController.changePassword)
);
router.post(
  "/forgot-password",
  authMiddleware,
  asyncHandler(authController.forgotPassword)
);
router.post(
  "/reset-password",
  authMiddleware,
  asyncHandler(authController.resetPassword)
);

router.patch(
  "/update-name",
  authMiddleware,
  asyncHandler(authController.updateName)
);

router.delete(
  "/delete-account",
  authMiddleware,
  asyncHandler(authController.deleteAccount)
);
export default router;
