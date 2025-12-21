import Note from "./note.model.js";

export const createNote = (data) => Note.create(data);

export const getNotes = (userId) =>
  Note.find({ userId }).sort({ createdAt: -1 });

export const updateNote = (id, userId, payload) =>
  Note.findOneAndUpdate({ _id: id, userId }, payload, { new: true });

export const deleteNote = (id, userId) =>
  Note.findOneAndDelete({ _id: id, userId });
