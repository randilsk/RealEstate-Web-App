"use client";
import React from 'react';
import RentCard from '@/components/RentPageComponent/RentCard';

type Listing = {
  _id: string;
  district?: string;
  monthlyRent?: number;
  bedrooms?: number;
  attachedBathrooms?: number;
  detachedBathrooms?: number;
};

interface CardSectionRentProps {
  listings: Listing[];
  listingsKey?: string;      // 🎬 animation key
  animationType?: string;    // 🎬 animation type
  duration?: number;         // 🎬 animation duration
  delay?: number;            // 🎬 optional delay
  isFiltered?: boolean;
  onClearFilter?: () => void;
  activeFilters?: {
    district?: string | null;
    price?: string | null;
    bedroom?: string | null;
    bathroom?: string | null;
  };
  totalListings?: number;
  originalListings?: Listing[];
}

function CardSectionRent({ 
  listings, 
  listingsKey = "default",
  animationType = "fadeScale",
  duration = 1000,             // 🎬 default slow animation
  delay = 50,                  // 🎬 default no delay
  isFiltered = false, 
  onClearFilter = () => {}, 
  activeFilters = {}, 
  totalListings = 0,
  originalListings = []
}: CardSectionRentProps) {
  const getFilterDisplayText = () => {
    const filters: string[] = [];
    
    if (activeFilters?.district && activeFilters.district !== 'All') {
      filters.push(`District: ${activeFilters.district}`);
    }
    if (activeFilters?.price && activeFilters.price !== 'All') {
      const priceText =
        activeFilters.price === '0-1000000'
          ? 'Under Rs. 1M'
          : activeFilters.price === '1000000-5000000'
          ? 'Rs. 1M - 5M'
          : activeFilters.price === '5000000-10000000'
          ? 'Rs. 5M - 10M'
          : activeFilters.price === '10000000-20000000'
          ? 'Rs. 10M - 20M'
          : activeFilters.price === '20000000+'
          ? 'Above Rs. 20M'
          : activeFilters.price;
      filters.push(`Price: ${priceText}`);
    }
    if (activeFilters?.bedroom && activeFilters.bedroom !== 'All') {
      filters.push(`Bedrooms: ${activeFilters.bedroom}`);
    }
    if (activeFilters?.bathroom && activeFilters.bathroom !== 'All') {
      filters.push(`Bathrooms: ${activeFilters.bathroom}`);
    }
    return filters.join(', ');
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="sticky top-0 bg-white z-10 px-4 py-1.5 border-b">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h2 className="font-semibold text-xl md:text-xl">
              Recent Rent Properties
            </h2>
            {isFiltered && (
              <span className="text-sm text-gray-500">
                Showing {listings.length} of {totalListings} listings
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isFiltered && (
              <>
                <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {getFilterDisplayText()}
                </span>
                <button
                  onClick={onClearFilter}
                  className="text-sm text-red-600 bg-red-50 px-2 py-1 rounded-full hover:bg-red-100 transition-colors"
                >
                  Clear All Filters
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="flex flex-wrap justify-center gap-6">
            {listings && listings.length > 0 ? (
              listings.map((listing, index) => (
                <RentCard
                  key={`${listingsKey}-${listing._id}`}
                  listing={listing}
                  index={index}
                  animationType={'fadeScale'}
                  duration={duration}     // 🎬 now passed from props
                  delay={delay}           // 🎬 optional
                />
              ))
            ) : (
              <div className="text-center py-16 text-gray-600 font-medium">
                {isFiltered ? (
                  <div className="flex flex-col items-center gap-2">
                    <p>No listings found for the selected filters.</p>
                    <p className="text-sm text-gray-500">
                      {getFilterDisplayText()}
                    </p>
                    <button
                      onClick={onClearFilter}
                      className="text-green-600 hover:text-green-800 underline"
                    >
                      Show all listings
                    </button>
                  </div>
                ) : (
                  "No rental listings available at the moment"
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardSectionRent;
