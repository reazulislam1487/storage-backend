import { Router } from "express";
import auth from "../../middlewares/auth.middleware.js";
import Image from "./image.model.js";
import upload from "../../utils/multer.js";

const router = Router();

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
