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
  isFiltered = false, 
  onClearFilter = () => {}, 
  activeFilters = {}, 
  totalListings = 0,
  originalListings = []
}: CardSectionRentProps) {
  const getFilterDisplayText = () => {
    const filters: string[] = [];
    const source = originalListings && originalListings.length ? originalListings : listings;

    const countForDistrict = (district?: string | null) => {
      if (!district) return 0;
      const norm = district.toLowerCase().replace(/[-\s]/g, "");
      return source.filter(l => String(l.district || "").toLowerCase().replace(/[-\s]/g, "") === norm).length;
    };
    const countForPrice = (monthlyRent?: string | null) => {
      if (!monthlyRent) return 0;
      return source.filter(l => {
        const p = Number(l.monthlyRent || 0);
        switch (monthlyRent) {
          case '0-1000000': return p <= 1000000;
          case '1000000-5000000': return p > 1000000 && p <= 5000000;
          case '5000000-10000000': return p > 5000000 && p <= 10000000;
          case '10000000-20000000': return p > 10000000 && p <= 20000000;
          case '20000000+': return p > 20000000;
          default: return true;
        }
      }).length;
    };
    const countForBedroom = (bedroom?: string | null) => {
      if (!bedroom) return 0;
      return source.filter(l => {
        const b = Number(l.bedrooms || 0);
        switch (bedroom) {
          case '1': return b === 1;
          case '2': return b === 2;
          case '3': return b === 3;
          case '4': return b === 4;
          case '5+': return b >= 5;
          default: return true;
        }
      }).length;
    };
    const countForBathroom = (bathroom?: string | null) => {
      if (!bathroom) return 0;
      return source.filter(l => {
        const total = Number(l.attachedBathrooms || 0) + Number(l.detachedBathrooms || 0);
        switch (bathroom) {
          case '1': return total === 1;
          case '2': return total === 2;
          case '3': return total === 3;
          case '4+': return total >= 4;
          default: return true;
        }
      }).length;
    };
    if (activeFilters?.district && activeFilters.district !== 'All') {
      const c = countForDistrict(activeFilters.district);
      filters.push(`District: ${activeFilters.district} (${c})`);
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
      const c = countForPrice(activeFilters.price);
      filters.push(`Price: ${priceText} (${c})`);
    }
    if (activeFilters?.bedroom && activeFilters.bedroom !== 'All') {
      const c = countForBedroom(activeFilters.bedroom);
      filters.push(`Bedrooms: ${activeFilters.bedroom} (${c})`);
    }
    if (activeFilters?.bathroom && activeFilters.bathroom !== 'All') {
      const c = countForBathroom(activeFilters.bathroom);
      filters.push(`Bathrooms: ${activeFilters.bathroom} (${c})`);
    }
    return filters.join(', ');
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="sticky top-0 bg-white z-10 px-4 py-1.5 border-b">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h2 className="font-semibold text-xl md:text-xl">Recent Rent Properties</h2>
            {isFiltered && (
              <span className="text-sm text-gray-500">
                Showing {listings.length} of {totalListings} listings
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isFiltered && (
              <>
                <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
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
              listings.map((listing) => (
                <RentCard key={listing._id} listing={listing} />
              ))
            ) : (
              <div className="text-center py-16 text-gray-600 font-medium">
                {isFiltered ? (
                  <div className="flex flex-col items-center gap-2">
                    <p>No listings found for the selected filters.</p>
                    <p className="text-sm text-gray-500">{getFilterDisplayText()}</p>
                    <button onClick={onClearFilter} className="text-blue-600 hover:text-blue-800 underline">
                      Show all listings
                    </button>
                  </div>
                ) : (
                  'No listings available at the moment'
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
