import { Router } from "express";
import * as ctrl from "./note.controller.js";
import asyncHandler from "../../utils/asyncHandler.js";
import auth from "../../middlewares/auth.middleware.js";

const router = Router();
router.use(auth);

router.post("/", asyncHandler(ctrl.create));
router.get("/", asyncHandler(ctrl.getAll));
router.patch("/:id", asyncHandler(ctrl.update));
router.delete("/:id", asyncHandler(ctrl.remove));

export default router;
