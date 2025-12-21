import { Router } from "express";
import multer from "multer";
import auth from "../../middlewares/auth.middleware.js";
import Pdf from "./pdf.model.js";

const router = Router();

const storage = multer.diskStorage({
  destination: "uploads/pdfs",
  filename: (_, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.use(auth);

router.post("/upload", upload.single("pdf"), async (req, res) => {
  const pdf = await Pdf.create({
    filename: req.file.filename,
    path: req.file.path,
    size: req.file.size,
    userId: req.user.id,
  });

  res.status(201).json({ success: true, data: pdf });
});

router.get("/", async (req, res) => {
  const pdfs = await Pdf.find({ userId: req.user.id });
  res.json({ success: true, data: pdfs });
});

export default router;
