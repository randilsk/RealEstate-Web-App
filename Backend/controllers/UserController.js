import User from "../models/UserModel.js"; // Import the User model
import bcryptjs from 'bcryptjs';

export const test = (req, res) => {
  res.json({
    message: "User Route is working",
  });
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