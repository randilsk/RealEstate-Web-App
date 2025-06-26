import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

// Fetch all listings
export const fetchAllListings = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/approve/getAllApprove`);
    if (!response.data) {
      throw new Error('No data received from server');
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching listings:", error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      throw new Error(error.response.data.message || 'Failed to fetch listings');
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
      throw new Error('No response from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(error.message || 'Error setting up request');
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
