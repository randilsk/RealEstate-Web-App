"use client";
import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the buy MapSection to avoid SSR issues with Google Maps
const BuyMapSection = dynamic(() => import('@/components/BuyPageContent/MapSection'), { ssr: false });

type Listing = {
  _id: string;
  lat?: number;
  lng?: number;
  title?: string;
  price?: number;
  address?: string;
};

type SearchArea = {
  center: { lat: number; lng: number };
  radius: number;
} | null;

interface MapSectionRentProps {
  listings: Listing[];
  searchArea: SearchArea;
  onZoomChange?: (zoom: number) => void;
}

function MapSectionRent({ listings, searchArea, onZoomChange }: MapSectionRentProps) {
  return (
    <BuyMapSection listings={listings} searchArea={searchArea} onZoomChange={onZoomChange} />
  );
}

export default MapSectionRent;
