import express from "express";
import {
  getAllListings,
  getUserListings,
} from "../controllers/AddListingController.js";

const router = express.Router();

// Get all listings
router.get("/", getAllListings);

// Get listings by user email
router.get("/user/:email", getUserListings);

export default router;
