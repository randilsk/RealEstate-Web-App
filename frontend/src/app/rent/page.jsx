"use client";
import React, { useState, useEffect } from "react";
import Header_varient_1 from "../../components/Header_varient_1.jsx";
import MapSectionRent from "@/components/RentPageComponent/MapSectionRent";
import CardSectionRent from "@/components/RentPageComponent/CardSectionRent";
import { fetchAllListings } from "@/lib/api";
import { useSearchParams } from "next/navigation";

function page() {
  const [isCardSectionOpen, setIsCardSectionOpen] = useState(false);
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchArea, setSearchArea] = useState(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const getListings = async () => {
      try {
        const data = await fetchAllListings();
        setListings(data);
        setFilteredListings(data);
      } catch (err) {
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
      const dLat = (listing.lat - lat) * Math.PI / 180;
      const dLng = (listing.lng - lng) * Math.PI / 180;
      const a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat * Math.PI / 180) * Math.cos(listing.lat * Math.PI / 180) *
        Math.sin(dLng/2) * Math.sin(dLng/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distance = R * c;
      return distance <= radius;
    });
    setFilteredListings(filtered);
    setIsFiltered(true);
  };

  useEffect(() => {
    const handleLocationSelected = (event) => {
      const { lat, lng } = event.detail;
      filterListingsByLocation(lat, lng, 5);
      setSearchArea({ center: { lat, lng }, radius: 5000 });
    };
    const handleDistrictSelected = (event) => {
      const { districtName } = event.detail || {};
      if (districtName === 'None') {
        setFilteredListings(listings);
        setIsFiltered(false);
        setSearchArea(null);
      }
    };
    window.addEventListener("locationSelected", handleLocationSelected);
    window.addEventListener("districtSelected", handleDistrictSelected);
    return () => {
      window.removeEventListener("locationSelected", handleLocationSelected);
      window.removeEventListener("districtSelected", handleDistrictSelected);
    };
  }, [listings]);

  const handleZoomChange = (zoom) => {
    if (zoom <= 11 && isFiltered) {
      setFilteredListings(listings);
      setIsFiltered(false);
      setSearchArea(null);
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

  return (
    <div className="fixed inset-0 flex flex-col">
      <div className="flex-none">
        <Header_varient_1 showFilters={true} districtHasNone={true} />
      </div>

      <div className="flex-1 flex relative overflow-hidden">
        <div 
          className={`w-full h-full absolute inset-0 transition-all duration-500 ease-in-out transform ${
            isCardSectionOpen 
              ? 'translate-x-[-100%] md:translate-x-0 md:w-1/2' 
              : 'translate-x-0 md:w-1/2'
          }`}
        >
          <MapSectionRent listings={listings} searchArea={searchArea} onZoomChange={handleZoomChange} />
        </div>

        <div 
          className={`w-full h-full absolute inset-0 transition-all duration-500 ease-in-out transform ${
            isCardSectionOpen 
              ? 'translate-x-0 md:translate-x-[100%] md:w-1/2' 
              : 'translate-x-[100%] md:translate-x-[100%] md:w-1/2'
          }`}
        >
          <CardSectionRent listings={filteredListings} />
        </div>

        <button
          onClick={() => setIsCardSectionOpen(!isCardSectionOpen)}
          className="md:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-main-blue text-white px-8 py-4 rounded-full shadow-lg z-50 hover:bg-[#4b5eef] transition-all duration-300 font-medium text-base flex items-center gap-2 backdrop-blur-sm bg-opacity-90 border-white/20"
        >
          {isCardSectionOpen ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                <path d="M9 12l2 2l4 -4" />
              </svg>
              Show Map
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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


