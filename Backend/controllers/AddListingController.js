import Listing from "../models/AddListingModel.js";

// Get all listings
export const getAllListings = async (req, res) => {
  try {
    // Add query parameters for filtering
    const query = {};

    // Only get approved listings
    query.status = "approved";

    console.log("Fetching listings with query:", query);

    const listings = await Listing.find(query)
      .select("-__v") // Exclude version field
      .lean(); // Convert to plain JavaScript objects

    console.log("Found listings:", listings.length);
    console.log(
      "Listing statuses:",
      listings.map((l) => l.status)
    );

    // Transform the data to ensure all required fields are present
    const transformedListings = listings.map((listing) => ({
      ...listing,
      bedrooms: listing.bedrooms || 0,
      attachedBathrooms: listing.attachedBathrooms || 0,
      detachedBathrooms: listing.detachedBathrooms || 0,
      houseArea: listing.houseArea || 0,
      landArea: listing.landArea || 0,
      price: listing.price || 0,
      address: listing.address || "Address not provided",
      city: listing.city || "City not provided",
      district: listing.district || "District not provided",
      homeType: listing.homeType || "Other",
      images: listing.images || [],
    }));

    res.status(200).json(transformedListings);
  } catch (error) {
    console.error("Error in getAllListings:", error);
    res.status(500).json({
      error: "Failed to fetch listings",
      message: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

// Get listings for a specific user by email
export const getUserListings = async (req, res) => {
  try {
    const listings = await Listing.find({ email: req.params.email });
    res.status(200).json(listings);
  } catch (error) {
    console.error("Error in getUserListings:", error);
    res.status(500).json({
      error: "Failed to fetch user listings",
      message: error.message,
    });
  }
};

export const addListing = async (req, res) => {
  try {
    // Debug: log incoming data
    console.log("Received listing data:", JSON.stringify(req.body));

    // Get image URLs from the uploaded files
    const imageUrls = req.files ? req.files.map((file) => file.path) : [];

    // Create new listing with image URLs
    const newListing = new Listing({
      ...req.body,
      images: imageUrls,
    });

    const savedListing = await newListing.save();
    res.status(201).json(savedListing);
  } catch (error) {
    console.error("Error in addListing:", error);
    res.status(500).json({
      message: "Failed to add listing",
      error: error.message,
    });
  }
};

export const getSingleListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.status(200).json(listing);
  } catch (error) {
    console.error("Error in getSingleListing:", error);
    res.status(500).json({
      message: "Failed to fetch listing",
      error: error.message,
    });
  }
};

export const updateListing = async (req, res) => {
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedListing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.status(200).json(updatedListing);
  } catch (error) {
    console.error("Error in updateListing:", error);
    res.status(500).json({
      message: "Failed to update listing",
      error: error.message,
    });
  }
};

export const deleteListing = async (req, res) => {
  try {
    const deletedListing = await Listing.findByIdAndDelete(req.params.id);
    if (!deletedListing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    console.error("Error in deleteListing:", error);
    res.status(500).json({
      message: "Failed to delete listing",
      error: error.message,
    });
  }
};
