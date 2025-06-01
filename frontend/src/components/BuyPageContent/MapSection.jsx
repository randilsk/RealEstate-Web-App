"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
  Circle,
} from "@react-google-maps/api";
import { fetchAllListings } from "@/lib/api";

function MapSection() {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [center, setCenter] = useState({ lat: 33.749, lng: -84.388 }); // Default to Atlanta
  const [selectedListing, setSelectedListing] = useState(null);
  const [zoom, setZoom] = useState(10);
  const [map, setMap] = useState(null);
  const [searchArea, setSearchArea] = useState(null);

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
        setFilteredListings(data);

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

  // Handle location selection from header
  useEffect(() => {
    const handleLocationSelected = (event) => {
      const { lat, lng, address } = event.detail;
      setCenter({ lat, lng });
      setZoom(13); // Zoom in closer when a location is selected

      // Set search area circle
      setSearchArea({
        center: { lat, lng },
        radius: 5000, // 5km radius
      });

      // Filter listings based on distance from selected location
      const filtered = listings.filter((listing) => {
        if (!listing.lat || !listing.lng) return false;
        
        // Calculate distance between points using Haversine formula
        const R = 6371; // Earth's radius in km
        const dLat = (listing.lat - lat) * Math.PI / 180;
        const dLng = (listing.lng - lng) * Math.PI / 180;
        const a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat * Math.PI / 180) * Math.cos(listing.lat * Math.PI / 180) * 
          Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c;

        return distance <= 5; // Show listings within 5km radius
      });

      setFilteredListings(filtered);
    };

    window.addEventListener("locationSelected", handleLocationSelected);
    return () => {
      window.removeEventListener("locationSelected", handleLocationSelected);
    };
  }, [listings]);

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

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  if (!isLoaded)
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
        Loading Google Maps...
      </div>
    );
  if (loading)
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
        Loading property listings...
      </div>
    );
  if (error)
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  return (
    <div className="w-full h-full bg-gray-100">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
        options={mapOptions}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Search area highlight */}
        {searchArea && (
          <Circle
            center={searchArea.center}
            radius={searchArea.radius}
            options={{
              fillColor: "#4285F4",
              fillOpacity: 0.1,
              strokeColor: "#4285F4",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              clickable: false,
              editable: false,
              visible: true,
              zIndex: 1,
            }}
          />
        )}

        {/* Render markers for each filtered listing */}
        {filteredListings.map((listing) =>
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
    </div>
  );
}

export default MapSection;
