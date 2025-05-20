import express from "express";
import {
  getAllListings,
  getUserListings,
  addListing,

  updateListing, 
  deleteListing, 
} from "../controllers/AddListingController.js";

const router = express.Router();

// Get all listings
router.get("/", getAllListings);

router.get("/user/:email", getUserListings);




router.post("/", addListing);


router.put("/:id", updateListing);


router.delete("/:id", deleteListing);

export default router;
