import { Router } from "express";
import * as folderController from "./folder.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import asyncHandler from "../../middlewares/asyncHandler.js";

const router = Router();

router.use(authMiddleware);

router.post("/", asyncHandler(folderController.createFolder));
router.get("/", asyncHandler(folderController.getFolders));
router.get("/:id", asyncHandler(folderController.getFolder));
router.patch("/:id", asyncHandler(folderController.updateFolder));
router.delete("/:id", asyncHandler(folderController.deleteFolder));

export default router;
