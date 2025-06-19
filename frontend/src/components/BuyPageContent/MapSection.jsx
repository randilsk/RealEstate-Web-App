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
import { useSearchParams } from "next/navigation";

// Define the libraries we need
const libraries = ['maps'];

// Map container style
const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

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
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchParams = useSearchParams();

  // Load Google Maps API with proper configuration
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'script-loader',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
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

    if (isLoaded) {
      getListings();
    }
  }, [isLoaded]);

  // Handle location selection from header or query params
  useEffect(() => {
    const handleLocationSelected = (event) => {
      const { lat, lng, address } = event.detail;
      setCenter({ lat, lng });
      setZoom(13); // Zoom in closer when a location is selected
      setIsSearchActive(true);

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

    // --- NEW: Handle query params for initial load ---
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const address = searchParams.get("address");
    if (lat && lng && address && listings.length > 0) {
      // Simulate the event handler directly
      handleLocationSelected({
        detail: {
          lat: parseFloat(lat),
          lng: parseFloat(lng),
          address,
        },
      });
    }
    // --- END NEW ---

    return () => {
      window.removeEventListener("locationSelected", handleLocationSelected);
    };
  }, [listings, searchParams]);

  // Handle zoom changes
  const handleZoomChanged = () => {
    if (map) {
      const newZoom = map.getZoom();
      setZoom(newZoom);
      
      // If zoomed out enough, show all listings
      if (newZoom <= 11 && isSearchActive) {
        setFilteredListings(listings);
        setIsSearchActive(false);
      }
    }
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

  if (loadError) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-red-500">
        Error loading Google Maps. Please check your API key and try again.
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
        Loading Google Maps...
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
        Loading property listings...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gray-100">
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={zoom}
          options={mapOptions}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onZoomChanged={handleZoomChanged}
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
                onClick={() => handleMarkerClick(listing)}
                icon={{
                  url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
              />
            ) : null
          )}

          {/* Info window for selected listing */}
          {selectedListing && (
            <InfoWindow
              position={{
                lat: selectedListing.lat,
                lng: selectedListing.lng,
              }}
              onCloseClick={handleInfoWindowClose}
            >
              <div className="p-2">
                <h3 className="font-bold">{selectedListing.title}</h3>
                <p>${selectedListing.price.toLocaleString()}</p>
                <p>{selectedListing.address}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </div>
  );
}

export default MapSection;
