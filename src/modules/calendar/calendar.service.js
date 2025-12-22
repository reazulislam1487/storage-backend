import Image from "../image/image.model.js";
import Pdf from "../pdf/pdf.model.js";
import Note from "../note/note.model.js";
import Folder from "../folder/folder.model.js";

/**
 * Get calendar items by date
 * @param {string} userId
 * @param {string} date (YYYY-MM-DD)
 */
export const getCalendarItemsByDate = async (userId, date) => {
  if (!date) {
    throw new Error("DATE_REQUIRED");
  }

  // 📅 Date range
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  // ⏳ Parallel DB queries
  const [images, pdfs, notes, folders] = await Promise.all([
    Image.find({ userId, createdAt: { $gte: start, $lte: end } }),
    Pdf.find({ userId, createdAt: { $gte: start, $lte: end } }),
    Note.find({ userId, createdAt: { $gte: start, $lte: end } }),
    Folder.find({ userId, createdAt: { $gte: start, $lte: end } }),
  ]);

  // 🔁 Normalize data
  const items = [
    ...images.map(i => ({
      id: i._id,
      name: i.name,
      type: "image",
      createdAt: i.createdAt,
    })),
    ...pdfs.map(p => ({
      id: p._id,
      name: p.name,
      type: "pdf",
      createdAt: p.createdAt,
    })),
    ...notes.map(n => ({
      id: n._id,
      name: n.title,
      type: "note",
      createdAt: n.createdAt,
    })),
    ...folders.map(f => ({
      id: f._id,
      name: f.name,
      type: "folder",
      createdAt: f.createdAt,
    })),
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return {
    date,
    total: items.length,
    items,
  };
};
