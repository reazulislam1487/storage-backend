import express from "express";
import cors from "cors";
import routes from "./routes/routes.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Welcome to the Storage Backend API");
});
app.use("/api", routes);
app.use(errorHandler);

export default app;
