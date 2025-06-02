const Listing = require('../models/Listing');

// Get pending listings
const getPendingListings = async (req, res) => {
    try {
        const listings = await Listing.find({ status: 'pending' })
            .populate('userId', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: listings
        });
    } catch (error) {
        console.error('Error fetching pending listings:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch pending listings'
        });
    }
};

// Approve or reject a listing
const updateListingStatus = async (req, res) => {
    try {
        const { listingId } = req.params;
        const { status } = req.body;

        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status. Must be either "approved" or "rejected"'
            });
        }

        const listing = await Listing.findByIdAndUpdate(
            listingId,
            { status },
            { new: true }
        );

        if (!listing) {
            return res.status(404).json({
                success: false,
                message: 'Listing not found'
            });
        }

        res.status(200).json({
            success: true,
            data: listing,
            message: `Listing ${status} successfully`
        });
    } catch (error) {
        console.error('Error updating listing status:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update listing status'
        });
    }
};

// Get all listings
const getAllListings = async (req, res) => {
    try {
        const listings = await Listing.find()
            .populate('userId', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: listings
        });
    } catch (error) {
        console.error('Error fetching listings:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch listings'
        });
    }
};

// Create a new listing
const createListing = async (req, res) => {
    try {
        const listing = new Listing({
            ...req.body,
            userId: req.user._id
        });

        await listing.save();

        res.status(201).json({
            success: true,
            data: listing,
            message: 'Listing created successfully'
        });
    } catch (error) {
        console.error('Error creating listing:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create listing'
        });
    }
};

module.exports = {
    getPendingListings,
    updateListingStatus,
    getAllListings,
    createListing
}; 