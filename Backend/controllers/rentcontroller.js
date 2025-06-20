import RentListing from "../models/rentModels.js ";

// Get all listings
export const getAllRentListings = async (req, res) => {
  try {
    const rentlistings = await RentListing.find();
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch listings", details: error });
  }
};

// Get listings for a specific user by email
export const getUserRentListings = async (req, res) => {
  try {
    const rentlistings = await RentListing.find({ email: req.params.email });
    res.status(200).json(listings);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch user listings", details: error });
  }
};

export const addRentListing = async (req, res) => {
  try {
    // Get image URLs from the uploaded files
    const imageUrls = req.files ? req.files.map(file => file.path) : [];
    
    // Create new listing with image URLs
    const newListing = new RentListingListing({
      ...req.body,
      images: imageUrls
    });
    
    const savedRentListing = await newRentListing.save();
    res.status(201).json(savedRentListing);
  } catch (error) {
    console.error("Error in addListing:", error);
    res.status(500).json({ 
      message: "Failed to add listing", 
      error: error.message 
    });
  }
};

export const getSingleRentListing = async (req, res) => {
  try {
    const rentlisting = await RentListing.findById(req.params.id); // Find listing by ID
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch listing", error });
  }
};

export const updateRentListing = async (req, res) => {
  try {
    const updatedRentListing = await RentListing.findByIdAndUpdate(
      req.params.id, // Find listing by ID
      req.body, // Update with request body
      { new: true } // Return the updated document
    );
    if (!updatedRentListing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.status(200).json(updatedRentListing);
  } catch (error) {
    res.status(500).json({ message: "Failed to update listing", error });
  }
};

export const deleteRentListing = async (req, res) => {
  try {
    const deletedRentListing = await RentListing.findByIdAndDelete(req.params.id); // Find and delete listing by ID
    if (!deletedRentListing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete listing", error });
  }
};
