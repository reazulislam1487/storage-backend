import * as folderService from "./folder.service.js";

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

export const getFolders = async (req, res) => {
  const folders = await folderService.getFolders(req.user.id);

  res.json({
    success: true,
    data: folders,
  });
};

export const getFolder = async (req, res) => {
  const folder = await folderService.getFolderById(req.params.id, req.user.id);

  res.json({
    success: true,
    data: folder,
  });
};

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


export const deleteFolder = async (req, res) => {
  await folderService.deleteFolder(req.params.id, req.user.id);

  res.json({
    success: true,
    message: "Folder deleted successfully",
  });
};
