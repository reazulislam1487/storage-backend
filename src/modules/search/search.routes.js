import { Router } from "express";
import auth from "../../middlewares/auth.middleware.js";

import Folder from "../folder/folder.model.js";
import Note from "../note/note.model.js";
import Image from "../image/image.model.js";
import Pdf from "../pdf/pdf.model.js";

const router = Router();
router.use(auth);

router.get("/", async (req, res) => {
  const { q } = req.query;
  const userId = req.user.id;

  if (!q) {
    return res.json({ success: true, data: [] });
  }

  const regex = new RegExp(q, "i");

  const [folders, notes, images, pdfs] = await Promise.all([
    Folder.find({ userId, name: regex }),
    Note.find({ userId, title: regex }),
    Image.find({ userId, filename: regex }),
    Pdf.find({ userId, filename: regex }),
  ]);

  // 🔁 unified response (UI friendly)
  const results = [
    ...folders.map((f) => ({
      id: f._id,
      type: "FOLDER",
      name: f.name,
      createdAt: f.createdAt,
    })),
    ...notes.map((n) => ({
      id: n._id,
      type: "NOTE",
      name: n.title,
      createdAt: n.createdAt,
    })),
    ...images.map((i) => ({
      id: i._id,
      type: "IMAGE",
      name: i.filename,
      createdAt: i.createdAt,
    })),
    ...pdfs.map((p) => ({
      id: p._id,
      type: "PDF",
      name: p.filename,
      createdAt: p.createdAt,
    })),
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res.json({
    success: true,
    data: results,
  });
});

export default router;
