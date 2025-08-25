import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import AuthRouter from "./routes/auth.route.js";
import ListingRoute from "./routes/AddListingRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import reviewRouts from "./routes/reviewRoutes.js"

import rentRoutes from "./routes/Rentroutes.js"
import AdminRoute from "./routes/admin.route.js";
import ApproveRoute from './routes/approve.listingRoute.js';
import stripeRoutes from './routes/stripe.routes.js';

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

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"], // Allow both frontend ports
    credentials: true, // Allow cookies to be sent with requests
  })
);

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to parse cookiesS
app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
//commenting out for now
app.use("/api/user", UserRoute);
app.use("/api/auth", AuthRouter);
app.use("/api/listing", ListingRoute);
app.use("/api/reviews", reviewRouts);
app.use("/api/admin", AdminRoute);
app.use("/api/Rentroutes",rentRoutes);
app.use("/api/approve", ApproveRoute);
app.use("/api/stripe", stripeRoutes);



//global error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Log the error for debugging
  console.error(`Error: ${statusCode} - ${message}`);
  if (err.stack) {
    console.error(err.stack);
  }

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});
