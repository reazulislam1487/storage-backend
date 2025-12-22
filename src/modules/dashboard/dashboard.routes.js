import { Router } from "express";
import auth from "../../middlewares/auth.middleware.js";
import appLockGuard from "../../middlewares/appLock.middleware.js";

import Image from "../image/image.model.js";
import Pdf from "../pdf/pdf.model.js";
import Note from "../note/note.model.js";
import Folder from "../folder/folder.model.js";

const router = Router();
router.use(auth);
router.use(appLockGuard);

// 🔒 15 GB storage limit (bytes)
const STORAGE_LIMIT = 15 * 1024 * 1024 * 1024;

router.get("/summary", async (req, res) => {
  const userId = req.user.id;

  // fetch all data in parallel
  const [images, pdfs, notes, folders] = await Promise.all([
    Image.find({ userId }).sort({ createdAt: -1 }),
    Pdf.find({ userId }).sort({ createdAt: -1 }),
    Note.find({ userId }).sort({ createdAt: -1 }),
    Folder.find({ userId }).sort({ createdAt: -1 }),
  ]);

  // ===============================
  // STORAGE CALCULATION (BYTES)
  // ===============================
  const imageStorage = images.reduce((sum, img) => sum + (img.size || 0), 0);

  const pdfStorage = pdfs.reduce((sum, pdf) => sum + (pdf.size || 0), 0);

  const noteStorage = 0; // notes are text-based
  const folderStorage = imageStorage + pdfStorage;

  const usedStorage = folderStorage;
  const availableStorage = Math.max(STORAGE_LIMIT - usedStorage, 0);

  // ===============================
  // RECENT ITEMS (UI MATCHED)
  // ===============================
  const recent = [
    ...images.map((i) => ({
      type: "IMAGE",
      name: i.filename,
      createdAt: i.createdAt,
    })),
    ...folders.map((f) => ({
      type: "FOLDER",
      name: f.name,
      createdAt: f.createdAt,
    })),
    ...notes.map((n) => ({
      type: "NOTE",
      name: n.title,
      createdAt: n.createdAt,
    })),
    ...pdfs.map((p) => ({
      type: "PDF",
      name: p.filename,
      createdAt: p.createdAt,
    })),
  ]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  // ===============================
  // RESPONSE (UI READY)
  // ===============================
  res.json({
    success: true,
    data: {
      storage: {
        total: STORAGE_LIMIT,
        used: usedStorage,
        available: availableStorage,
      },
      cards: {
        folders: {
          totalItem: folders.length,
          storage: folderStorage,
        },
        notes: {
          totalItem: notes.length,
          storage: noteStorage,
        },
        images: {
          totalItem: images.length,
          storage: imageStorage,
        },
        pdfs: {
          totalItem: pdfs.length,
          storage: pdfStorage,
        },
      },
      recent,
    },
  });
});

export default router;
