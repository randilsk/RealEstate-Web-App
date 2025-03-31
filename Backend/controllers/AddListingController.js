import Listing from "../models/AddListingModel.js";

// Get all listings
export const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find();
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch listings", details: error });
  }
};

// Get listings for a specific user by email
export const getUserListings = async (req, res) => {
  try {
    const listings = await Listing.find({ email: req.params.email });
    res.status(200).json(listings);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch user listings", details: error });
  }
};
