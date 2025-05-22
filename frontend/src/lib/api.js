import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

// Fetch all listings
export const fetchAllListings = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/listing/getallListing`);
    return response.data;
  } catch (error) {
    console.error("Error fetching listings:", error);
    throw error;
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

//fetch approve adds
export const fetchPendingListings = async () => {
  const res = await fetch(`${API_BASE}/approval/pending-approvals`, {
    credentials: "include",
  });
  return res.json();
};

export const approveListing = async (id) => {
  const res = await fetch(`${API_BASE}/approval/approve/${id}`, {
    method: "PUT",
    credentials: "include",
  });
  return res.json();
};
