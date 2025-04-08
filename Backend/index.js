import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import AuthRouter from "./routes/auth.route.js";
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS
  
app.use(express.json());

mongoose
  .connect("mongodb+srv://sdnt2:sdnt2@cluster0.7ex8l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

  app.listen(3000, () => {  // change the port to 5000
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
