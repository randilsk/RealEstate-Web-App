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
      <div className="flex items-center justify-center h-[85vh] ">
        <div className="flex flex-col h-5/6 w-10/12 bg-[#d9d9d9] rounded-md">
          <div className="px-7 pt-5 text-black text-3xl font-poppins">
            Change Location
          </div>
          <div className="px-7 py-2 text-black text-[15px] font-poppins">
            {`Address: ${address}, City: ${city}, District: ${district}`}
            <p> Please confirm the correct location by clicking on the map.</p>
          </div>
          <div className="px-7 ">
            <hr className="border-1 border-black" />
          </div>
          <div className="flex flex-col h-5/6 mt-7 items-center">
            <div className="w-11/12 h-5/6 bg-gray-500">
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={coordinates}
                zoom={15}
                onClick={handleMapClick}
              >
                <Marker position={coordinates} />
              </GoogleMap>
            </div>
            <div className="flex gap-4 py-5">
              <Button
                className="bg-[#d9d9d9] border-main-blue text-main-blue hover:bg-main-blue hover:text-white w-52 font-bold border-2"
                onClick={handleSaveAndContinue}
              >
                Save and Continue
              </Button>
              <Button
                className="bg-[#d9d9d9] border-main-blue text-main-blue hover:bg-main-blue hover:text-white w-52 font-bold border-2"
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
