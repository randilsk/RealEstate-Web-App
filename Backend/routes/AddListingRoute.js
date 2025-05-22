import express from "express";
import {
  getAllListings,
  getUserListings,
  addListing,
  // Import the new controller function
  updateListing, // Import the new controller function
  deleteListing, // Import the new controller function
  getPendingApprovals,
  approveListing,
} from "../controllers/AddListingController.js";

const router = express.Router();

// Get all listings
router.get("/getallListing", getAllListings);

// Get listings by user email
router.get("/user/:email", getUserListings);



// Add a new listing
router.post("/", addListing);

// Update a listing by ID
router.put("/:id", updateListing);

// Delete a listing by ID
router.delete("/:id", deleteListing);

//approve
router.get('/pending-approvals', getPendingApprovals);
router.put('/approve/:id', approveListing);

export default router;
