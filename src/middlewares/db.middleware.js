import connectDB from "../config/db.js";

const dbMiddleware = async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("DB connection error:", err);
    return res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
};

export default dbMiddleware;
