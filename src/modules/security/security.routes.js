import { Router } from "express";
import auth from "../../middlewares/auth.middleware.js";
import asyncHandler from "../../middlewares/asyncHandler.js";
import * as ctrl from "./security.controller.js";

const router = Router();

router.use(auth);

router.post("/set-pin", asyncHandler(ctrl.setPin));
router.post("/lock", asyncHandler(ctrl.lock));
router.post("/unlock", asyncHandler(ctrl.unlock));

export default router;
