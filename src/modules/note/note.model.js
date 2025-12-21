import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    folderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);
