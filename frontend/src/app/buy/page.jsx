"use client";
import React, { useState, useEffect } from "react";
import Header_varient_1 from "../../components/Header_varient_1.jsx";
import MapSection from "../../components/BuyPageContent/MapSection.jsx";
import CardSection from "../../components/BuyPageContent/CardSection.jsx";
import { fetchAllListings } from "@/lib/api";
import { useSearchParams } from "next/navigation";

function Page() {
  const [isCardSectionOpen, setIsCardSectionOpen] = useState(false);
  const [listings, setListings] = useState([]); // stores data from the backend
  const [filteredListings, setFilteredListings] = useState([]); //hold current displayed listings
  const [isFiltered, setIsFiltered] = useState(false); // Track if filtering is active
  const [searchArea, setSearchArea] = useState(null); // Lifted search area state
  const [activeFilters, setActiveFilters] = useState({
    district: null,
    price: null,
    bedroom: null,
    bathroom: null,
  }); // Track active filters
  const searchParams = useSearchParams();

  useEffect(() => {
    const getListings = async () => {
      try {
        const data = await fetchAllListings();
        console.log("Fetched listings:", data);
        console.log("Sample listing district:", data[0]?.district);
        console.log("Sample listing price:", data[0]?.price);
        console.log("Sample listing bedrooms:", data[0]?.bedrooms);
        console.log(
          "Sample listing attachedBathrooms:",
          data[0]?.attachedBathrooms
        );
        console.log(
          "Sample listing detachedBathrooms:",
          data[0]?.detachedBathrooms
        );
        console.log("Price range in listings:", {
          min: Math.min(...data.map((l) => l.price || 0)),
          max: Math.max(...data.map((l) => l.price || 0)),
        });
        setListings(data);
        setFilteredListings(data); // Default: show all

        // Log available filters for debugging
        setTimeout(() => {
          getAvailableDistricts();
          getAvailablePriceRanges();
          getAvailableBedroomBathroomCounts();
        }, 100);
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

      // Clear other filters when location search is used
      setActiveFilters({
        district: null,
        price: null,
        bedroom: null,
        bathroom: null,
      });
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

      // Apply district filter
      applyFilters({ district: districtName });

      // Clear search area when filtering by district
      if (districtName !== "All") {
        setSearchArea(null);
      }
    };
    window.addEventListener("districtSelected", handleDistrictSelected);
    return () => {
      window.removeEventListener("districtSelected", handleDistrictSelected);
    };
  }, [listings]);

  // Listen for priceSelected event from Header_varient_1
  useEffect(() => {
    const handlePriceSelected = (event) => {
      const { priceRange } = event.detail;
      console.log("PRICE SELECTED:", priceRange);

      // Apply price filter
      applyFilters({ price: priceRange });
    };
    window.addEventListener("priceSelected", handlePriceSelected);
    return () => {
      window.removeEventListener("priceSelected", handlePriceSelected);
    };
  }, [listings]);

  // Listen for bedroomSelected event from Header_varient_1
  useEffect(() => {
    const handleBedroomSelected = (event) => {
      const { bedroomCount } = event.detail;
      console.log("BEDROOM SELECTED:", bedroomCount);

      // Apply bedroom filter
      applyFilters({ bedroom: bedroomCount });
    };
    window.addEventListener("bedroomSelected", handleBedroomSelected);
    return () => {
      window.removeEventListener("bedroomSelected", handleBedroomSelected);
    };
  }, [listings]);

  // Listen for bathroomSelected event from Header_varient_1
  useEffect(() => {
    const handleBathroomSelected = (event) => {
      const { bathroomCount } = event.detail;
      console.log("BATHROOM SELECTED:", bathroomCount);

      // Apply bathroom filter
      applyFilters({ bathroom: bathroomCount });
    };
    window.addEventListener("bathroomSelected", handleBathroomSelected);
    return () => {
      window.removeEventListener("bathroomSelected", handleBathroomSelected);
    };
  }, [listings]);

  // Handle zoom change from MapSection
  const handleZoomChange = (zoom) => {
    if (zoom <= 11 && isFiltered) {
      // Only clear filters if no active filters are set
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

  // Function to clear all filters
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
  };

  // Function to get available districts from listings
  const getAvailableDistricts = () => {
    const districts = [
      ...new Set(listings.map((l) => l.district).filter(Boolean)),
    ];
    console.log("Available districts in listings:", districts);
    return districts;
  };

  // Function to get available price ranges from listings
  const getAvailablePriceRanges = () => {
    const prices = listings.map((l) => l.price).filter(Boolean);
    const priceRanges = {
      "0-1000000": prices.filter((p) => p <= 1000000).length,
      "1000000-5000000": prices.filter((p) => p > 1000000 && p <= 5000000)
        .length,
      "5000000-10000000": prices.filter((p) => p > 5000000 && p <= 10000000)
        .length,
      "10000000-20000000": prices.filter((p) => p > 10000000 && p <= 20000000)
        .length,
      "20000000+": prices.filter((p) => p > 20000000).length,
    };
    console.log("Available price ranges in listings:", priceRanges);
    return priceRanges;
  };

  // Function to get available bedroom and bathroom counts from listings
  const getAvailableBedroomBathroomCounts = () => {
    const bedrooms = listings.map((l) => l.bedrooms).filter(Boolean);
    const attachedBathrooms = listings
      .map((l) => l.attachedBathrooms)
      .filter(Boolean);
    const detachedBathrooms = listings
      .map((l) => l.detachedBathrooms)
      .filter(Boolean);

    const bedroomCounts = {};
    bedrooms.forEach((count) => {
      if (count >= 5) {
        bedroomCounts["5+"] = (bedroomCounts["5+"] || 0) + 1;
      } else {
        bedroomCounts[count] = (bedroomCounts[count] || 0) + 1;
      }
    });

    const bathroomCounts = {};
    for (let i = 0; i < attachedBathrooms.length; i++) {
      const total = (attachedBathrooms[i] || 0) + (detachedBathrooms[i] || 0);
      if (total >= 4) {
        bathroomCounts["4+"] = (bathroomCounts["4+"] || 0) + 1;
      } else if (total > 0) {
        bathroomCounts[total] = (bathroomCounts[total] || 0) + 1;
      }
    }

    console.log("Available bedroom counts in listings:", bedroomCounts);
    console.log("Available bathroom counts in listings:", bathroomCounts);
    return { bedroomCounts, bathroomCounts };
  };

  // Function to apply all active filters
  const applyFilters = (newFilters) => {
    const updatedFilters = { ...activeFilters, ...newFilters };
    setActiveFilters(updatedFilters);

    let filtered = [...listings];

    // Apply district filter
    if (updatedFilters.district && updatedFilters.district !== "All") {
      const normalizedDistrictName = updatedFilters.district
        .toLowerCase()
        .replace(/[-\s]/g, "");
      filtered = filtered.filter((listing) => {
        if (!listing.district) return false;
        const normalizedListingDistrict = listing.district
          .toLowerCase()
          .replace(/[-\s]/g, "");
        return normalizedListingDistrict === normalizedDistrictName;
      });
    }

    // Apply price filter
    if (updatedFilters.price && updatedFilters.price !== "All") {
      filtered = filtered.filter((listing) => {
        if (!listing.price) return false;
        const price = listing.price;

        switch (updatedFilters.price) {
          case "0-1000000":
            return price <= 1000000;
          case "1000000-5000000":
            return price > 1000000 && price <= 5000000;
          case "5000000-10000000":
            return price > 5000000 && price <= 10000000;
          case "10000000-20000000":
            return price > 10000000 && price <= 20000000;
          case "20000000+":
            return price > 20000000;
          default:
            return true;
        }
      });
    }

    // Apply bedroom filter
    if (updatedFilters.bedroom && updatedFilters.bedroom !== "All") {
      filtered = filtered.filter((listing) => {
        if (!listing.bedrooms) return false;
        const bedrooms = listing.bedrooms;

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

    // Apply bathroom filter
    if (updatedFilters.bathroom && updatedFilters.bathroom !== "All") {
      filtered = filtered.filter((listing) => {
        if (!listing.attachedBathrooms && !listing.detachedBathrooms)
          return false;
        const totalBathrooms =
          (listing.attachedBathrooms || 0) + (listing.detachedBathrooms || 0);

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
    console.log(
      "Applied filters:",
      updatedFilters,
      "Filtered count:",
      filtered.length
    );

    // Log filter details for debugging
    if (updatedFilters.district && updatedFilters.district !== "All") {
      console.log(`District filter: ${updatedFilters.district}`);
    }
    if (updatedFilters.price && updatedFilters.price !== "All") {
      console.log(`Price filter: ${updatedFilters.price}`);
    }
    if (updatedFilters.bedroom && updatedFilters.bedroom !== "All") {
      console.log(`Bedroom filter: ${updatedFilters.bedroom}`);
    }
    if (updatedFilters.bathroom && updatedFilters.bathroom !== "All") {
      console.log(`Bathroom filter: ${updatedFilters.bathroom}`);
    }
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
            onClearFilter={clearAllFilters}
            activeFilters={activeFilters}
            totalListings={listings.length}
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

export default Page;
