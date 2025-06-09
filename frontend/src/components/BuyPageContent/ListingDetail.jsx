import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import ListingDetailNavbar from "./ListingDetailNavbar";

const GoogleMap = dynamic(() => import("@react-google-maps/api").then(mod => mod.GoogleMap), { ssr: false });
const Marker = dynamic(() => import("@react-google-maps/api").then(mod => mod.Marker), { ssr: false });
const Circle = dynamic(() => import("@react-google-maps/api").then(mod => mod.Circle), { ssr: false });

export default function ListingDetail({ listing, allListings, loading, showAllPhotos, setShowAllPhotos }) {
  if (loading || !listing)
    return <div className="flex justify-center items-center min-h-[60vh]">Loading...</div>;

  // Nearby listings for the map (within 5km)
  const getNearbyListings = () => {
    if (!listing.lat || !listing.lng) return [];
    const R = 6371;
    return allListings.filter((l) => {
      if (!l.lat || !l.lng || l._id === listing._id) return false;
      const dLat = (l.lat - listing.lat) * Math.PI / 180;
      const dLng = (l.lng - listing.lng) * Math.PI / 180;
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(listing.lat * Math.PI / 180) * Math.cos(l.lat * Math.PI / 180) *
        Math.sin(dLng/2) * Math.sin(dLng/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distance = R * c;
      return distance <= 5;
    });
  };

  const nearbyListings = getNearbyListings();

  return (
    <div className="w-full md:w-11/12 lg:w-4/5 xl:w-3/4 2xl:w-2/3 max-w-6xl bg-white shadow-lg overflow-hidden">
     <div className="pt-6 px-10"> <ListingDetailNavbar /></div>
      

      {/* Image Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 py-4 px-10">
        <div className="col-span-2 row-span-2 relative h-40 md:h-60 rounded-lg overflow-hidden">
          <Image src={listing.images?.[0] || "/images/home-image/home-page-image2.png"} alt="Main" fill className="object-cover" />
        </div>
        {listing.images?.slice(1, 5).map((img, idx) => (
          <div key={idx} className="relative h-20 md:h-28 rounded-lg overflow-hidden">
            <Image src={img} alt={`img${idx}`} fill className="object-cover" />
            {idx === 3 && listing.images.length > 5 && (
              <button onClick={() => setShowAllPhotos(true)} className="absolute inset-0 bg-black/60 text-white flex items-center justify-center text-sm font-semibold">See all photos</button>
            )}
          </div>
        ))}
      </div>
      {/* Modal for all photos */}
      {showAllPhotos && (
        <div className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center py-4 px-1">
          <button className="self-end mb-2 text-white text-2xl" onClick={() => setShowAllPhotos(false)}>×</button>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-[80vh] overflow-y-auto">
            {listing.images?.map((img, idx) => (
              <div key={idx} className="relative h-40 md:h-60 rounded-lg overflow-hidden">
                <Image src={img} alt={`img${idx}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary Section */}
      <div className="px-10 pt-2 pb-1">
        <div className="flex flex-wrap items-center gap-2 text-2xl font-bold text-gray-900">
          Rs.{listing.price > 500000 ? `${(listing.price / 1000000).toFixed(1)} M` : Number(listing.price).toLocaleString()}
          <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full ml-2">{listing.homeType === 'Single Family' || listing.homeType === 'Multi Family' || listing.homeType === 'Apartment' ? 'House' : listing.homeType === 'Land' ? 'Land' : 'Other'}</span>
        </div>
        <div className="text-gray-700 text-base mt-1">
          {listing.bedrooms} beds | {listing.attachedBathrooms + (listing.detachedBathrooms || 0)} bath | {listing.houseArea} sqft – {listing.homeType ? (listing.homeType === 'Single Family' || listing.homeType === 'Multi Family' ? 'Property' : listing.homeType) + ' for sale' : 'for sale'}
        </div>
        <div className="text-gray-700 text-base mt-1 font-medium">{listing.address}</div>
        <div className="text-gray-500 text-sm mt-1">{listing.city}, {listing.district}</div>
      </div>

      {/* Description */}
      <div className="px-10 py-2">
        <div className="font-semibold text-lg mb-1">Description</div>
        <div className="text-gray-700 text-sm whitespace-pre-line">{listing.description || "No description provided."}</div>
        <div className="text-gray-400 text-xs mt-2">{listing.createdAt ? new Date(listing.createdAt).toLocaleDateString() : ""} Posted | {listing.views || 0} views</div>
      </div>

      {/* Location Map */}
      <div className="px-10 py-2">
        <div className="font-semibold text-lg mb-1">Location</div>
        <div className="w-full h-64 rounded-lg overflow-hidden">
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={{ lat: listing.lat, lng: listing.lng }}
            zoom={14}
            options={{
              disableDefaultUI: false,
              zoomControl: true,
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: false,
            }}
          >
            {/* Main property marker */}
            <Marker
              position={{ lat: listing.lat, lng: listing.lng }}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                scaledSize: { width: 40, height: 40 },
              }}
            />
            {/* Circle for 5km radius */}
            <Circle
              center={{ lat: listing.lat, lng: listing.lng }}
              radius={5000}
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
            {/* Nearby listings */}
            {nearbyListings.map((l) => (
              <Marker
                key={l._id}
                position={{ lat: l.lat, lng: l.lng }}
                icon={{
                  url: "http://maps.google.com/mapfiles/ms/icons/orange-dot.png",
                  scaledSize: { width: 32, height: 32 },
                }}
                title={l.address}
              />
            ))}
          </GoogleMap>
        </div>
      </div>

      {/* Owner Contact Info */}
      <div className="px-10 py-2">
        <div className="font-semibold text-lg mb-1">Owner's Contact Information</div>
        <div className="text-sm text-gray-700">
          <div>📞 <b>Phone:</b></div>
          <div className="ml-4">Primary: {listing.ownerPhone || "+1 (123) 456-7890"}</div>
          <div className="ml-4">Secondary: {listing.ownerPhone2 || "+1 (123) 555-6789"}</div>
          <div className="mt-2">✉️ <b>Email:</b></div>
          <div className="ml-4">{listing.ownerEmail || "inquiries@eliterealty.com"}</div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 px-10 py-3 mt-2 text-xs text-gray-600 flex flex-col md:flex-row md:justify-between items-center gap-2 border-t">
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          <span>Home</span>
          <span>Help</span>
          <span>About Us</span>
          <span>Privacy Policy</span>
          <span>Mobile App</span>
          <span>Advertise</span>
          <span>Cookies</span>
        </div>
        <div className="flex gap-2 items-center">
          <Image src="/icons/appstore.svg" alt="App Store" width={80} height={24} />
          <Image src="/icons/googleplay.svg" alt="Google Play" width={80} height={24} />
        </div>
      </div>
      <div className="text-center text-xs text-gray-400 py-2">© 2024 Urban Nest. All rights reserved.</div>
    </div>
  );
} 