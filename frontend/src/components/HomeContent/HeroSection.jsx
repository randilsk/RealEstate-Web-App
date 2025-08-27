"use client"
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function HeroSection() {
  const phrases = [
    { text: "Spot It.", color: "text-black" },
    { text: "Love It.", color: "text-[#3b50df]" },
    { text: "Live It.", color: "text-black" },
  ];

  const commonStyles =
    "block font-extrabold font-poppins leading-tight transition-all duration-300 hover:scale-105";

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

  return (
    <div className="hero-section pt-6 md:pt-12 flex flex-col md:flex-row relative pl-4 pr-5 md:(pl-8 pr-5) lg:pl-12 pr-5 min-h-[80vh] items-center">
      {/* Left Section */}
      <div className="flex flex-col flex-1 gap-6 md:gap-8 w-full md:w-1/2">
        {/* Title Text */}
        <div className="mt-6 md:mt-10 lg:mt-[80px]">
          <div className="inline-block text-center md:text-left w-full md:w-auto">
            {phrases.map((phrase, index) => (
              <span
                key={index}
                className={`${commonStyles} ${phrase.color} text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[76px] drop-shadow-sm`}
                style={{
                  animationDelay: `${index * 0.2}s`,
                  animation: 'fadeInUp 0.8s ease-out forwards'
                }}
              >
                {phrase.text}
              </span>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-3/4 lg:w-2/4 mx-auto md:mx-0">
          <div className={`h-[50px] md:h-[60px] px-4 md:px-6 py-2 md:py-2.5 bg-white/90 backdrop-blur-sm rounded-[50px] flex items-center gap-3 md:gap-4 shadow-lg border border-white/20 transition-all duration-300 ${isSearchFocused ? 'shadow-xl scale-105 bg-white/95' : 'hover:shadow-xl hover:bg-white/95'}`}>
            <div className="flex-1 min-w-0">
              <input
                type="text"
                value={searchLocation}
                onChange={handleLocationSearch}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearchIconClick();
                }}
                placeholder="Enter address, city, district, province"
                className="w-full p-2 bg-transparent border-none outline-none placeholder:text-gray-600 text-gray-800 text-sm md:text-base font-medium"
              />
            </div>
            <div className={`w-[40px] h-[40px] md:w-[48px] md:h-[48px] flex justify-center items-center flex-shrink-0 bg-[#3b50df] rounded-full cursor-pointer transition-all duration-300 hover:bg-[#2a3cb8] hover:scale-110 active:scale-95`}
              onClick={handleSearchIconClick}
            >
              <Image
                src="/icons/search-icon.svg"
                alt="Search Icon"
                width={24}
                height={24}
                className="w-5 h-5 md:w-6 md:h-6 filter brightness-0 invert"
              />
            </div>
          </div>
          {searchResults.length > 0 && (
            <div className="absolute left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 z-50 overflow-hidden">
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  className="p-4 hover:bg-gray-50 cursor-pointer text-sm md:text-base text-gray-700 border-b border-gray-100 last:border-b-0 transition-colors duration-200"
                  onClick={() => handleLocationSelect(result)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#3b50df] rounded-full flex-shrink-0"></div>
                    <span className="truncate">{result.formatted_address}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex mt-8 md:mt-0 relative">
        <div className="w-full h-full relative group">
          <Image
            className="object-contain md:object-cover w-full h-auto transition-transform duration-500 group-hover:scale-105 drop-shadow-lg"
            src="/images/home-image/home-page-image2.png"
            alt="Home Page Image"
            width={1000}
            height={1000}
            priority
          />
          {/* Subtle overlay gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 pointer-events-none rounded-lg"></div>
        </div>
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default HeroSection;
