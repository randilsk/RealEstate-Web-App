import User from "../models/UserModel.js"; // Import the User model

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
    const { username, email, avatar } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, avatar },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
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