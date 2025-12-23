import { Router } from "express";
import auth from "../../middlewares/auth.middleware.js";
import Image from "./image.model.js";
import upload from "../../utils/multer.js";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary.js";

const router = Router();
router.use(auth);

router.post("/upload", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "Image required" });
  }

  const result = await uploadToCloudinary(req.file.buffer, {
    folder: "images",
    resource_type: "image",
  });

  const img = await Image.create({
    name: req.file.originalname,
    url: result.secure_url,
    publicId: result.public_id,
    size: result.bytes,
    userId: req.user.id,
  });

  res.status(201).json({ success: true, data: img });
});


router.get("/", async (req, res) => {
  const images = await Image.find({ userId: req.user.id });
  res.json({ success: true, data: images });
});

export default router;
