import Review from "../models/ReviewModel.js";

// Get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews", error });
  }
};

// Add a new review
export const addReview = async (req, res) => {
  try {
    const { name, rating, comment } = req.body;
    
    // Validate input
    if (!name || !rating || !comment) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    const newReview = new Review({
      name,
      rating,
      comment
    });

    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ message: "Failed to add review", error });
  }
}; 