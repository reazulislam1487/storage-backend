import { Router } from "express";
import auth from "../../middlewares/auth.middleware.js";
import PDF from "./pdf.model.js";
import upload from "../../utils/multer.js";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary.js";

const router = Router();
router.use(auth);

/**
 * Upload PDF
 */
router.post("/upload", upload.single("pdf"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "PDF required" });
  }

  const result = await uploadToCloudinary(req.file.buffer, {
    folder: "pdfs",
    resource_type: "raw",
  });

 
  const pdf = await PDF.create({
    filename: req.file.originalname, 
    url: result.secure_url,          
    publicId: result.public_id,
    size: result.bytes,
    userId: req.user.id,
  });

  res.status(201).json({ success: true, data: pdf });
});

/**
 * Get all PDFs
 */
router.get("/", async (req, res) => {
  const pdfs = await PDF.find({ userId: req.user.id });
  res.json({ success: true, data: pdfs });
});

export default router;
