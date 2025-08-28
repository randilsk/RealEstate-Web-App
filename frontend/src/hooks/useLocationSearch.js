import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const useLocationSearch = () => {
  const router = useRouter();
  const [searchLocation, setSearchLocation] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleLocationSearch = async (e) => {
    const value = e.target.value;
    setSearchLocation(value);

    if (value.length > 2) {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(value)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();
        if (data.results) {
          setSearchResults(data.results);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleLocationSelect = (location) => {
    setSearchLocation(location.formatted_address);
    setSearchResults([]);
    
    // Dispatch to update map
    window.dispatchEvent(
      new CustomEvent("locationSelected", {
        detail: {
          lat: location.geometry.location.lat,
          lng: location.geometry.location.lng,
          address: location.formatted_address,
        },
      })
    );

    // Redirect to Buy page
    router.push(`/buy?lat=${location.geometry.location.lat}&lng=${location.geometry.location.lng}&address=${encodeURIComponent(location.formatted_address)}`);
  };

  const handleSearchIconClick = async () => {
    if (searchLocation.trim().length > 2) {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(searchLocation)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const location = data.results[0];
          handleLocationSelect(location);
        } else {
          console.warn("No location found.");
        }
      } catch (error) {
        console.error("Search error:", error);
      }
    }
  };

  return {
    searchLocation,
    searchResults,
    isSearchFocused,
    setIsSearchFocused,
    handleLocationSearch,
    handleLocationSelect,
    handleSearchIconClick,
  };
};
