import express from "express";
import { test, updateUserProfile, updateUser, deleteUser, getUsers, getUserTypeByEmail, updateSubscriptionStatus } from "../controllers/UserController.js";
import { verifyToken, verifyTokenForProfile } from "../middleware/auth.middleware.js";

const router = express.Router();

// Test route
router.get("/test", test);

// Get all users
router.get("/users", getUsers);

// Route to update user profile (requires authentication)
router.put("/update/:userId", verifyTokenForProfile, updateUserProfile);

// Get user type by email
router.get("/user-type", getUserTypeByEmail);

// Update user subscription status
router.put("/update-subscription", updateSubscriptionStatus);

// Admin routes for user management
router.put("/users/:userId", updateUser);
router.delete("/users/:userId", deleteUser);



export default router;