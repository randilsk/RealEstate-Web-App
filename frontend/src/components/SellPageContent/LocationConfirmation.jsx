"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Link from "next/link";

function LocationConfirmation() {
  const searchParams = useSearchParams();
  const address = searchParams.get("address");
  const city = searchParams.get("city");
  const [coordinates, setCoordinates] = useState(null);

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
      <div className="flex items-center justify-center h-[85vh] ">
        <div className=" flex flex-col h-5/6 w-10/12 bg-[#d9d9d9] rounded-md">
          <div className="px-7 pt-5 text-black text-3xl font-poppins">
            Location Confirmation
          </div>
          <div className="px-7 py-2 text-black text-[15px] font-poppins">
            {`Address: ${address}, City: ${city}`}
          </div>
          <div className="px-7 ">
            <hr className="border-1 border-black" />
          </div>
          <div className="flex flex-col h-5/6 mt-7 items-center">
            <div className="w-11/12 h-5/6 bg-gray-500">
              {coordinates ? (
                <GoogleMap
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                  center={coordinates}
                  zoom={15}
                >
                  <Marker position={coordinates} />
                </GoogleMap>
              ) : (
                <div>Loading map...</div>
              )}
            </div>
            <div className="flex gap-4 py-5">
              <Button className="bg-[#d9d9d9] border-main-blue text-main-blue hover:bg-main-blue hover:text-white w-52 font-bold border-2">
                <Link href={"/sell/listing"}>Yes, Correct Location</Link>
              </Button>
              <Button className="bg-[#d9d9d9] border-main-blue text-main-blue hover:bg-main-blue hover:text-white w-52 font-bold border-2">
                No, Change Location
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LocationConfirmation;
