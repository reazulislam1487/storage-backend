import mongoose from "mongoose";

const favSchema = new mongoose.Schema(
  {
    itemId: mongoose.Schema.Types.ObjectId,
    itemType: String, // IMAGE | PDF | NOTE | FOLDER
    userId: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
);

export default mongoose.model("Favorite", favSchema);
