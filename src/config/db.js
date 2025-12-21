import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://storage_db:gSGpdWN7F68VS9cl@cluster0.siebl7k.mongodb.net/storage_db?retryWrites=true&w=majority&storage_db=Cluster0";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
