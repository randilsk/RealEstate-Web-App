const express = require('express');
const router = express.Router();
const { 
    getPendingListings, 
    updateListingStatus,
    getAllListings,
    createListing
} = require('../controllers/ListingController');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// Get all listings (public)
router.get('/', getAllListings);

// Create a new listing (authenticated users)
router.post('/', verifyToken, createListing);

// Get pending listings (admin only)
router.get('/pending', verifyToken, verifyAdmin, getPendingListings);

// Approve or reject a listing (admin only)
router.put('/:listingId/approve', verifyToken, verifyAdmin, updateListingStatus);

// ... existing routes ...

module.exports = router; 