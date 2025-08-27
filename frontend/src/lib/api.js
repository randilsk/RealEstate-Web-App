import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

// Fetch all listings
export const fetchAllListings = async () => {
  try {
    console.log(
      "Making API request to:",
      `${API_BASE_URL}/approve/getAllApprove`
    );
    const response = await axios.get(`${API_BASE_URL}/approve/getAllApprove`);
    console.log("API response status:", response.status);
    console.log("API response headers:", response.headers);

    if (!response.data) {
      console.error("No data received from server");
      throw new Error("No data received from server");
    }

    console.log("API response data type:", typeof response.data);
    console.log(
      "API response data length:",
      Array.isArray(response.data) ? response.data.length : "Not an array"
    );
    console.log("First listing sample:", response.data[0]);

    return response.data;
  } catch (error) {
    console.error("Error fetching listings:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
      throw new Error(
        error.response.data.message || "Failed to fetch listings"
      );
    } else if (error.request) {
      console.error("No response received:", error.request);
      console.error("Request details:", {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers,
      });
      throw new Error("No response from server");
    } else {
      console.error("Request setup error:", error.message);
      throw new Error(error.message || "Error setting up request");
    }
  }
};

// Fetch listings by user email
export const fetchUserListings = async (email) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/listing/user/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user listings:", error);
    throw error;
  }
};

// Fetch a single listing by ID
export const fetchSingleListing = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/listing/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching single listing:", error);
    throw error;
  }
};

export const fetchAllRentListings = async () => {
  try {
    console.log(
      "Making API request to:",
      `${API_BASE_URL}/approveRent/getAllApprovedRent`
    );
    const response = await axios.get(
      `${API_BASE_URL}/approveRent/getAllApprovedRent`
    );

    if (!response.data) {
      console.error("No approved rent data received from server");
      throw new Error("No approved rent data received from server");
    }

    console.log("=== RENT LISTINGS API DEBUG ===");
    console.log(
      "Rent listings count:",
      Array.isArray(response.data) ? response.data.length : "Not an array"
    );
    console.log("Response data type:", typeof response.data);

    if (Array.isArray(response.data) && response.data.length > 0) {
      const firstListing = response.data[0];
      console.log("First rent listing full object:", firstListing);
      console.log("First rent listing keys:", Object.keys(firstListing));

      // Check all image-related fields
      console.log("--- IMAGE FIELDS CHECK ---");
      console.log("images field:", firstListing.images);
      console.log("images type:", typeof firstListing.images);
      console.log("images is array:", Array.isArray(firstListing.images));
      console.log("images length:", firstListing.images?.length || 0);

      if (firstListing.images && firstListing.images.length > 0) {
        console.log("First image URL:", firstListing.images[0]);
        console.log("All image URLs:", firstListing.images);
      }

      // Check price fields
      console.log("--- PRICE FIELDS CHECK ---");
      console.log("price field:", firstListing.price);
      console.log("monthlyRent field:", firstListing.monthlyRent);

      // Check other important fields
      console.log("--- OTHER FIELDS CHECK ---");
      console.log("_id:", firstListing._id);
      console.log("address:", firstListing.address);
      console.log("district:", firstListing.district);
      console.log("homeType:", firstListing.homeType);
      console.log("bedrooms:", firstListing.bedrooms);

      // Test if image URLs are accessible
      if (firstListing.images && firstListing.images.length > 0) {
        const testUrl = firstListing.images[0];
        console.log("--- IMAGE URL TEST ---");
        console.log("Testing image URL:", testUrl);

        // Try to construct full URL if needed
        let fullUrl = testUrl;
        if (!testUrl.startsWith("http://") && !testUrl.startsWith("https://")) {
          fullUrl = `http://localhost:3000/${testUrl.replace(/^\//, "")}`;
          console.log("Constructed full URL:", fullUrl);
        }
      }
    } else {
      console.log("No rent listings found or response is not an array");
    }

    console.log("=== END RENT LISTINGS DEBUG ===");

    return response.data;
  } catch (error) {
    console.error("Error fetching rent listings:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
      throw new Error(
        error.response.data.message || "Failed to fetch rent listings"
      );
    } else if (error.request) {
      console.error("No response received:", error.request);
      console.error("Request details:", {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers,
      });
      throw new Error("No response from server");
    } else {
      console.error("Request setup error:", error.message);
      throw new Error(error.message || "Error setting up request");
    }
  }
};
