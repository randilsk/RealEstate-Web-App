import ApprovedListing from "../models/ApprovedListModel.js";

// Get all listings
export const getAllApprovedListings = async (req, res) => {
  try {
    // Add query parameters for filtering
    const query = {};

    // Remove the status filter to get all listings
    // query.status = "approved";

    console.log("Fetching Approved listings with query:", query);

    const approvedlistings = await ApprovedListing.find(query)
      .select("-__v") // Exclude version field
      .lean(); // Convert to plain JavaScript objects

    console.log("Found listings:", approvedlistings.length);
    console.log(
      "Approved Listing statuses:",
      approvedlistings.map((l) => l.status) // ✅ Fixed: was 'listings'
    );

    // Transform the data to ensure all required fields are present
    const transformedApprovedListings = approvedlistings.map((approvedListing) => ({
      ...approvedListing, // ✅ Fixed: was 'listing'
      bedrooms: approvedListing.bedrooms || 0,
      attachedBathrooms: approvedListing.attachedBathrooms || 0,
      detachedBathrooms: approvedListing.detachedBathrooms || 0,
      houseArea: approvedListing.houseArea || 0,
      landArea: approvedListing.landArea || 0,
      price: approvedListing.price || 0,
      address: approvedListing.address || "Address not provided",
      city: approvedListing.city || "City not provided",
      district: approvedListing.district || "District not provided",
      homeType: approvedListing.homeType || "Other",
      images: approvedListing.images || [],
      status: approvedListing.status,
    }));

    res.status(200).json(transformedApprovedListings);
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
export const getApprovedListings = async (req, res) => {
  try {
    const approvedlistings = await ApprovedListing.find({ email: req.params.email }); // ✅ Fixed: was 'ApprovedListingL'
    res.status(200).json(approvedlistings);
  } catch (error) {
    console.error("Error in getApprovedListings:", error);
    res.status(500).json({
      error: "Failed to fetch Approved listings",
      message: error.message,
    });
  }
};

export const addApprovedListing = async (req, res) => {
  try {
    console.log("Received Approved listing data:", JSON.stringify(req.body, null, 2));

    // Clean up the request body based on homeType
    const listingApprovedData = { ...req.body };

    // Remove fields that shouldn't be present for certain homeTypes
    if (listingApprovedData.homeType === "Land") {
      delete listingApprovedData.bedrooms;
      delete listingApprovedData.attachedBathrooms;
      delete listingApprovedData.detachedBathrooms;
      delete listingApprovedData.floors;
      delete listingApprovedData.houseArea;
      delete listingApprovedData.parking;
      delete listingApprovedData.buildYear;
    } else if (listingApprovedData.homeType === "Apartment") {
      delete listingApprovedData.landArea;
    }

    console.log("Cleaned approved listing data:", JSON.stringify(listingApprovedData, null, 2));

    const newApprovedListing = new ApprovedListing(listingApprovedData); // ✅ Fixed: was 'ApprovedData'
    console.log("Created new Approved listing instance:", newApprovedListing);

    const savedListing = await newApprovedListing.save(); // ✅ Fixed: was 'newListing'
    console.log("Successfully saved listing:", savedListing);

    res.status(201).json(savedListing);
  } catch (error) {
    console.error("Error in addListing:", error);
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);

    if (error.name === "ValidationError") {
      // Handle validation errors
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      console.error("Validation errors:", validationErrors);
      return res.status(400).json({
        message: "Validation failed",
        errors: validationErrors,
      });
    }
    res.status(500).json({
      message: "Failed to add Approved listing",
      error: error.message,
      errorName: error.name,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

export const getSingleApprovedListing = async (req, res) => {
  try {
    const approvedListing = await ApprovedListing.findById(req.params.id);
    if (!approvedListing) {
      return res.status(404).json({ message: "Approved Listing not found" });
    }
    res.status(200).json(approvedListing);
  } catch (error) {
    console.error("Error in getSingle Approved Listing:", error);
    res.status(500).json({
      message: "Failed to fetch listing",
      error: error.message,
    });
  }
};

export const updateApprovedListing = async (req, res) => {
  try {
    const updatedApprovedListing = await ApprovedListing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedApprovedListing) {
      return res.status(404).json({ message: "Approved Listing not found" });
    }
    res.status(200).json(updatedApprovedListing);
  } catch (error) {
    console.error("Error in update Approved Listing:", error);
    res.status(500).json({
      message: "Failed to update the listing",
      error: error.message,
    });
  }
};

export const deleteApprovedListing = async (req, res) => {
  try {
    const deletedapprovedListing = await ApprovedListing.findByIdAndDelete(req.params.id);
    if (!deletedapprovedListing) {
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

export const updateApprovedListingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedApprovedListing = await ApprovedListing.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedApprovedListing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.status(200).json(updatedApprovedListing);
  } catch (error) {
    console.error("Error updating listing status:", error);
    res.status(500).json({
      message: "Failed to update listing status",
      error: error.message,
    });
  }
};