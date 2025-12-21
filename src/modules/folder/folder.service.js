import Folder from "./folder.model.js";

/* ===============================
   CREATE FOLDER
================================ */
export const createFolder = async ({ name, userId }) => {
  return Folder.create({ name, userId });
};

/* ===============================
   GET ALL FOLDERS
================================ */
export const getFolders = async (userId) => {
  return Folder.find({ userId }).sort({ createdAt: -1 });
};

/* ===============================
   GET SINGLE FOLDER
================================ */
export const getFolderById = async (id, userId) => {
  const folder = await Folder.findOne({ _id: id, userId });
  if (!folder) throw new Error("Folder not found");
  return folder;
};

/* ===============================
   UPDATE FOLDER
================================ */
export const updateFolder = async (id, userId, payload) => {
  const folder = await Folder.findOneAndUpdate({ _id: id, userId }, payload, {
    new: true,
  });

  if (!folder) throw new Error("Folder not found");
  return folder;
};

/* ===============================
   DELETE FOLDER
================================ */
export const deleteFolder = async (id, userId) => {
  const folder = await Folder.findOneAndDelete({ _id: id, userId });
  if (!folder) throw new Error("Folder not found");
  return folder;
};
