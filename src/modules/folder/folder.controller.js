import * as folderService from "./folder.service.js";

/* ===============================
   CREATE
================================ */
export const createFolder = async (req, res) => {
  const folder = await folderService.createFolder({
    name: req.body.name,
    userId: req.user.id,
  });

  res.status(201).json({
    success: true,
    message: "Folder created successfully",
    data: folder,
  });
};

/* ===============================
   GET ALL
================================ */
export const getFolders = async (req, res) => {
  const folders = await folderService.getFolders(req.user.id);

  res.json({
    success: true,
    data: folders,
  });
};

/* ===============================
   GET ONE
================================ */
export const getFolder = async (req, res) => {
  const folder = await folderService.getFolderById(req.params.id, req.user.id);

  res.json({
    success: true,
    data: folder,
  });
};

/* ===============================
   UPDATE
================================ */
export const updateFolder = async (req, res) => {
  const folder = await folderService.updateFolder(
    req.params.id,
    req.user.id,
    req.body
  );

  res.json({
    success: true,
    message: "Folder updated successfully",
    data: folder,
  });
};

/* ===============================
   DELETE
================================ */
export const deleteFolder = async (req, res) => {
  await folderService.deleteFolder(req.params.id, req.user.id);

  res.json({
    success: true,
    message: "Folder deleted successfully",
  });
};
