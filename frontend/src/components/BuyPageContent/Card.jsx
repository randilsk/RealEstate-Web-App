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

export default function ProductCard({ listing }) {
  if (!listing) {
    return null;
  }

  return (
    <div
      key={listing._id}
      className="w-full sm:w-[48%] md:w-[48%] lg:w-[48%] xl:w-[48%] 2xl:w-[48%] bg-white border border-gray-200 rounded-xl shadow-md dark:bg-gray-800 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-300 min-w-0 flex-shrink-0"
    >
      <Link href={`/listing/${listing._id}`}>
        <div className="relative h-40 sm:h-48 md:h-52 lg:h-56 xl:h-60">
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
                    onError={(e) => {
                      console.error(`Failed to load image: ${image}`);
                      e.target.src = "/images/home-image/home-page-image2.png";
                    }}
                    sizes="(max-width: 640px) 100vw, 50vw"
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
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          )}

          {/* Heart icon overlay */}
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
            <HiOutlineHeart className="text-white text-xl sm:text-2xl drop-shadow-md" />
          </div>
        </div>
      </Link>

      <div className="px-4 py-2 sm:px-5 sm:py-3 md:px-6 md:py-3">
        {/* Price and City tag on the same line */}
        <div className="flex items-center justify-between mb-1 gap-2">
          {/* Price and Home Type Tag */}
          <div className="flex items-center gap-0 min-w-0 flex-1">
            <div className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white truncate">
              {listing.price > 500000
                ? `Rs. ${(listing.price / 1000000).toFixed(1)} M`
                : `Rs. ${Number(listing.price).toLocaleString()}`}
            </div>
            {/* Home Type Tag */}
            {listing.homeType && (
              <span className="bg-white border border-blue-600 text-blue-600 text-xs sm:text-xs md:text-xs font-medium px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-full flex-none ml-1 sm:ml-1.5 whitespace-nowrap">
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

          {/* City tag */}
          {listing.city && (
            <span className="bg-white text-black border border-black text-xs sm:text-xs md:text-xs font-medium px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-md flex-shrink-0 max-w-[80px] sm:max-w-none truncate">
              {listing.city}
            </span>
          )}
        </div>

        {/* Features Summary */}
        <div className="text-sm sm:text-base md:text-base text-gray-700 dark:text-gray-300 mb-1 leading-relaxed">
          {listing.homeType === "Land" ? (
            <span className="font-semibold">{listing.landArea} sqft</span>
          ) : listing.homeType === "Apartment" ? (
            <div className="flex flex-wrap items-center gap-x-1">
              <span className="font-semibold whitespace-nowrap">
                {listing.bedrooms || 0} beds
              </span>
              <span className="hidden xs:inline">|</span>
              <span className="font-semibold whitespace-nowrap">
                {listing.attachedBathrooms + (listing.detachedBathrooms || 0)}{" "}
                bath
              </span>
              <span className="hidden xs:inline">|</span>
              <span className="font-semibold whitespace-nowrap">
                {listing.houseArea || 0} sqft
              </span>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-x-1">
              <span className="font-semibold whitespace-nowrap">
                {listing.bedrooms || 0} beds
              </span>
              <span className="hidden xs:inline">|</span>
              <span className="font-semibold whitespace-nowrap">
                {listing.attachedBathrooms + (listing.detachedBathrooms || 0)}{" "}
                bath
              </span>
              <span className="hidden xs:inline">|</span>
              <span className="font-semibold whitespace-nowrap">
                {listing.houseArea || 0} sqft
              </span>
            </div>
          )}
          <span className="block xs:inline">
            {listing.homeType === "Land" ? "" : " - "}
            {listing.homeType
              ? listing.homeType === "Single Family" ||
                listing.homeType === "Multi Family"
                ? "Property for sale"
                : `${listing.homeType} for sale`
              : "for sale"}
          </span>
        </div>

        {/* Address */}
        <div className="text-sm sm:text-base md:text-base text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
          {listing.address || "Address not provided"}
        </div>
      </div>
    </div>
  );
}