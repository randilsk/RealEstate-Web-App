"use client"
import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const SearchBar = ({
  searchLocation,
  searchResults,
  isSearchFocused,
  setIsSearchFocused,
  handleLocationSearch,
  handleLocationSelect,
  handleSearchIconClick,
}) => {
  return (
    <div className="relative w-full max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className={`group h-16 px-6 bg-white/80 backdrop-blur-2xl rounded-2xl flex items-center gap-4 shadow-[0_20px_40px_-15px_rgba(59,80,223,0.3)] border border-white/40 transition-all duration-300 ${
          isSearchFocused
            ? "ring-2 ring-[#3b50df]/40 shadow-[0_25px_50px_-20px_rgba(59,80,223,0.4)] bg-white/90"
            : "hover:bg-white/85 hover:shadow-[0_25px_45px_-18px_rgba(59,80,223,0.35)]"
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
            placeholder="Search by location, city, or neighborhood..."
            className="w-full bg-transparent border-none outline-none placeholder:text-gray-500/70 text-gray-800 text-lg font-medium"
          />
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 flex justify-center items-center flex-shrink-0 bg-gradient-to-r from-[#3b50df] to-[#4c63e8] rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg shadow-[0_8px_20px_-6px_rgba(59,80,223,0.4)]"
          onClick={handleSearchIconClick}
        >
          <Image
            src="/icons/search-icon.svg"
            alt="Search"
            width={20}
            height={20}
            className="filter brightness-0 invert"
          />
        </motion.div>
      </motion.div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 mt-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/40 z-50 overflow-hidden"
          >
            <div className="p-2 max-h-80 overflow-auto">
              {searchResults.map((result, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.01, backgroundColor: "rgba(59, 80, 223, 0.05)" }}
                  className="w-full text-left p-4 rounded-xl cursor-pointer text-gray-700 flex items-start gap-3 transition-all duration-200"
                  onClick={() => handleLocationSelect(result)}
                >
                  <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#3b50df]/10 text-[#3b50df] flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="leading-6 flex-1 text-sm font-medium">{result.formatted_address}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
