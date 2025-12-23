import { Router } from "express";
import auth from "../../middlewares/auth.middleware.js";
import mongoose from "mongoose";

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

  // 🔥 string + ObjectId safe match
  const matchUser = {
    $or: [{ userId: userId }, { userId: new mongoose.Types.ObjectId(userId) }],
  };

  const [folders, notes, images, pdfs] = await Promise.all([
    Folder.find({ ...matchUser, name: regex }).lean(),
    Note.find({ ...matchUser, title: regex }).lean(),
    Image.find({ ...matchUser, filename: regex }).lean(),
    Pdf.find({ ...matchUser, filename: regex }).lean(),
  ]);

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

  res.json({ success: true, data: results });
});

export default router;
