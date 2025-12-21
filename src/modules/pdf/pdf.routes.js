import { Router } from "express";
import auth from "../../middlewares/auth.middleware.js";
import PDF from "./pdf.model.js";
import upload from "../../utils/multer.js";

const router = Router();

router.use(auth);

router.post("/upload", upload.single("pdf"), async (req, res) => {
  const pdf = await PDF.create({
    filename: req.file.filename,
    path: req.file.path,
    size: req.file.size,
    userId: req.user.id,
  });

  res.status(201).json({ success: true, data: pdf });
});

router.get("/", async (req, res) => {
  const pdfs = await PDF.find({ userId: req.user.id });
  res.json({ success: true, data: pdfs });
});

export default router;
