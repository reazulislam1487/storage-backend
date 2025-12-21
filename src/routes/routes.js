import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes.js";
import folderRoutes from "../modules/folder/folder.routes.js";
import noteRoutes from "../modules/note/note.routes.js";
import imageRoutes from "../modules/image/image.routes.js";
import pdfRoutes from "../modules/pdf/pdf.routes.js";
import favoriteRoutes from "../modules/favorite/favorite.routes.js";
import dashboardRoutes from "../modules/dashboard/dashboard.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/folders", folderRoutes);
router.use("/notes", noteRoutes);
router.use("/images", imageRoutes);
router.use("/pdfs", pdfRoutes);
router.use("/favorites", favoriteRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;
