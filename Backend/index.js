import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import AuthRouter from "./routes/auth.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/api/user", UserRoute);
app.use("/api/auth", AuthRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const massage = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    massage,
  });
});
