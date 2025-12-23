import Folder from "./folder.model.js";


export const createFolder = async ({ name, userId }) => {
  return Folder.create({ name, userId });
};


export const getFolders = async (userId) => {
  return Folder.find({ userId }).sort({ createdAt: -1 });
};


export const getFolderById = async (id, userId) => {
  console.log(id, userId);
  const folder = await Folder.findOne({ _id: id, userId });
  if (!folder) throw new Error("Folder not found");
  return folder;
};


export const updateFolder = async (id, userId, payload) => {
  const folder = await Folder.findOneAndUpdate({ _id: id, userId }, payload, {
    new: true,
  });

  if (!folder) throw new Error("Folder not found");
  return folder;
};

export const deleteFolder = async (id, userId) => {
  const folder = await Folder.findOneAndDelete({ _id: id, userId });
  if (!folder) throw new Error("Folder not found");
  return folder;
};
