import express from "express";
import {
  getAllApprovedRentListings,
  getApprovedRentListings,
  addApprovedRentListing,
  getSingleApprovedRentListing,
  updateApprovedRentListing,
  deleteApprovedRentListing,
  updateApprovedRentListingStatus,
} from "../controllers/ApprovedRentController.js";

const router = express.Router();

// Get all approved rent listings
router.get("/getAllApprovedRent", getAllApprovedRentListings);

// Get approved rent listings for a specific user by email
router.get("/user/:email", getApprovedRentListings);

// Get a single approved rent listing by ID
router.get("/:id", getSingleApprovedRentListing);

// Add a rent listing to approved list
router.post("/", addApprovedRentListing);

// Update an approved rent listing by ID
router.put("/:id", updateApprovedRentListing);

// Update approved rent listing status
router.patch("/:id/status", updateApprovedRentListingStatus);

// Delete an approved rent listing by ID
router.delete("/:id", deleteApprovedRentListing);

export default router;
