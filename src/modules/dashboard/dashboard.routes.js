import { Router } from "express";
import auth from "../../middlewares/auth.middleware.js";
import appLockGuard from "../../middlewares/appLock.middleware.js";
import Image from "../image/image.model.js";
import Pdf from "../pdf/pdf.model.js";
import Note from "../note/note.model.js";
import Folder from "../folder/folder.model.js";
import mongoose from "mongoose";
const router = Router();
router.use(auth);
router.use(appLockGuard);

const STORAGE_LIMIT = 15 * 1024 * 1024 * 1024; // 15GB

router.get("/summary", async (req, res) => {
  try {
    const userId = req.user.id;

    let objectUserId = null;
    if (mongoose.Types.ObjectId.isValid(userId)) {
      objectUserId = new mongoose.Types.ObjectId(userId);
    }

    const matchByUser = {
      $or: [{ userId }, { userId: objectUserId }],
    };

    const [images, pdfs, notes, folders] = await Promise.all([
      Image.find(matchByUser),
      Pdf.find(matchByUser),
      Note.find(matchByUser),
      Folder.find(matchByUser),
    ]);

    const imageStorage = images.reduce((s, i) => s + (i.size || 0), 0);
    const pdfStorage = pdfs.reduce((s, p) => s + (p.size || 0), 0);

    res.json({
      success: true,
      data: {
        storage: {
          used: imageStorage + pdfStorage,
          available: STORAGE_LIMIT - (imageStorage + pdfStorage),
        },
        cards: {
          folders: { totalItem: folders.length, storage: 0 },
          notes: { totalItem: notes.length, storage: 0 },
          images: { totalItem: images.length, storage: imageStorage },
          pdfs: { totalItem: pdfs.length, storage: pdfStorage },
        },
        recent: [...images, ...pdfs, ...notes]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5),
      },
    });
  } catch (err) {
    console.error("Dashboard summary error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

export default router;
