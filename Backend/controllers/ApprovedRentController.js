import ApprovedRent from "../models/ApprovedRentModel.js";
import RentListing from "../models/rentModels.js";

// Get all approved rent listings
export const getAllApprovedRentListings = async (req, res) => {
  try {
    const approvedRentListings = await ApprovedRent.find({ status: "approved" })
      .select("-__v")
      .lean();

    console.log("Found approved rent listings:", approvedRentListings.length);

    // Transform the data to ensure all required fields are present
    const transformedApprovedRentListings = approvedRentListings.map(
      (approvedRentListing) => ({
        ...approvedRentListing,
        bedrooms: approvedRentListing.bedrooms || 0,
        attachedBathrooms: approvedRentListing.attachedBathrooms || 0,
        detachedBathrooms: approvedRentListing.detachedBathrooms || 0,
        houseArea: approvedRentListing.houseArea || 0,
        landArea: approvedRentListing.landArea || 0,
        monthlyRent: approvedRentListing.monthlyRent || 0,
        address: approvedRentListing.address || "Address not provided",
        city: approvedRentListing.city || "City not provided",
        district: approvedRentListing.district || "District not provided",
        homeType: approvedRentListing.homeType || "Other",
        images: approvedRentListing.images || [],
        status: approvedRentListing.status,
      })
    );

    res.status(200).json(transformedApprovedRentListings);
  } catch (error) {
    console.error("Error in getAllApprovedRentListings:", error);
    res.status(500).json({
      error: "Failed to fetch approved rent listings",
      message: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

// Get approved rent listings for a specific user by email
export const getApprovedRentListings = async (req, res) => {
  try {
    const approvedRentListings = await ApprovedRent.find({
      email: req.params.email,
      status: "approved",
    });
    res.status(200).json(approvedRentListings);
  } catch (error) {
    console.error("Error in getApprovedRentListings:", error);
    res.status(500).json({
      error: "Failed to fetch approved rent listings",
      message: error.message,
    });
  }
};

// Add a rent listing to approved list
export const addApprovedRentListing = async (req, res) => {
  try {
    const { listingId } = req.body;
    if (!listingId) {
      return res.status(400).json({ message: "listingId is required" });
    }

    // Fetch the rent listing from RentListing
    const rentListing = await RentListing.findById(listingId).lean();
    if (!rentListing) {
      return res.status(404).json({ message: "Rent listing not found" });
    }

    // Prepare data for ApprovedRent (remove _id and status)
    const { _id, status, ...approvedData } = rentListing;
    approvedData.listingId = listingId; // keep reference to original
    approvedData.status = "approved";

    // Create new ApprovedRent
    const newApprovedRentListing = new ApprovedRent(approvedData);
    const savedListing = await newApprovedRentListing.save();

    // Delete the original listing from RentListing
    await RentListing.findByIdAndDelete(listingId);

    res.status(201).json(savedListing);
  } catch (error) {
    console.error("Error in addApprovedRentListing:", error);
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({
        message: "Validation failed",
        errors: validationErrors,
      });
    }
    res.status(500).json({
      message: "Failed to add approved rent listing",
      error: error.message,
      errorName: error.name,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

// Get a single approved rent listing by ID
export const getSingleApprovedRentListing = async (req, res) => {
  try {
    const approvedRentListing = await ApprovedRent.findById(req.params.id);
    if (!approvedRentListing) {
      return res
        .status(404)
        .json({ message: "Approved rent listing not found" });
    }
    res.status(200).json(approvedRentListing);
  } catch (error) {
    console.error("Error in getSingleApprovedRentListing:", error);
    res.status(500).json({
      message: "Failed to fetch approved rent listing",
      error: error.message,
    });
  }
};

// Update an approved rent listing by ID
export const updateApprovedRentListing = async (req, res) => {
  try {
    const updatedApprovedRentListing = await ApprovedRent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedApprovedRentListing) {
      return res
        .status(404)
        .json({ message: "Approved rent listing not found" });
    }
    res.status(200).json(updatedApprovedRentListing);
  } catch (error) {
    console.error("Error in updateApprovedRentListing:", error);
    res.status(500).json({
      message: "Failed to update the approved rent listing",
      error: error.message,
    });
  }
};

// Delete an approved rent listing by ID
export const deleteApprovedRentListing = async (req, res) => {
  try {
    const deletedApprovedRentListing = await ApprovedRent.findByIdAndDelete(
      req.params.id
    );
    if (!deletedApprovedRentListing) {
      return res
        .status(404)
        .json({ message: "Approved rent listing not found" });
    }
    res
      .status(200)
      .json({ message: "Approved rent listing deleted successfully" });
  } catch (error) {
    console.error("Error in deleteApprovedRentListing:", error);
    res.status(500).json({
      message: "Failed to delete approved rent listing",
      error: error.message,
    });
  }
};

// Update approved rent listing status
export const updateApprovedRentListingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedApprovedRentListing = await ApprovedRent.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedApprovedRentListing) {
      return res
        .status(404)
        .json({ message: "Approved rent listing not found" });
    }

    res.status(200).json(updatedApprovedRentListing);
  } catch (error) {
    console.error("Error updating approved rent listing status:", error);
    res.status(500).json({
      message: "Failed to update approved rent listing status",
      error: error.message,
    });
  }
};
