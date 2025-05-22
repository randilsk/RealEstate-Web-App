"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

function LocationChange() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialLat = parseFloat(searchParams.get("lat"));
  const initialLng = parseFloat(searchParams.get("lng"));
  const address = searchParams.get("address");
  const city = searchParams.get("city") || "Unknown City"; // Default value
  const district = searchParams.get("district") || "Unknown District"; // Default value

  useEffect(() => {
    console.log("Initial Lat:", initialLat); // Debugging log
    console.log("Initial Lng:", initialLng); // Debugging log
    console.log("Address:", address); // Debugging log
  }, [initialLat, initialLng, address]);

  const [coordinates, setCoordinates] = useState({
    lat: initialLat || 0, // Default to 0 if lat is invalid
    lng: initialLng || 0, // Default to 0 if lng is invalid
  });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const handleMapClick = (event) => {
    setCoordinates({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  const handleSaveAndContinue = () => {
    router.push(
      `/sell/listing?address=${encodeURIComponent(
        address
      )}&city=${encodeURIComponent(city)}&district=${encodeURIComponent(
        district
      )}&lat=${coordinates.lat}&lng=${coordinates.lng}`
    );
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <div className="flex items-center justify-center min-h-[85vh] px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col w-full max-w-7xl h-full bg-[#d9d9d9] rounded-md">
          <div className="px-4 sm:px-7 pt-4 sm:pt-5">
            <h1 className="text-2xl sm:text-3xl text-black font-poppins">
              Change Location
            </h1>
            <div className="mt-2 sm:mt-3 text-sm sm:text-[15px] text-black font-poppins">
              {`Address: ${address}, City: ${city}, District: ${district}`}
              <p className="mt-2">Please confirm the correct location by clicking on the map.</p>
            </div>
            <div className="mt-3 sm:mt-4">
              <hr className="border-1 border-black" />
            </div>
          </div>

          <div className="flex flex-col flex-1 mt-4 sm:mt-7 px-4 sm:px-7">
            <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] bg-gray-500 rounded-md overflow-hidden">
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={coordinates}
                zoom={15}
                onClick={handleMapClick}
              >
                <Marker position={coordinates} />
              </GoogleMap>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6 sm:mt-8 mb-6 sm:mb-8 justify-center items-center">
              <Button
                className="w-full sm:w-52 bg-[#d9d9d9] border-main-blue text-main-blue hover:bg-main-blue hover:text-white font-bold border-2 text-sm sm:text-base py-2"
                onClick={handleSaveAndContinue}
              >
                Save and Continue
              </Button>
              <Button
                className="w-full sm:w-52 bg-[#d9d9d9] border-main-blue text-main-blue hover:bg-main-blue hover:text-white font-bold border-2 text-sm sm:text-base py-2"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LocationChange;
