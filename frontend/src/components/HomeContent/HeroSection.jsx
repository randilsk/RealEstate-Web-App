"use client"
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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

  // Framer Motion variants
  const titleVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 60, damping: 12 },
    },
  };

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
    <div className="relative overflow-hidden">
      {/* Subtle background gradient and abstract blobs */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white to-white/90" />
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#3b50df]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#3b50df]/5 blur-3xl" />

      <div className="pt-10 md:pt-16 px-4 sm:px-6 lg:px-12 min-h-[85vh] flex flex-col md:flex-row items-center gap-10">
        {/* Left: Headline + Search */}
        <div className="flex-1 w-full flex flex-col items-center md:items-start">
          {/* Headline */}
          <motion.div
            variants={titleVariants}
            initial="hidden"
            animate="show"
            className="text-center md:text-left"
          >
            {phrases.map((phrase, index) => (
              <motion.span
                key={index}
                variants={wordVariants}
                className={`${commonStyles} ${phrase.color} text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[95px] tracking-tight drop-shadow-[0_1px_0_rgba(0,0,0,0.05)]`}
              >
                {phrase.text}
              </motion.span>
            ))}
          </motion.div>

          {/* Floating Glass Search Bar */}
          <div className="relative w-full md:max-w-xl lg:max-w-lg mt-6 md:mt-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className={`group h-[56px] md:h-[64px] px-4 md:px-6 bg-white/60 backdrop-blur-xl rounded-full flex items-center gap-3 md:gap-4 shadow-[0_10px_30px_-10px_rgba(59,80,223,0.25)] border border-white/30 transition-all duration-300 ${
                isSearchFocused
                  ? "ring-4 ring-[#3b50df]/30 shadow-[0_20px_40px_-15px_rgba(59,80,223,0.35)] bg-white/70"
                  : "hover:bg-white/70 hover:shadow-[0_16px_36px_-16px_rgba(59,80,223,0.28)]"
              }`}
            >
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
                  className="w-full bg-transparent border-none outline-none placeholder:text-gray-500/80 text-gray-800 text-base md:text-lg font-medium"
                />
              </div>
              <div
                className={`w-[44px] h-[44px] md:w-[52px] md:h-[52px] flex justify-center items-center flex-shrink-0 bg-[#3b50df] rounded-full cursor-pointer transition-all duration-300 hover:bg-[#2a3cb8] hover:scale-105 active:scale-95 shadow-[0_8px_20px_-6px_rgba(59,80,223,0.5)]`}
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
            </motion.div>

            {/* Animated Suggestion Dropdown */}
            <AnimatePresence>
              {searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 right-0 mt-3 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 z-50 overflow-hidden"
                >
                  <div className="p-1 max-h-80 overflow-auto">
                    {searchResults.map((result, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.01 }}
                        className="w-full text-left p-4 md:p-4 rounded-xl hover:bg-gray-50/70 cursor-pointer text-sm md:text-base text-gray-700 border-b border-gray-100 last:border-b-0 flex items-start gap-3 transition-colors"
                        onClick={() => handleLocationSelect(result)}
                      >
                        <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#3b50df]/10 text-[#3b50df]">
                          {/* Pin icon via inline SVG to avoid extra deps */}
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                            <path fillRule="evenodd" d="M11.47 3.84a.75.75 0 0 1 1.06 0l4.69 4.69a.75.75 0 0 1 0 1.06l-6.72 6.72a.75.75 0 0 1-.265.17l-3.3 1.1a.75.75 0 0 1-.949-.949l1.1-3.3a.75.75 0 0 1 .17-.265l6.72-6.72Zm1.59-.53a2.25 2.25 0 0 0-3.18 0L5.19 8.01a2.25 2.25 0 0 0-.51.795l-1.1 3.3a2.25 2.25 0 0 0 2.846 2.846l3.3-1.1c.294-.098.566-.275.795-.51l5.69-5.69V18a.75.75 0 0 0 1.5 0V7.5c0-.199-.079-.39-.22-.53l-4.72-4.72Z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="truncate leading-6 flex-1">{result.formatted_address}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Image Card */}
        <div className="flex-1 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative group mx-auto w-full max-w-[720px] rounded-3xl overflow-hidden shadow-[0_20px_60px_-20px_rgba(0,0,0,0.3)]"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#3b50df]/10 via-transparent to-white/0 pointer-events-none z-10" />
            <Image
              className="object-contain md:object-cover w-full h-auto transition-transform duration-500 group-hover:scale-[1.04] md:group-hover:-rotate-[1deg]"
              src="/images/home-image/home-page-image2.png"
              alt="Home Page Image"
              width={1200}
              height={900}
              priority
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
