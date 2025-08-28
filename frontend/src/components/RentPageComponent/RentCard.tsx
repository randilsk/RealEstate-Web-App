"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { HiOutlineHeart, HiHeart, HiLocationMarker, HiHome, HiCube } from "react-icons/hi";

type Listing = {
  _id: string;
  images?: string[];
  district?: string;
  price?: number;
  monthlyRent?: number;
  homeType?: string;
  city?: string;
  landArea?: number;
  houseArea?: number;
  bedrooms?: number;
  attachedBathrooms?: number;
  detachedBathrooms?: number;
  address?: string;
};

export default function RentCard({ listing }: { listing: Listing }) {
  const [isLiked, setIsLiked] = useState(false);

  if (!listing) {
    return null;
  }

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  // Debug logging to see the actual listing data
  React.useEffect(() => {
    console.log('=== RENT CARD DEBUG ===');
    console.log('Full listing object:', listing);
    console.log('Images field:', listing.images);
    console.log('Images array length:', listing.images?.length || 0);
    if (listing.images && listing.images.length > 0) {
      console.log('First image URL:', listing.images[0]);
    }
    console.log('Price field:', listing.price);
    console.log('MonthlyRent field:', listing.monthlyRent);
    console.log('=== END DEBUG ===');
  }, [listing]);

  // Function to process image URLs (Cloudinary support)
  const processImageUrl = (imageUrl: string) => {
    if (!imageUrl) return '';
    
    console.log('Processing image URL:', imageUrl);
    
    // If it's already a full URL (Cloudinary or other), return as is
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      console.log('Using full URL as is:', imageUrl);
      return imageUrl;
    }
    
    // If it starts with uploads/ or /uploads/, prepend base URL (local files)
    if (imageUrl.startsWith('uploads/') || imageUrl.startsWith('/uploads/')) {
      const fullUrl = `http://localhost:3000/${imageUrl.replace(/^\//, '')}`;
      console.log('Converted to local full URL:', fullUrl);
      return fullUrl;
    }
    
    // If it's just a filename, assume it's in uploads directory (local files)
    const fullUrl = `http://localhost:3000/uploads/${imageUrl}`;
    console.log('Added local uploads prefix:', fullUrl);
    return fullUrl;
  };

  const [imageSources, setImageSources] = React.useState<string[]>(() => {
    if (listing.images && listing.images.length > 0) {
      console.log('Initializing with images:', listing.images);
      return listing.images.map(img => processImageUrl(img));
    }
    console.log('No images found, initializing empty array');
    return [];
  });

  // Update images when listing changes
  React.useEffect(() => {
    if (listing.images && listing.images.length > 0) {
      const processedImages = listing.images.map(img => processImageUrl(img));
      console.log('Updated processed images:', processedImages);
      setImageSources(processedImages);
    } else {
      console.log('No images to update');
      setImageSources([]);
    }
  }, [listing.images]);

  const handleImgError = (index: number) => {
    const failedUrl = imageSources[index];
    console.warn(`Image failed to load at index ${index}:`, failedUrl);
    
    setImageSources((prev) => {
      const newSources = prev.filter((_, i) => i !== index);
      return newSources;
    });
  };

  const handleImgLoad = (index: number) => {
    console.log(`Image successfully loaded at index ${index}:`, imageSources[index]);
  };

  // Use MonthlyRent if price is not available (matching your schema)
  const displayPrice = listing.price || listing.monthlyRent || 0;

  return (
    <div
      key={listing._id}
      className="group w-full sm:w-[48%] md:w-[48%] lg:w-[48%] xl:w-[48%] 2xl:w-[48%] bg-white border border-gray-100 rounded-2xl shadow-lg dark:bg-gray-900 dark:border-gray-700 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-200 hover:bg-gradient-to-br hover:from-white hover:to-blue-50/20 min-w-0 flex-shrink-0 backdrop-blur-sm"
    >
      <Link href={`/rentdetail_list/${listing._id}`}>
        <div className="relative h-40 sm:h-48 md:h-52 lg:h-56 xl:h-60 overflow-hidden">
          {imageSources && imageSources.length > 0 ? (
            <Swiper
              modules={[Pagination, Navigation]}
              spaceBetween={0}
              slidesPerView={1}
              navigation={{
                nextEl: '.swiper-button-next-custom',
                prevEl: '.swiper-button-prev-custom',
              }}
              pagination={{ 
                clickable: true,
                dynamicBullets: true,
                bulletClass: 'swiper-pagination-bullet opacity-60',
                bulletActiveClass: 'swiper-pagination-bullet-active opacity-100 bg-white'
              }}
              className="mySwiper h-full rounded-t-2xl"
            >
              {imageSources.map((image, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={image}
                    alt={`${listing.district || "property"} ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={() => handleImgError(index)}
                    onLoad={() => handleImgLoad(index)}
                    sizes="(max-width: 640px) 100vw, 50vw"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bsW18qeCYmjiutKbgMh8gLKBILZqIrDHnmmQiNzjQiozJemY0+4F8qpKMr/AOD3VkFY4qZ2iyOBJIoSy/TrCIbZmrEH8eQi1TjdbfSMDWl1DyQnWRmWHxGjTdMGPUyYqU/MJH8aeTm5zdvfERbVlLAfKOYT3m+vhKsO0LNSYZuJQcG1+yX2Ry3i4V+7mMOAzrBUY6aeSuoNlgIB5FWm3FYbfsQFkjZdVNM8UgTHFIFY1l3R6fOzCoCpyUJKngrBhRrF2Pm7JdKVZ7HsUdnKVB2CzfGTpKv3OGaKW1yHIKNYwV3k2RYm1N7aEUlLuI05lYYnfqr4bgrw3Ol2/+/o"
                  />
                </SwiperSlide>
              ))}
              
              {/* Custom Navigation Buttons */}
              <div className="swiper-button-prev-custom absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white cursor-pointer shadow-lg">
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
              <div className="swiper-button-next-custom absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white cursor-pointer shadow-lg">
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Swiper>
          ) : (
            <div className="relative h-full">
              <div className="flex items-center justify-center h-full bg-gray-100 text-gray-500 text-sm flex-col gap-1 group-hover:scale-110 transition-transform duration-700">
                <div>No images available</div>
                <div className="text-xs text-red-400">
                  Check console for debug info
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Heart icon with animation */}
          <div className="absolute top-3 right-3 z-20">
            <button
              onClick={handleLikeClick}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 group/heart"
            >
              {isLiked ? (
                <HiHeart className="text-red-500 text-xl animate-pulse" />
              ) : (
                <HiOutlineHeart className="text-gray-700 text-xl group-hover/heart:text-red-500 transition-colors duration-300" />
              )}
            </button>
          </div>

          {/* Property type badge */}
          <div className="absolute top-3 left-3 z-10">
            <div className="flex items-center gap-1 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
              {listing.homeType === "Land" ? (
                <HiCube className="w-3 h-3" />
              ) : (
                <HiHome className="w-3 h-3" />
              )}
              {listing.homeType === "Single Family" ||
              listing.homeType === "Multi Family" ||
              listing.homeType === "Apartment"
                ? "House"
                : listing.homeType || "Property"}
            </div>
          </div>

          {/* "For Rent" badge */}
          <div className="absolute bottom-3 right-3 z-10">
            <div className="bg-green-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
              For Rent
            </div>
          </div>

          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        </div>
      </Link>

      <div className="px-5 py-4 sm:px-6 sm:py-5">
        {/* Price and City section with enhanced styling */}
        <div className="flex items-start justify-between mb-3 gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-2xl sm:text-3xl md:text-3xl font-bold text-gray-900 dark:text-white truncate bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {Number(displayPrice) > 500000
                ? `Rs. ${(Number(displayPrice) / 1000000).toFixed(1)}M`
                : `Rs. ${Number(displayPrice).toLocaleString()}`}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {listing.homeType
                ? listing.homeType === "Single Family" ||
                  listing.homeType === "Multi Family"
                  ? "Property for rent"
                  : `${listing.homeType} for rent`
                : "for rent"} / month
            </div>
          </div>

          {/* Enhanced City tag */}
          {listing.city && (
            <div className="flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-shadow duration-300 flex-shrink-0">
              <HiLocationMarker className="w-3 h-3" />
              <span className="max-w-20 truncate">{listing.city}</span>
            </div>
          )}
        </div>

        {/* Enhanced Features with icons */}
        <div className="mb-4">
          {listing.homeType === "Land" ? (
            <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg">
                <HiCube className="w-4 h-4 text-green-500" />
                <span className="font-semibold text-sm">{listing.landArea} sqft</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 flex-wrap">
              {(listing.bedrooms || 0) > 0 && (
                <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2L3 9v11h4v-6h6v6h4V9l-7-7z"/>
                  </svg>
                  <span className="font-semibold text-sm">{listing.bedrooms} beds</span>
                </div>
              )}
              
              {((listing.attachedBathrooms || 0) + (listing.detachedBathrooms || 0)) > 0 && (
                <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg">
                  <svg className="w-4 h-4 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 2a2 2 0 00-2 2v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-2V4a2 2 0 00-2-2H8zM7 4a1 1 0 011-1h4a1 1 0 011 1v1H7V4z"/>
                  </svg>
                  <span className="font-semibold text-sm">
                    {(listing.attachedBathrooms || 0) + (listing.detachedBathrooms || 0)} bath
                  </span>
                </div>
              )}
              
              {(listing.houseArea || 0) > 0 && (
                <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg">
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 3a1 1 0 000 2h.01a1 1 0 100-2H5zm4 0a1 1 0 000 2h6a1 1 0 100-2H9z" clipRule="evenodd"/>
                  </svg>
                  <span className="font-semibold text-sm">{listing.houseArea} sqft</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Enhanced Address with location icon */}
        <div className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
          <HiLocationMarker className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm leading-relaxed line-clamp-2">
            {listing.address || "Address not provided"}
          </div>
        </div>

        {/* Call-to-action hint */}
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="text-xs text-gray-500 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link href={`/rentdetail_list/${listing._id}`}>
              Click to view rental details →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}