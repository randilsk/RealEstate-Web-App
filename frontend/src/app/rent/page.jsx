"use client";
import React, { useState, useEffect } from "react";
import Header_varient_rent from "../../components/Header_varient_rent.jsx"; // New dedicated header
import MapSectionRent from "@/components/RentPageComponent/MapSectionRent";
import CardSectionRent from "@/components/RentPageComponent/CardSectionRent";
import { fetchAllRentListings } from "@/lib/api";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

function Page() {
  const [isCardSectionOpen, setIsCardSectionOpen] = useState(false);
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchArea, setSearchArea] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    district: null,
    price: null,
    bedroom: null,
    bathroom: null,
  });
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [hasAppliedFromQuery, setHasAppliedFromQuery] = useState(false);

  useEffect(() => {
    const getListings = async () => {
      try {
        console.log("Fetching rent listings from API...");
        const data = await fetchAllRentListings();
        console.log("API response:", data);
        console.log("Listings count:", data?.length || 0);
        setListings(data);
        setFilteredListings(data);
      } catch (err) {
        console.error("Error fetching listings:", err);
        setListings([]);
        setFilteredListings([]);
      }
    };
    getListings();
  }, []);

  const filterListingsByLocation = (lat, lng, radius = 5) => {
    const R = 6371;
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

  // Apply filters with rent-specific price ranges
  const applyFilters = (newFilters) => {
    const updatedFilters = { ...activeFilters, ...newFilters };
    setActiveFilters(updatedFilters);

    let filtered = [...listings];

    // District
    if (updatedFilters.district && updatedFilters.district !== "All") {
      const normalizedDistrictName = updatedFilters.district
        .toLowerCase()
        .replace(/[-\s]/g, "");
      filtered = filtered.filter((listing) => {
        if (!listing.district) return false;
        const normalizedListingDistrict = String(listing.district)
          .toLowerCase()
          .replace(/[-\s]/g, "");
        return normalizedListingDistrict === normalizedDistrictName;
      });
    }

    // Price (Monthly Rent) - Updated ranges for rent
    if (updatedFilters.price && updatedFilters.price !== "All") {
      filtered = filtered.filter((listing) => {
        // Check both price and MonthlyRent fields
        const rentAmount = listing.MonthlyRent || listing.price || 0;
        const price = Number(rentAmount);
        switch (updatedFilters.price) {
          case "0-50000":
            return price <= 50000;
          case "50000-100000":
            return price > 50000 && price <= 100000;
          case "100000-200000":
            return price > 100000 && price <= 200000;
          case "200000-500000":
            return price > 200000 && price <= 500000;
          case "500000+":
            return price > 500000;
          default:
            return true;
        }
      });
    }

    // Bedroom
    if (updatedFilters.bedroom && updatedFilters.bedroom !== "All") {
      filtered = filtered.filter((listing) => {
        const bedrooms = Number(listing.bedrooms || 0);
        switch (updatedFilters.bedroom) {
          case "1":
            return bedrooms === 1;
          case "2":
            return bedrooms === 2;
          case "3":
            return bedrooms === 3;
          case "4":
            return bedrooms === 4;
          case "5+":
            return bedrooms >= 5;
          default:
            return true;
        }
      });
    }

    // Bathroom (attached + detached)
    if (updatedFilters.bathroom && updatedFilters.bathroom !== "All") {
      filtered = filtered.filter((listing) => {
        const totalBathrooms =
          Number(listing.attachedBathrooms || 0) +
          Number(listing.detachedBathrooms || 0);
        switch (updatedFilters.bathroom) {
          case "1":
            return totalBathrooms === 1;
          case "2":
            return totalBathrooms === 2;
          case "3":
            return totalBathrooms === 3;
          case "4+":
            return totalBathrooms >= 4;
          default:
            return true;
        }
      });
    }

    setFilteredListings(filtered);
    setIsFiltered(
      updatedFilters.district !== null ||
        updatedFilters.price !== null ||
        updatedFilters.bedroom !== null ||
        updatedFilters.bathroom !== null
    );

    // Persist filters to URL
    try {
      const params = new URLSearchParams(window.location.search);
      const setOrDelete = (key, value) => {
        if (value === null || value === undefined || value === "All") {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      };
      setOrDelete("district", updatedFilters.district);
      setOrDelete("price", updatedFilters.price);
      setOrDelete("bedroom", updatedFilters.bedroom);
      setOrDelete("bathroom", updatedFilters.bathroom);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    } catch (error) {
      console.error("Error updating URL:", error);
    }

    console.log(
      "Applied filters:",
      updatedFilters,
      "Filtered count:",
      filtered.length
    );
  };

  const clearAllFilters = () => {
    setFilteredListings(listings);
    setIsFiltered(false);
    setActiveFilters({
      district: null,
      price: null,
      bedroom: null,
      bathroom: null,
    });
    setSearchArea(null);

    // Clear filter params from URL
    try {
      const params = new URLSearchParams(window.location.search);
      ["district", "price", "bedroom", "bathroom"].forEach((k) =>
        params.delete(k)
      );
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    } catch (error) {
      console.error("Error clearing URL params:", error);
    }

    // Dispatch event to clear district polygons on map
    window.dispatchEvent(
      new CustomEvent("districtSelected", {
        detail: { districtName: "All" },
      })
    );
  };

  useEffect(() => {
    const handleLocationSelected = (event) => {
      const { lat, lng } = event.detail;
      filterListingsByLocation(lat, lng, 5);
      setSearchArea({ center: { lat, lng }, radius: 5000 });
      // Clear other filters when location search is used
      setActiveFilters({
        district: null,
        price: null,
        bedroom: null,
        bathroom: null,
      });
    };

    const handleDistrictSelected = (event) => {
      const { districtName } = event.detail || {};

      // Handle "All" selection - reset to show all properties and clear search area
      if (districtName === "All") {
        // Reset filtered listings to show all properties
        setFilteredListings(listings);
        setIsFiltered(false);
        // Clear the search area to reset map to initial state
        setSearchArea(null);
        // Reset active filters
        setActiveFilters({
          district: null,
          price: null,
          bedroom: null,
          bathroom: null,
        });
        // Clear URL params
        try {
          const params = new URLSearchParams(window.location.search);
          ["district", "price", "bedroom", "bathroom"].forEach((k) =>
            params.delete(k)
          );
          router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        } catch (error) {
          console.error("Error clearing URL params:", error);
        }
        return;
      }

      // Handle specific district selection
      if (districtName && districtName !== "None") {
        applyFilters({ district: districtName });
        setSearchArea(null); // Clear any previous location search area
      }
    };

    const handlePriceSelected = (event) => {
      const { priceRange } = event.detail || {};
      applyFilters({ price: priceRange });
    };
    const handleBedroomSelected = (event) => {
      const { bedroomCount } = event.detail || {};
      applyFilters({ bedroom: bedroomCount });
    };
    const handleBathroomSelected = (event) => {
      const { bathroomCount } = event.detail || {};
      applyFilters({ bathroom: bathroomCount });
    };

    window.addEventListener("locationSelected", handleLocationSelected);
    window.addEventListener("districtSelected", handleDistrictSelected);
    window.addEventListener("priceSelected", handlePriceSelected);
    window.addEventListener("bedroomSelected", handleBedroomSelected);
    window.addEventListener("bathroomSelected", handleBathroomSelected);

    return () => {
      window.removeEventListener("locationSelected", handleLocationSelected);
      window.removeEventListener("districtSelected", handleDistrictSelected);
      window.removeEventListener("priceSelected", handlePriceSelected);
      window.removeEventListener("bedroomSelected", handleBedroomSelected);
      window.removeEventListener("bathroomSelected", handleBathroomSelected);
    };
  }, [listings]);

  const handleZoomChange = (zoom) => {
    if (zoom <= 11 && isFiltered) {
      if (
        !activeFilters.district &&
        !activeFilters.price &&
        !activeFilters.bedroom &&
        !activeFilters.bathroom
      ) {
        setFilteredListings(listings);
        setIsFiltered(false);
        setSearchArea(null);
      }
    }
  };

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

  // Apply filters from URL once when listings are available
  useEffect(() => {
    if (!hasAppliedFromQuery && listings.length > 0) {
      const district = searchParams.get("district");
      const price = searchParams.get("price");
      const bedroom = searchParams.get("bedroom");
      const bathroom = searchParams.get("bathroom");
      if (district || price || bedroom || bathroom) {
        applyFilters({
          district: district || null,
          price: price || null,
          bedroom: bedroom || null,
          bathroom: bathroom || null,
        });
      }
      setHasAppliedFromQuery(true);
    }
  }, [hasAppliedFromQuery, listings, searchParams]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      setSearchArea(null);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col">
      <div className="flex-none">
        <Header_varient_rent />
      </div>

      <div className="flex-1 flex relative overflow-hidden">
        <div
          className={`w-full h-full absolute inset-0 transition-all duration-500 ease-in-out transform ${
            isCardSectionOpen
              ? "translate-x-[-100%] md:translate-x-0 md:w-1/2"
              : "translate-x-0 md:w-1/2"
          }`}
        >
          <MapSectionRent
            listings={filteredListings}
            searchArea={searchArea}
            onZoomChange={handleZoomChange}
          />
        </div>

        <div
          className={`w-full h-full absolute inset-0 transition-all duration-500 ease-in-out transform ${
            isCardSectionOpen
              ? "translate-x-0 md:translate-x-[100%] md:w-1/2"
              : "translate-x-[100%] md:translate-x-[100%] md:w-1/2"
          }`}
        >
          <CardSectionRent
            listings={filteredListings}
            isFiltered={isFiltered}
            onClearFilter={clearAllFilters}
            activeFilters={activeFilters}
            totalListings={listings.length}
            originalListings={listings}
          />
        </div>

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

export default Page;
