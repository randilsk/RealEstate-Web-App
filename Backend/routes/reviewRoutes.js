const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Get all reviews with optional propertyId filter
router.get('/', async (req, res) => {
    try {
        const { propertyId } = req.query;
        const query = propertyId ? { propertyId } : {};

        const reviews = await Review.find(query)
            .populate('userId', 'name email')
            .populate('propertyId', 'title')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: reviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching reviews',
            error: error.message
        });
    }
});

// Get total count of reviews with optional filters
router.get('/count', async (req, res) => {
    try {
        const { propertyId } = req.query;
        const query = propertyId ? { propertyId } : {};

        const count = await Review.countDocuments(query);

        res.json({
            success: true,
            count
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching review count',
            error: error.message
        });
    }
});

module.exports = router; 