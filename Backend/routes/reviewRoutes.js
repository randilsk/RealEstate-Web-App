import express from 'express';
import { getAllReviews, addReview } from '../controllers/ReviewController.js';

const router = express.Router();

// Route to get all reviews
router.get('/reviews', getAllReviews);

// Route to add a new review
router.post('/add-reviews', addReview);

export default router; 