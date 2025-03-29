import express from "express";
import { test, updateUserProfile } from "../controllers/UserController.js";

const router = express.Router();

// Test route
router.get("/test", test);

// Route to update user profile
router.put("/update/:userId", updateUserProfile);

export default router;