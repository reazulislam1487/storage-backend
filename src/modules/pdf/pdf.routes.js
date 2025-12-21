import { Router } from "express";
import multer from "multer";
import auth from "../../middlewares/auth.middleware.js";
import PDF from "./pdf.model.js";

const router = Router();

const storage = multer.diskStorage({
  destination: "uploads/pdfs",
  filename: (_, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

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


router.delete("/:id", async (req, res) => {
  try {
    await Favorite.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    res.json({ success: true, message: "Removed from favorites" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


export default router;
