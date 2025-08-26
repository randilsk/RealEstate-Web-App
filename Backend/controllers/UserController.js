import User from "../models/UserModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utills/error.js";
import jwt from "jsonwebtoken";
import { getUserType, getUserSubscriptionDetails } from "../utills/userTypeUtils.js";

export const test = (req, res) => {
  res.json({
    message: "User Route is working",
  });
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude password from response
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email, avatar, password } = req.body;

    // Create update object with basic fields
    const updateData = { username, email, avatar };

    // If password is provided, hash it and add to update data
    if (password) {
      const hashedPassword = await bcryptjs.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = updatedUser.toObject();
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Admin: Update user
export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email, role, status } = req.body;

    // Validate role and status
    const validRoles = ['buyer', 'seller', 'renter'];
    const validStatuses = ['active', 'pending', 'banned'];

    if (role && !validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (role) updateData.role = role;
    if (status) updateData.status = status;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password'); // Exclude password from response

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ 
      message: "Error updating user", 
      error: error.message 
    });
  }
};

// Admin: Delete user
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ 
      message: "User deleted successfully",
      deletedUser: {
        _id: deletedUser._id,
        username: deletedUser.username,
        email: deletedUser.email
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error deleting user", 
      error: error.message 
    });
  }
};

// Get user type by email
export const getUserTypeByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const userType = await getUserType(email);
    const subscriptionDetails = await getUserSubscriptionDetails(email);

    res.status(200).json({
      email,
      userType,
      subscriptionDetails
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error getting user type", 
      error: error.message 
    });
  }
};

// Update user subscription status
export const updateSubscriptionStatus = async (req, res) => {
  try {
    const { email, subscription } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!subscription || !['free', 'premium'].includes(subscription)) {
      return res.status(400).json({ message: "Valid subscription type is required (free or premium)" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { subscription },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Subscription status updated successfully",
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error updating subscription status", 
      error: error.message 
    });
  }
};
