import mongoose from "mongoose";

const favSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "itemType",
    },

    itemType: {
      type: String,
      required: true,
      enum: ["Note", "PDF", "Image", "Folder"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Favorite", favSchema);
