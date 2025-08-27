"use client";

import React, { useState, useEffect } from "react";
import {
  FaBell,
  FaUserCircle,
  FaCheck,
  FaTimes,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMapMarkerAlt,
} from "react-icons/fa";
import axios from "axios";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";

function DBMainContentApproveAdds() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedListing, setSelectedListing] = useState(null);
  const [center, setCenter] = useState({ lat: 6.9271, lng: 79.8612 }); // Default to Colombo
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredListings, setFilteredListings] = useState([]);
  const [typeFilter, setTypeFilter] = useState("all");

  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  // Fetch listings from backend
  const fetchListings = async () => {
    try {
      // Fetch both sale and rent listings
      const [saleResponse, rentResponse] = await Promise.all([
        axios.get("http://localhost:3000/api/listing/getallListing"),
        axios.get("http://localhost:3000/api/Rentroutes/getAllRentListing"),
      ]);

      // Filter for pending listings from both sources
      const pendingSaleListings = saleResponse.data.filter(
        (listing) => listing.status === "pending" || !listing.status
      );
      const pendingRentListings = rentResponse.data.filter(
        (listing) => listing.status === "pending" || !listing.status
      );

      // Add type field to distinguish between sale and rent
      const saleListingsWithType = pendingSaleListings.map((listing) => ({
        ...listing,
        type: "sale",
      }));
      const rentListingsWithType = pendingRentListings.map((listing) => ({
        ...listing,
        type: "rent",
      }));

      const allPendingListings = [
        ...saleListingsWithType,
        ...rentListingsWithType,
      ];

      setListings(allPendingListings);
      setFilteredListings(allPendingListings); // Initialize filtered listings

      // If we have listings, center the map on the first one
      if (
        allPendingListings.length > 0 &&
        allPendingListings[0].lat &&
        allPendingListings[0].lng
      ) {
        setCenter({
          lat: allPendingListings[0].lat,
          lng: allPendingListings[0].lng,
        });
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching listings:", error);
      setError("Failed to fetch listings");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
    // Refresh data every 30 seconds
    const interval = setInterval(fetchListings, 30000);
    return () => clearInterval(interval);
  }, []);

  // Apply filters when listings change
  useEffect(() => {
    applyFilters(searchTerm, typeFilter);
  }, [listings]);

  // Map options
  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: true,
    streetViewControl: true,
    rotateControl: true,
    fullscreenControl: true,
  };

  // Map container style
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  // Handle marker click
  const handleMarkerClick = (listing) => {
    setSelectedListing(listing);
  };

  // Handle info window close
  const handleInfoWindowClose = () => {
    setSelectedListing(null);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    applyFilters(term, typeFilter);
  };

  // Handle type filter change
  const handleTypeFilterChange = (type) => {
    setTypeFilter(type);
    applyFilters(searchTerm, type);
  };

  // Apply both search and type filters
  const applyFilters = (searchTerm, typeFilter) => {
    let filtered = listings;

    // Apply type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter((listing) => listing.type === typeFilter);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (listing) =>
          listing.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          listing.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          listing.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (listing.title &&
            listing.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
          listing.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredListings(filtered);
  };

  const handleApprove = async (listingId, type) => {
    try {
      if (type === "rent") {
        await axios.post("http://localhost:3000/api/approveRent", {
          listingId,
        });
      } else {
        await axios.post("http://localhost:3000/api/approve", { listingId });
      }
      fetchListings(); // Refresh listings after approval
    } catch (error) {
      console.error("Error approving listing:", error);
      alert("Failed to approve listing. Please try again.");
    }
  };

  // Handle Reject button click
  const handleReject = async (listingId, type) => {
    try {
      if (type === "rent") {
        await axios.put(
          `http://localhost:3000/api/Rentroutes/${listingId}/status`,
          { status: "rejected" }
        );
      } else {
        await axios.put(
          `http://localhost:3000/api/listing/${listingId}/status`,
          { status: "rejected" }
        );
      }
      fetchListings(); // Refresh listings after rejection
    } catch (error) {
      console.error("Error rejecting listing:", error);
      alert("Failed to reject listing. Please try again.");
    }
  };

  return (
    <div className="flex-1 bg-gray-100">
      {/* Navbar */}
      <div className="p-4 flex flex-col gap-4 items-center text-white">
        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Enter an address, city, district, province"
            className="p-2 border rounded-md w-96 text-black border-[#3b50df] rounded-[50px]"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleTypeFilterChange("all")}
            className={`px-4 py-2 rounded-md transition-all duration-300 ${
              typeFilter === "all"
                ? "bg-[#3B50DF] text-white"
                : "bg-gray-600 text-white hover:bg-gray-700"
            }`}
          >
            All
          </button>
          <button
            onClick={() => handleTypeFilterChange("sale")}
            className={`px-4 py-2 rounded-md transition-all duration-300 ${
              typeFilter === "sale"
                ? "bg-green-600 text-white"
                : "bg-gray-600 text-white hover:bg-gray-700"
            }`}
          >
            Sale
          </button>
          <button
            onClick={() => handleTypeFilterChange("rent")}
            className={`px-4 py-2 rounded-md transition-all duration-300 ${
              typeFilter === "rent"
                ? "bg-blue-600 text-white"
                : "bg-gray-600 text-white hover:bg-gray-700"
            }`}
          >
            Rent
          </button>
        </div>
      </div>

      {/* Dashboard */}
      <div className="p-10">
        <h3 className="text-2xl font-bold mb-6">Pending Approvals</h3>

        {loading ? (
          <div className="text-center py-10 text-gray-600">
            Loading listings...
          </div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">{error}</div>
        ) : filteredListings.length === 0 ? (
          <div className="text-center py-10 text-gray-600">
            No listings available matching your search.
          </div>
        ) : (
          <>
            {/* Listing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredListings.map((listing) => (
                <div
                  key={listing._id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={
                        listing.images?.[0] ||
                        "/images/placeholder-property.jpg"
                      }
                      alt={listing.title || listing.address}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-xl font-semibold mb-2 transition-colors duration-300 group-hover:text-[#3B50DF]">
                      {listing.title || listing.address}
                    </h4>
                    <p className="text-gray-600 mb-2">{listing.description}</p>
                    <div className="flex items-center text-gray-600 mb-2 transition-colors duration-300 group-hover:text-gray-700">
                      <FaMapMarkerAlt className="mr-2 transition-colors duration-300 group-hover:text-[#3B50DF]" />
                      {listing.address}
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-bold text-[#3B50DF] transition-all duration-300 group-hover:text-2xl">
                        {listing.type === "rent"
                          ? `Rs. ${
                              listing.monthlyRent || listing.price || "N/A"
                            }/month`
                          : `Rs. ${listing.price || "N/A"}`}
                      </span>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm transition-all duration-300 group-hover:bg-yellow-200 group-hover:px-4">
                          {listing.status || "Pending"}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-sm text-white ${
                            listing.type === "rent"
                              ? "bg-blue-500"
                              : "bg-green-500"
                          }`}
                        >
                          {listing.type === "rent" ? "Rent" : "Sale"}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-4 mb-4">
                      {listing.bedrooms && (
                        <div className="flex items-center text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                          <FaBed className="mr-2 transition-colors duration-300 group-hover:text-[#3B50DF]" />
                          {listing.bedrooms} Beds
                        </div>
                      )}
                      {listing.attachedBathrooms && (
                        <div className="flex items-center text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                          <FaBath className="mr-2 transition-colors duration-300 group-hover:text-[#3B50DF]" />
                          {listing.attachedBathrooms} Baths
                        </div>
                      )}
                      <div className="flex items-center text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                        <FaRulerCombined className="mr-2 transition-colors duration-300 group-hover:text-[#3B50DF]" />
                        {listing.houseArea || listing.landArea} sq ft
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(listing._id, listing.type)}
                        className="flex-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                      >
                        <FaCheck className="mr-2" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(listing._id, listing.type)}
                        className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                      >
                        <FaTimes className="mr-2" />
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Section */}
            {isLoaded && (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-4">
                  <h4 className="text-xl font-semibold mb-4">
                    Property Locations
                  </h4>
                  <div className="w-full h-[400px] rounded-lg overflow-hidden">
                    <GoogleMap
                      mapContainerStyle={mapContainerStyle}
                      center={center}
                      zoom={10}
                      options={mapOptions}
                    >
                      {filteredListings.map((listing) =>
                        listing.lat && listing.lng ? (
                          <Marker
                            key={listing._id}
                            position={{ lat: listing.lat, lng: listing.lng }}
                            icon={{
                              url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                              scaledSize: new window.google.maps.Size(40, 40),
                            }}
                            title={listing.address}
                            onClick={() => handleMarkerClick(listing)}
                          />
                        ) : null
                      )}

                      {selectedListing && (
                        <InfoWindow
                          position={{
                            lat: selectedListing.lat,
                            lng: selectedListing.lng,
                          }}
                          onCloseClick={handleInfoWindowClose}
                        >
                          <div className="p-2 max-w-xs">
                            <h3 className="font-bold text-lg">
                              {selectedListing.address}
                            </h3>
                            <p className="text-sm">
                              {selectedListing.city}, {selectedListing.district}
                            </p>
                            {selectedListing.price && (
                              <p className="text-sm font-semibold">
                                Price: Rs.{" "}
                                {selectedListing.price.toLocaleString()}
                              </p>
                            )}
                            {selectedListing.homeType && (
                              <p className="text-sm">
                                Type: {selectedListing.homeType}
                              </p>
                            )}
                            {selectedListing.bedrooms && (
                              <p className="text-sm">
                                Bedrooms: {selectedListing.bedrooms}
                              </p>
                            )}
                          </div>
                        </InfoWindow>
                      )}
                    </GoogleMap>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default DBMainContentApproveAdds;
