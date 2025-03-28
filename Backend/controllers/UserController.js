import User from "../models/UserModel.js"; // Import the User model

export const test = (req, res) => {
  res.json({
    message: "User Route is working",
  });
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