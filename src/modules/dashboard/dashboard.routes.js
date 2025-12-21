import { Router } from "express";
import auth from "../../middlewares/auth.middleware.js";
import Image from "../image/image.model.js";
import Pdf from "../pdf/pdf.model.js";
import Note from "../note/note.model.js";

const router = Router();
router.use(auth);

router.get("/summary", async (req, res) => {
  const images = await Image.find({ userId: req.user.id });
  const pdfs = await Pdf.find({ userId: req.user.id });
  const notes = await Note.find({ userId: req.user.id });

  const used =
    images.reduce((a, i) => a + i.size, 0) +
    pdfs.reduce((a, p) => a + p.size, 0);

  res.json({
    success: true,
    data: {
      totalImages: images.length,
      totalPdfs: pdfs.length,
      totalNotes: notes.length,
      storageUsed: used,
    },
  });
});

export default router;
