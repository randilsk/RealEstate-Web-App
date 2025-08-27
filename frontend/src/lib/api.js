import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

// Fetch all listings
export const fetchAllListings = async () => {
  try {
    console.log('Making API request to:', `${API_BASE_URL}/approve/getAllApprove`);
    const response = await axios.get(`${API_BASE_URL}/approve/getAllApprove`);
    console.log('API response status:', response.status);
    console.log('API response headers:', response.headers);
    
    if (!response.data) {
      console.error('No data received from server');
      throw new Error('No data received from server');
    }
    
    console.log('API response data type:', typeof response.data);
    console.log('API response data length:', Array.isArray(response.data) ? response.data.length : 'Not an array');
    console.log('First listing sample:', response.data[0]);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching listings:", error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
      throw new Error(error.response.data.message || 'Failed to fetch listings');
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
      console.error("Request details:", {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers
      });
      throw new Error('No response from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Request setup error:", error.message);
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

export const fetchAllRentListings = async () => {
  try {
    console.log('Making API request to:', `${API_BASE_URL}/Rentroutes/getAllRentListing`);
    const response = await axios.get(`${API_BASE_URL}/Rentroutes/getAllRentListing`);

    if (!response.data) {
      console.error('No rent data received from server');
      throw new Error('No rent data received from server');
    }

    console.log('Rent listings count:', Array.isArray(response.data) ? response.data.length : 'Not an array');
    console.log('First rent listing sample:', response.data[0]);

    return response.data;
  } catch (error) {
    console.error("Error fetching rent listings:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
      throw new Error(error.response.data.message || 'Failed to fetch rent listings');
    } else if (error.request) {
      console.error("No response received:", error.request);
      console.error("Request details:", {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers
      });
      throw new Error('No response from server');
    } else {
      console.error("Request setup error:", error.message);
      throw new Error(error.message || 'Error setting up request');
    }
  }
};