import express from "express";
import {
  getAllListings,
  getUserListings,
  addListing,
  getSingleListing, // Import the new controller function
  updateListing, // Import the new controller function
  deleteListing, // Import the new controller function
} from "../controllers/AddListingController.js";

const router = express.Router();

// Get all listings
router.get("/", getAllListings);

// Get listings by user email
router.get("/user/:email", getUserListings);

// Get a single listing by ID
router.get("/:id", getSingleListing);

// Add a new listing
router.post("/", addListing);

// Update a listing by ID
router.put("/:id", updateListing);

// Delete a listing by ID
router.delete("/:id", deleteListing);

export default router;
