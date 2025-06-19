"use client"
import React,{useState} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function HeroSection() {
  const phrases = [
    { text: "Spot It.", color: "text-black" },
    { text: "Love It.", color: "text-[#3b50df]" },
    { text: "Live It.", color: "text-black" },
  ];

  const commonStyles =
    "block font-extrabold font-poppins leading-tight";

  const router = useRouter();
  const [searchLocation,setSearchLocation] =useState("");
  const [searchResults,setSearchResults] = useState([]);

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
    <div className="hero-section pt-6 md:pt-12 flex flex-col md:flex-row relative pl-4 pr-5 md:(pl-8 pr-5) lg:pl-12 pr-5">
      {/* Left Section */}
      <div className="flex flex-col flex-1 gap-4 md:gap-5 w-full md:w-1/2">
        {/* Title Text */}
        <div className="mt-6 md:mt-10 lg:mt-[80px]">
          <div className="inline-block text-center md:text-left w-full md:w-auto">
            {phrases.map((phrase, index) => (
              <span
                key={index}
                className={`${commonStyles} ${phrase.color} text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[76px]`}
              >
                {phrase.text}
              </span>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-3/4 lg:w-2/4 mx-auto md:mx-0">
          <div className="h-[45px] md:h-[55px] px-3 md:px-[23px] py-1 md:py-1.5 bg-[#bcbbba] rounded-[50px] flex items-center gap-3 md:gap-[15px] opacity-90">
            <div className="flex-1 min-w-0">
              <input
                type="text"
                value={searchLocation}
                onChange={handleLocationSearch}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearchIconClick();
                }}
                placeholder="Enter address, city, district, province"
                className="w-full p-1.5 md:p-2 bg-transparent border-none outline-none flex justify-start placeholder:text-gray-800 text-sm md:text-base"
              />
            </div>
            <div className="w-[36px] h-[36px] md:w-[46px] md:h-[43px] flex justify-center items-center flex-shrink-0"
              onClick={handleSearchIconClick}
            >
              <Image
                src="/icons/search-icon.svg"
                alt="Search Icon"
                width={24}
                height={24}
                className="w-4 h-4 md:w-6 md:h-6"
              />
            </div>
          </div>
          {searchResults.length > 0 && (
            <div className="absolute left-0 right-0 mt-1 bg-[#bcbbba] rounded-full shadow-lg z-50">
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => handleLocationSelect(result)}
                >
                  {result.formatted_address}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex mt-8 md:mt-0 relative">
        <div className="w-full h-full relative">
          <Image
            className="object-contain md:object-cover w-full h-auto"
            src="/images/home-image/home-page-image2.png"
            alt="Home Page Image"
            width={1000}
            height={1000}
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
