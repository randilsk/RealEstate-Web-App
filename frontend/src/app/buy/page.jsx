"use client";
import React, { useState, useEffect } from "react";
import Header_varient_1 from "../../components/Header_varient_1.jsx";
import MapSection from "../../components/BuyPageContent/MapSection.jsx";
import CardSection from "../../components/BuyPageContent/CardSection.jsx";
import { fetchAllListings } from "@/lib/api";
import { useSearchParams } from "next/navigation";

function page() {
  const [isCardSectionOpen, setIsCardSectionOpen] = useState(false);
  const [listings, setListings] = useState([]); // stores data from the backend
  const [filteredListings, setFilteredListings] = useState([]); //hold current displayed listings
  const [isFiltered, setIsFiltered] = useState(false); // Track if filtering is active
  const [searchArea, setSearchArea] = useState(null); // Lifted search area state
  const searchParams = useSearchParams();

  useEffect(() => {
    const getListings = async () => {
      try {
        const data = await fetchAllListings();
        console.log("Fetched listings:", data);
        console.log("Sample listing district:", data[0]?.district);
        setListings(data);
        setFilteredListings(data); // Default: show all
      } catch (err) {
        setListings([]);
        setFilteredListings([]);
      }
    };
    getListings();
  }, []);

  // Haversine formula to filter listings within a radius
  const filterListingsByLocation = (lat, lng, radius = 5) => {
    const R = 6371; // Earth's radius in km
    const filtered = listings.filter((listing) => {
      if (!listing.lat || !listing.lng) return false;
      const dLat = ((listing.lat - lat) * Math.PI) / 180;
      const dLng = ((listing.lng - lng) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat * Math.PI) / 180) *
          Math.cos((listing.lat * Math.PI) / 180) *
          Math.sin(dLng / 2) *
          Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;
      return distance <= radius;
    });
    setFilteredListings(filtered);
    setIsFiltered(true);
  };

  // Listen for locationSelected event from Header_varient_1 or query params
  useEffect(() => {
    const handleLocationSelected = (event) => {
      const { lat, lng } = event.detail;
      filterListingsByLocation(lat, lng, 5);
      setSearchArea({ center: { lat, lng }, radius: 5000 });
    };
    window.addEventListener("locationSelected", handleLocationSelected);
    return () => {
      window.removeEventListener("locationSelected", handleLocationSelected);
    };
  }, [listings]);

  // Listen for districtSelected event from Header_varient_1
  useEffect(() => {
    const handleDistrictSelected = (event) => {
      const { districtName } = event.detail;
      console.log("DISTRICT SELECTED:", districtName);
      console.log("ALL LISTINGS:", listings);

      // Handle "All" district selection
      if (districtName === "All") {
        setFilteredListings(listings);
        setIsFiltered(false);
        setSearchArea(null);
        return;
      }

      // Filter by specific district
      console.log("Filtering by district:", districtName);
      console.log("Available districts in listings:", [
        ...new Set(listings.map((l) => l.district).filter(Boolean)),
      ]);

      // Normalize district names for comparison
      const normalizedDistrictName = districtName
        .toLowerCase()
        .replace(/[-\s]/g, "");

      const filtered = listings.filter((listing) => {
        if (!listing.district) return false;

        // Normalize the listing district name
        const normalizedListingDistrict = listing.district
          .toLowerCase()
          .replace(/[-\s]/g, "");

        return normalizedListingDistrict === normalizedDistrictName;
      });

      console.log("FILTERED LISTINGS:", filtered);
      setFilteredListings(filtered);
      setIsFiltered(true);
      setSearchArea(null); // Optionally remove the circle when filtering by district
    };
    window.addEventListener("districtSelected", handleDistrictSelected);
    return () => {
      window.removeEventListener("districtSelected", handleDistrictSelected);
    };
  }, [listings]);

  // Handle zoom change from MapSection
  const handleZoomChange = (zoom) => {
    if (zoom <= 11 && isFiltered) {
      setFilteredListings(listings);
      setIsFiltered(false);
      setSearchArea(null); // Optionally remove the circle when zoomed out
    }
  };

  // Function to clear district filter
  const clearDistrictFilter = () => {
    setFilteredListings(listings);
    setIsFiltered(false);
    setSearchArea(null);
  };

  // Function to get available districts from listings
  const getAvailableDistricts = () => {
    const districts = [
      ...new Set(listings.map((l) => l.district).filter(Boolean)),
    ];
    console.log("Available districts in listings:", districts);
    return districts;
  };

  // Cleanup effect to clear search area when component unmounts
  useEffect(() => {
    return () => {
      // Clear search area when component unmounts to prevent lingering circles
      setSearchArea(null);
    };
  }, []);

  useEffect(() => {
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const address = searchParams.get("address");
    if (lat && lng && address) {
      window.dispatchEvent(
        new CustomEvent("locationSelected", {
          detail: {
            lat: parseFloat(lat),
            lng: parseFloat(lng),
            address,
          },
        })
      );
    }
  }, [searchParams]);

  return (
    <div className="fixed inset-0 flex flex-col">
      {/* Fixed Navigation */}
      <div className="flex-none">
        <Header_varient_1 />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Map Section - Fixed */}
        <div
          className={`w-full h-full absolute inset-0 transition-all duration-500 ease-in-out transform ${
            isCardSectionOpen
              ? "translate-x-[-100%] md:translate-x-0 md:w-1/2"
              : "translate-x-0 md:w-1/2"
          }`}
        >
          <MapSection
            listings={filteredListings}
            searchArea={searchArea}
            onZoomChange={handleZoomChange}
          />
        </div>

        {/* Card Section - Scrollable */}
        <div
          className={`w-full h-full absolute inset-0 transition-all duration-500 ease-in-out transform ${
            isCardSectionOpen
              ? "translate-x-0 md:translate-x-[100%] md:w-1/2"
              : "translate-x-[100%] md:translate-x-[100%] md:w-1/2"
          }`}
        >
          <CardSection
            listings={filteredListings}
            isFiltered={isFiltered}
            onClearFilter={clearDistrictFilter}
          />
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsCardSectionOpen(!isCardSectionOpen)}
          className="md:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-main-blue text-white px-8 py-4 rounded-full shadow-lg z-50 hover:bg-[#4b5eef] transition-all duration-300 font-medium text-base flex items-center gap-2 backdrop-blur-sm bg-opacity-90 border-white/20"
        >
          {isCardSectionOpen ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                <path d="M9 12l2 2l4 -4" />
              </svg>
              Show Map
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                <path d="M9 12l2 2l4 -4" />
              </svg>
              Show Listings
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default page;
