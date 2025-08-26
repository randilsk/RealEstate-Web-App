"use client";
import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the buy CardSection to keep parity and avoid SSR issues
const BuyCardSection = dynamic(() => import('@/components/BuyPageContent/CardSection'));

type Listing = {
  _id: string;
  district?: string;
  price?: number;
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
}

function CardSectionRent({ 
  listings, 
  isFiltered = false, 
  onClearFilter = () => {}, 
  activeFilters = {}, 
  totalListings = 0 
}: CardSectionRentProps) {
  // Debug logging
  console.log('CardSectionRent received listings:', listings);
  console.log('CardSectionRent received isFiltered:', isFiltered);
  console.log('CardSectionRent received totalListings:', totalListings);
  
  return (
    <BuyCardSection 
      listings={listings}
      isFiltered={isFiltered}
      onClearFilter={onClearFilter}
      activeFilters={activeFilters}
      totalListings={totalListings}
    />
  );
}

export default CardSectionRent;
