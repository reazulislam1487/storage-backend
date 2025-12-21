import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema(
  {
    filename: String,
    path: String,
    size: Number,
    userId: mongoose.Schema.Types.ObjectId,
  },
  { timestamps: true }
);

export default mongoose.model("Pdf", pdfSchema);
