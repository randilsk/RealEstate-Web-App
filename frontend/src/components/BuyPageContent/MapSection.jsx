"use client";
import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { fetchAllListings } from "@/lib/api";

function MapSection() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [center, setCenter] = useState({ lat: 33.749, lng: -84.388 }); // Default to Atlanta
  const [selectedListing, setSelectedListing] = useState(null);

  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  // Fetch listings from the API
  useEffect(() => {
    const getListings = async () => {
      try {
        setLoading(true);
        const data = await fetchAllListings();
        setListings(data);

        // If we have listings, center the map on the first one
        if (data.length > 0 && data[0].lat && data[0].lng) {
          setCenter({ lat: data[0].lat, lng: data[0].lng });
        }
      } catch (err) {
        console.error("Error fetching listings:", err);
        setError("Failed to load property listings");
      } finally {
        setLoading(false);
      }
    };

    getListings();
  }, []);

  // Map options
  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: true,
    scaleControl: true,
    streetViewControl: true,
    rotateControl: true,
    fullscreenControl: true,
  };

  // Map container style
  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  // Handle marker click
  const handleMarkerClick = (listing) => {
    setSelectedListing(listing);
  };

  // Handle info window close
  const handleInfoWindowClose = () => {
    setSelectedListing(null);
  };

  if (!isLoaded)
    return (
      <div className="w-1/2 h-screen bg-gray-100 mt-10 flex items-center justify-center">
        Loading Google Maps...
      </div>
    );
  if (loading)
    return (
      <div className="w-1/2 h-screen bg-gray-100 mt-10 flex items-center justify-center">
        Loading property listings...
      </div>
    );
  if (error)
    return (
      <div className="w-1/2 h-screen bg-gray-100 mt-10 flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  return (
    <aside className="w-1/2 h-screen bg-gray-100  overflow-hidden">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
        options={mapOptions}
      >
        {/* Render markers for each listing */}
        {listings.map((listing) =>
          listing.lat && listing.lng ? (
            <Marker
              key={listing._id}
              position={{ lat: listing.lat, lng: listing.lng }}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                scaledSize: new window.google.maps.Size(40, 40),
              }}
              title={listing.address}
              onClick={() => handleMarkerClick(listing)}
            />
          ) : null
        )}

        {/* Info window for selected listing */}
        {selectedListing && (
          <InfoWindow
            position={{ lat: selectedListing.lat, lng: selectedListing.lng }}
            onCloseClick={handleInfoWindowClose}
          >
            <div className="p-2 max-w-xs">
              <h3 className="font-bold text-lg">{selectedListing.address}</h3>
              <p className="text-sm">
                {selectedListing.city}, {selectedListing.district}
              </p>
              {selectedListing.price && (
                <p className="text-sm font-semibold">
                  Price: ${selectedListing.price.toLocaleString()}
                </p>
              )}
              {selectedListing.homeType && (
                <p className="text-sm">Type: {selectedListing.homeType}</p>
              )}
              {selectedListing.bedrooms && (
                <p className="text-sm">Bedrooms: {selectedListing.bedrooms}</p>
              )}
              <button
                className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm"
                onClick={() =>
                  (window.location.href = `/buy/property/${selectedListing._id}`)
                }
              >
                View Details
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </aside>
  );
}

export default MapSection;
