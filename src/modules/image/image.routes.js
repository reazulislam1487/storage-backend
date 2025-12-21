import { Router } from "express";
import multer from "multer";
import auth from "../../middlewares/auth.middleware.js";
import Image from "./image.model.js";

const router = Router();

const storage = multer.diskStorage({
  destination: "uploads/images",
  filename: (_, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.use(auth);

router.post("/upload", upload.single("image"), async (req, res) => {
  const img = await Image.create({
    filename: req.file.filename,
    path: req.file.path,
    size: req.file.size,
    userId: req.user.id,
  });
  console.log("first");

  return res.status(201).json({ success: true, data: img });
});

router.get("/", async (req, res) => {
  const images = await Image.find({ userId: req.user.id });
  return res.json({ success: true, data: images });
});

export default router;
