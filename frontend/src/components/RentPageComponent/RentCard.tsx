"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { HiOutlineHeart } from "react-icons/hi";

type Listing = {
  _id: string;
  images?: string[];
  district?: string;
  price?: number;
  MonthlyRent?: number; // Add this field from your schema
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
  if (!listing) {
    return null;
  }

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
    console.log('MonthlyRent field:', listing.MonthlyRent);
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
    console.error(`Image failed to load at index ${index}:`, failedUrl);
    
    // Check if it's a Cloudinary URL
    if (failedUrl && failedUrl.includes('cloudinary.com')) {
      console.error('Cloudinary image failed to load. Possible causes:');
      console.error('1. Image was deleted from Cloudinary');
      console.error('2. Cloudinary URL is malformed');
      console.error('3. Cloudinary account issues');
      console.error('4. Network connectivity issues');
    }
    
    setImageSources((prev) => {
      const newSources = prev.filter((_, i) => i !== index);
      console.log('Remaining images after error:', newSources);
      return newSources;
    });
  };

  const handleImgLoad = (index: number) => {
    console.log(`Image successfully loaded at index ${index}:`, imageSources[index]);
  };

  // Use MonthlyRent if price is not available (matching your schema)
  const displayPrice = listing.price || listing.MonthlyRent || 0;

  return (
    <div
      key={listing._id}
      className="w-full sm:w-[47%] bg-white border border-gray-200 rounded-xl shadow-md dark:bg-gray-800 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-300"
    >
      <Link href={`/listing/${listing._id}`}>
        <div className="relative h-40">
          {imageSources && imageSources.length > 0 ? (
            <Swiper
              modules={[Pagination, Navigation]}
              spaceBetween={0}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              className="mySwiper h-full"
            >
              {imageSources.map((image, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={image}
                    alt={`${listing.district || "property"} ${index + 1}`}
                    fill
                    className="object-cover"
                    onError={() => handleImgError(index)}
                    onLoad={() => handleImgLoad(index)}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    // Add placeholder for Cloudinary images
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bsW18qeCYmjiutKbgMh8gLKBILZqIrDHnmmQiNzjQiozJemY0+4F8qpKMr/AOD3VkFY4qZ2iyOBJIoSy/TrCIbZmrEH8eQi1TjdbfSMDWl1DyQnWRmWHxGjTdMGPUyYqU/MJH8aeTm5zdvfERbVlLAfKOYT3m+vhKsO0LNSYZuJQcG1+yX2Ry3i4V+7mMOAzrBUY6aeSuoNlgIB5FWm3FYbfsQFkjZdVNM8UgTHFIFY1l3R6fOzCoCpyUJKngrBhRrF2Pm7JdKVZ7HsUdnKVB2CzfGTpKv3OGaKW1yHIKNYwV3k2RYm1N7aEUlLuI05lYYnfqr4bgrw3Ol2/+/o"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-100 text-gray-500 text-sm flex-col gap-1">
              <div>No images available</div>
              <div className="text-xs text-red-400">
                Check console for debug info
              </div>
            </div>
          )}

          <div className="absolute top-3 right-3 z-10">
            <HiOutlineHeart className="text-white text-2xl" />
          </div>
        </div>
      </Link>

      <div className="px-4 py-1.5">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-0">
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              {Number(displayPrice) > 500000
                ? `Rs. ${(Number(displayPrice) / 1000000).toFixed(1)} M`
                : `Rs. ${Number(displayPrice).toLocaleString()}`}
            </div>
            {listing.homeType && (
              <span className="bg-white border border-blue-600 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-full flex-none m-1.5">
                {listing.homeType === "Single Family" ||
                listing.homeType === "Multi Family" ||
                listing.homeType === "Apartment"
                  ? "House"
                  : listing.homeType === "Land"
                  ? "Land"
                  : "Other"}
              </span>
            )}
          </div>

          {listing.city && (
            <span className="bg-white text-black border border-black text-xs font-medium px-2 py-0.5 rounded-md">
              {listing.city}
            </span>
          )}
        </div>

        <div className="text-sm text-gray-700 dark:text-gray-300 mb-1">
          {listing.homeType === "Land" ? (
            <span className="font-semibold">{listing.landArea} sqft</span>
          ) : listing.homeType === "Apartment" ? (
            <>
              <span className="font-semibold">{listing.bedrooms || 0} beds</span>{" "}|{" "}
              <span className="font-semibold">
                {(Number(listing.attachedBathrooms || 0) + Number(listing.detachedBathrooms || 0))} bath
              </span>{" "}|{" "}
              <span className="font-semibold">{listing.houseArea || 0} sqft</span>
            </>
          ) : (
            <>
              <span className="font-semibold">{listing.bedrooms || 0} beds</span>{" "}|{" "}
              <span className="font-semibold">
                {(Number(listing.attachedBathrooms || 0) + Number(listing.detachedBathrooms || 0))} bath
              </span>{" "}|{" "}
              <span className="font-semibold">{listing.houseArea || 0} sqft</span>
            </>
          )}
          {" - "}
          {listing.homeType ? `${listing.homeType} for rent` : "for rent"}
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-400">
          {listing.address || "Address not provided"}
        </div>
      </div>
    </div>
  );
}