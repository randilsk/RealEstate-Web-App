"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Link from "next/link";

function LocationConfirmation() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const address = searchParams.get("address");
  const city = searchParams.get("city");
  const district = searchParams.get("district");
  const [coordinates, setCoordinates] = useState(null);

  const handleProceedToListing = () => {
    if (coordinates) {
      router.push(
        `/sell/listing?address=${encodeURIComponent(
          address
        )}&city=${encodeURIComponent(city)}&district=${encodeURIComponent(
          district
        )}&lat=${coordinates.lat}&lng=${coordinates.lng}`
      );
    } else {
      alert("Coordinates not available.");
    }
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (address && city) {
      console.log("Address:", address); // Added console log
      console.log("City:", city); // Added console log

      // Fetch coordinates using Geocoding API
      const fetchCoordinates = async () => {
        const fullAddress = `${address}, ${city}`;
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            fullAddress
          )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        );
        const data = await response.json();
        console.log("Geocoding API response:", data); // Added console log

        if (data.results && data.results.length > 0) {
          const location = data.results[0].geometry.location;
          setCoordinates(location); // { lat: ..., lng: ... }
        } else {
          alert("Unable to find location. Please try again.");
        }
      };
      fetchCoordinates();
    }
  }, [address, city]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <div className="flex items-center justify-center min-h-[85vh] px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col w-full max-w-7xl h-full bg-[#d9d9d9] rounded-md">
          <div className="px-4 sm:px-7 pt-4 sm:pt-5">
            <h1 className="text-2xl sm:text-3xl text-black font-poppins">
              Location Confirmation
            </h1>
            <div className="mt-2 sm:mt-3 text-sm sm:text-[15px] text-black font-poppins">
              {`Address: ${address}, City: ${city}, District: ${district}`}
            </div>
            <div className="mt-3 sm:mt-4">
              <hr className="border-1 border-black" />
            </div>
          </div>

          <div className="flex flex-col flex-1 mt-4 sm:mt-7 px-4 sm:px-7">
            <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] bg-gray-500 rounded-md overflow-hidden">
              {coordinates ? (
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                  center={coordinates}
                  zoom={15}
                >
                  <Marker position={coordinates} />
                </GoogleMap>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-700">
                  Loading map...
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6 sm:mt-8 mb-6 sm:mb-8 justify-center items-center">
              <Button
                className="w-full sm:w-52 bg-[#d9d9d9] border-main-blue text-main-blue hover:bg-main-blue hover:text-white font-bold border-2 text-sm sm:text-base py-2"
                onClick={handleProceedToListing}
              >
                <Link href={"/sell/listing"}>Yes, Correct Location</Link>
              </Button>
              <Button className="w-full sm:w-52 bg-[#d9d9d9] border-main-blue text-main-blue hover:bg-main-blue hover:text-white font-bold border-2 text-sm sm:text-base py-2">
                <Link
                  href={
                    coordinates
                      ? `/sell/location_changing?lat=${coordinates.lat}&lng=${
                          coordinates.lng
                        }&address=${encodeURIComponent(
                          address
                        )}&city=${encodeURIComponent(
                          city
                        )}&district=${encodeURIComponent(district)}`
                      : "#"
                  }
                  onClick={() => {
                    if (!coordinates) alert("Coordinates not available.");
                  }}
                >
                  No, Change Location
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LocationConfirmation;
