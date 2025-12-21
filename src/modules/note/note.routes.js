import { Router } from "express";
import * as ctrl from "./note.controller.js";
import auth from "../../middlewares/auth.middleware.js";
import asyncHandler from "../../middlewares/asyncHandler.js";

const router = Router();
router.use(auth);

router.post("/", asyncHandler(ctrl.create));
router.get("/", asyncHandler(ctrl.getAll));
router.patch("/:id", asyncHandler(ctrl.update));
router.delete("/:id", asyncHandler(ctrl.remove));

export default router;
