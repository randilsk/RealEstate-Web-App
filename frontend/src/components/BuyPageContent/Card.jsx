"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { fetchAllListings } from "@/lib/api";

export default function ProductCard() {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getListings = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAllListings();
        setListings(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching listings:", err);
        setError("Failed to load listings");
        setIsLoading(false);
      }
    };

    getListings();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500 font-medium">
        {error}
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-16 text-gray-600 font-medium">
        No listings available at the moment
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {listings.map((listing) => (
          <div
className="w-[320px] bg-white border border-gray-200 rounded-xl shadow-md dark:bg-gray-800 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-300"


          >
            <Link href={`/listing/${listing._id}`}>
              <div className="relative h-64 overflow-hidden">
                {listing.images && listing.images.length > 0 ? (
                  <Image
                    src={listing.images[0]} 
                    alt={`${listing.district} property`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                ) : (
                  <Image
                    src="/images/home-image/home-page-image2.png" 
                    alt="Property placeholder"
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                )}
                {/* Price tag overlay */}
                <div className="absolute bottom-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-lg font-semibold shadow-md">
                  Rs. {Number(listing.price).toLocaleString()}
                </div>
              </div>
            </Link>
            <div className="px-5 py-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <Link href={`/listing/${listing._id}`}>
                    <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white hover:text-blue-600 transition-colors">
                      {listing.district}
                    </h5>
                  </Link>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {listing.city}
                  </p>
                </div>
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-md">
                  {listing.homeType || "Property"}
                </span>
              </div>

              {/* Horizontal line */}
              <div className="border-t border-gray-200 my-3"></div>
              
              {/* Property details with icons */}
              <div className="flex justify-between mt-4 text-sm text-gray-700">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>{listing.bedrooms} Beds</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{listing.attachedBathrooms + (listing.detachedBathrooms || 0)} Baths</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                  </svg>
                  <span>{listing.houseArea} sqft</span>
                </div>
              </div>
              
              {/* View button */}
              <div className="mt-6">
                <Link href={`/listing/${listing._id}`} className="block">
                  <button className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-colors duration-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}