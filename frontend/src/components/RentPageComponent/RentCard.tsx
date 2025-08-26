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

  const [imageSources, setImageSources] = React.useState<string[]>(
    listing.images && listing.images.length > 0 ? listing.images : []
  );

  const handleImgError = (index: number) => {
    setImageSources((prev) => prev.filter((_, i) => i !== index));
  };

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
                    onError={() => {
                      console.error(`Failed to load image: ${image}`);
                      handleImgError(index);
                    }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-100 text-gray-500 text-sm">
              No images uploaded
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
              {Number(listing.price || 0) > 500000
                ? `Rs. ${(Number(listing.price || 0) / 1000000).toFixed(1)} M`
                : `Rs. ${Number(listing.price || 0).toLocaleString()}`}
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


