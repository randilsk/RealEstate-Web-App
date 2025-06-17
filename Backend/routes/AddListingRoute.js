import express from "express";
import {
  getAllListings,
  getUserListings,
  addListing,
  getSingleListing,
  updateListing,
  deleteListing,
} from "../controllers/AddListingController.js";
import Listing from "../models/AddListingModel.js";

const router = express.Router();

// Middleware to validate homeType
const validateHomeType = (req, res, next) => {
  const validTypes = ['Single Family', 'Multi Family', 'Apartment', 'Land', 'Other'];
  if (req.body.homeType && !validTypes.includes(req.body.homeType)) {
    return res.status(400).json({
      message: "Invalid home type",
      validTypes: validTypes
    });
  }
  next();
};

// Middleware to clean request body based on homeType
const cleanRequestBody = (req, res, next) => {
  if (req.body.homeType === 'Land') {
    delete req.body.bedrooms;
    delete req.body.attachedBathrooms;
    delete req.body.detachedBathrooms;
    delete req.body.floors;
    delete req.body.houseArea;
    delete req.body.parking;
    delete req.body.buildYear;
  } else if (req.body.homeType === 'Apartment') {
    delete req.body.landArea;
  }
  next();
};

// Get all listings
router.get("/getallListing", getAllListings);

// Get listings by user email
router.get("/user/:email", getUserListings);

// Get a single listing by ID
router.get("/:id", getSingleListing);

// Add a new listing
router.post("/", validateHomeType, cleanRequestBody, addListing);

// Update a listing by ID
router.put("/:id", validateHomeType, cleanRequestBody, updateListing);

// Update listing status
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!updatedListing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    
    res.status(200).json(updatedListing);
  } catch (error) {
    console.error('Error updating listing status:', error);
    res.status(500).json({ 
      message: "Failed to update listing status", 
      error: error.message 
    });
  }
});

// Delete a listing by ID
router.delete("/:id", deleteListing);

export default router;
