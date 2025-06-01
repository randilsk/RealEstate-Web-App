"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { fetchAllListings } from "@/lib/api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { HiOutlineHeart } from "react-icons/hi";

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
    <>
      {listings.map((listing) => (
        <div
          key={listing._id}
          className="w-full sm:w-[47%] bg-white border border-gray-200 rounded-xl shadow-md dark:bg-gray-800 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-300"
        >
          <Link href={`/listing/${listing._id}`}>
            <div className="relative h-40">
              {listing.images && listing.images.length > 0 ? (
                <Swiper
                  modules={[Pagination, Navigation]}
                  spaceBetween={0}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                  className="mySwiper h-full"
                >
                  {listing.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <Image
                        src={image}
                        alt={`${listing.district} property ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <Image
                  src="/images/home-image/home-page-image2.png"
                  alt="Property placeholder"
                  fill
                  className="object-cover"
                />
              )}

              {/* Heart icon overlay */}
              <div className="absolute top-3 right-3 z-10">
                <HiOutlineHeart className="text-white text-2xl" />
              </div>
            </div>
          </Link>

          <div className="px-4 py-1.5">
            {/* Price and City tag on the same line */}
            <div className="flex items-center justify-between mb-1">
              {/* Price and Home Type Tag */}
              <div className="flex items-center gap-0">
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  {listing.price > 500000 ? 
                    `Rs. ${(listing.price / 1000000).toFixed(1)} M` : 
                    `Rs. ${Number(listing.price).toLocaleString()}`}
                </div>
                 {/* Home Type Tag */}
                 {listing.homeType && (
                   <span className="bg-white border border-blue-600 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-full flex-none m-1.5">
                     {listing.homeType === 'Single Family' || listing.homeType === 'Multi Family' || listing.homeType === 'Apartment' ? 'House' : listing.homeType === 'Land' ? 'Land' : 'Other'}
                   </span>
                 )}
              </div>

               {/* City tag */}
               {listing.city && (
                 <span className="bg-white text-black border border-black text-xs font-medium px-2 py-0.5 rounded-md">
                  {listing.city}
                </span>
               )}
            </div>

            {/* Features Summary */}
            <div className="text-sm text-gray-700 dark:text-gray-300 mb-1">
              <span className="font-semibold">{listing.bedrooms} beds</span> | <span className="font-semibold">{listing.attachedBathrooms + (listing.detachedBathrooms || 0)} bath</span> | <span className="font-semibold">{listing.houseArea} sqft</span> - {listing.homeType ? (listing.homeType === 'Single Family' || listing.homeType === 'Multi Family' ? 'Property' : listing.homeType) + ' for sale' : 'for sale'}
            </div>

            {/* Address */}
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {listing.address}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}