import express from "express";
import { test, updateUserProfile, updateUser, deleteUser, getUsers, getUserTypeByEmail } from "../controllers/UserController.js";

const router = express.Router();

// Test route
router.get("/test", test);

// Get all users
router.get("/users", getUsers);

// Route to update user profile
router.put("/update/:userId", updateUserProfile);

// Get user type by email
router.get("/user-type", getUserTypeByEmail);

// Admin routes for user management
router.put("/users/:userId", updateUser);
router.delete("/users/:userId", deleteUser);



export default router;