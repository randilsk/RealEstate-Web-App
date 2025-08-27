import express from "express";

import {
  getAllRentListings,
  getUserRentListings,
  addRentListing,
  getSingleRentListing,
  updateRentListing,
  deleteRentListing,
  updateRentListingStatus,
} from "../controllers/rentcontroller.js";
import { uploadMultiple } from "../middleware/upload.midlware.js";

const router = express.Router();

// Get all listings
router.get("/getAllRentListing", getAllRentListings);

// Get listings by user email
router.get("/user/:email", getUserRentListings);

// Get a single listing by ID
router.get("/:id", getSingleRentListing);

// Add a new listing with image upload
router.post("/", uploadMultiple, addRentListing);

// Update a listing by ID
router.put("/:id", updateRentListing);

// Update listing status
router.put("/:id/status", updateRentListingStatus);

// Delete a listing by ID
router.delete("/:id", deleteRentListing);

router.put("/listing/:id", updateRentListing); // Ensure this line exists and is correct
// ...
export default router;
