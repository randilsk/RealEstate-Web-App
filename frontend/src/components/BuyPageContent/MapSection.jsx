"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
  Circle,
  Polygon
} from "@react-google-maps/api";
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

function MapSection({ listings, searchArea, onZoomChange }) {
  const [center, setCenter] = useState({ lat: 7.8731, lng: 80.7718 });
  const [selectedListing, setSelectedListing] = useState(null);
  const [zoom, setZoom] = useState(7); // Suitable zoom for Sri Lanka
  const [map, setMap] = useState(null);
  const searchParams = useSearchParams();
  const [districtCircle, setDistrictCircle] = useState(null);
  const [districtPolygons, setDistrictPolygons] = useState([]);



  // Load Google Maps API with proper configuration
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'script-loader',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  // Center map on first listing if available
  // useEffect(() => {
  //   if (listings && listings.length > 0 && listings[0].lat && listings[0].lng) {
  //     setCenter({ lat: listings[0].lat, lng: listings[0].lng });
  //   }
  // }, [listings]);

  // Handle location selection from header or query params
  useEffect(() => {
    const handleLocationSelected = (event) => {
      const { lat, lng, address } = event.detail;
      setCenter({ lat, lng });
      setZoom(13);
    };

    const handleDistrictSelected = async (event) => {
      const districtName = event.detail.districtName;

      try {
        const res = await fetch("/data/sl-district.json");
        const geojson = await res.json();

        const matchedFeatures = geojson.features.filter(
          (feature) =>
            feature.properties.name.toLowerCase() === districtName.toLowerCase()
        );

        if (matchedFeatures.length > 0) {
          setDistrictPolygons(matchedFeatures);

          // Try to use the first coordinate for center
          const coords = matchedFeatures[0].geometry.coordinates[0][0];
          const centerLat = coords[1];
          const centerLng = coords[0];
          setCenter({ lat: centerLat, lng: centerLng });
          setZoom(10);
        } else {
          console.warn("District not found in GeoJSON:", districtName);
        }
      } catch (error) {
        console.error("Failed to load district boundaries:", error);
      }
    };

    // Example event listeners (uncomment and adjust as needed)
    window.addEventListener('locationSelected', handleLocationSelected);
    window.addEventListener('districtSelected', handleDistrictSelected);

    // Cleanup (uncomment if using event listeners)
    return () => {
      window.removeEventListener('locationSelected', handleLocationSelected);
      window.removeEventListener('districtSelected', handleDistrictSelected);
    };
  }, []);

  const drawDistrictCircle = (location) => {
    setDistrictCircle({
      center: { lat: location.lat, lng: location.lng },
      radius: 15000, // You can adjust this value per district
    });
  };
  

  // Handle zoom changes
  const handleZoomChanged = () => {
    if (map) {
      const newZoom = map.getZoom();
      setZoom(newZoom);
      if (typeof onZoomChange === 'function') {
        onZoomChange(newZoom);
      }
      // Do NOT reset isSearchActive or remove the circle when zoomed out
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

{districtPolygons.map((feature, index) => {
  const coordinates = feature.geometry.coordinates;

  const paths = coordinates.map((ring) =>
    ring.map(([lng, lat]) => ({ lat, lng }))
  );

  return (
    <Polygon
      key={index}
      paths={paths}
      options={{
        strokeColor: "#1E3A8A",
        strokeOpacity: 0.9,
        strokeWeight: 2,
        fillColor: "#60A5FA",
        fillOpacity: 0.1,
        zIndex: 2,
      }}
    />
  );
})}



          {/* Render markers for each filtered listing */}
          {listings.map((listing) =>
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
