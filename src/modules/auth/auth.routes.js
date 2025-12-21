import { Router } from "express";
import * as authController from "./auth.controller.js";
import asyncHandler from "../../middlewares/asyncHandler.js";

const router = Router();

router.post("/register", asyncHandler(authController.register));
router.post("/login", asyncHandler(authController.login));

export default router;
