import * as service from "./note.service.js";

export const create = async (req, res) => {
  const note = await service.createNote({
    ...req.body,
    userId: req.user.id,
  });

  res.status(201).json({ success: true, data: note });
};

export const getAll = async (req, res) => {
  const notes = await service.getNotes(req.user.id);
  res.json({ success: true, data: notes });
};

export const update = async (req, res) => {
  const note = await service.updateNote(
    req.params.id,
    req.user.id,
    req.body
  );
  res.json({ success: true, data: note });
};

export const remove = async (req, res) => {
  await service.deleteNote(req.params.id, req.user.id);
  res.json({ success: true });
};
