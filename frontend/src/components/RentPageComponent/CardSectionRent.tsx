"use client";
import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the buy CardSection to keep parity and avoid SSR issues
const BuyCardSection = dynamic(() => import('@/components/BuyPageContent/CardSection'));

type Listing = {
  _id: string;
};

interface CardSectionRentProps {
  listings: Listing[];
}

function CardSectionRent({ listings }: CardSectionRentProps) {
  return <BuyCardSection listings={listings} />;
}

export default CardSectionRent;
