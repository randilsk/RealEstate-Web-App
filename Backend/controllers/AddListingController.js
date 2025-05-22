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

export const addListing = async (req, res) => {
  try {
    const newListing = new Listing(req.body); // Create a new listing from the request body
    const savedListing = await newListing.save(); // Save it to the database
    res.status(201).json(savedListing); // Respond with the saved listing
  } catch (error) {
    res.status(500).json({ message: "Failed to add listing", error });
  }
};



export const updateListing = async (req, res) => {
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id, // Find listing by ID
      req.body, // Update with request body
      { new: true } // Return the updated document
    );
    if (!updatedListing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.status(200).json(updatedListing);
  } catch (error) {
    res.status(500).json({ message: "Failed to update listing", error });
  }
};

export const deleteListing = async (req, res) => {
  try {
    const deletedListing = await Listing.findByIdAndDelete(req.params.id); // Find and delete listing by ID
    if (!deletedListing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete listing", error });
  }
};



// GET pending approvals
export const getPendingApprovals = async (req, res) => {
  try {
    const listings = await Listing.find(); // or { approved: { $ne: true } }
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch pending approvals" });
  }
};

export const approveListing = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedListing = await Listing.findByIdAndUpdate(
      id,
      { approved: true },
      { new: true }
    );

    if (!updatedListing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.status(200).json({ message: "Listing approved", updatedListing });
  } catch (error) {
    res.status(500).json({ message: "Failed to approve listing", error });
  }
};





