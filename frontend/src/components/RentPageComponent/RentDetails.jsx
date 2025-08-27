import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import RentDetailNavbar from "./RentDetailsNavbar";
import { LoadScript } from "@react-google-maps/api";



// const GoogleMap = dynamic(() => import("@react-google-maps/api").then(mod => mod.GoogleMap), { ssr: false });
// const Marker = dynamic(() => import("@react-google-maps/api").then(mod => mod.Marker), { ssr: false });
// const Circle = dynamic(() => import("@react-google-maps/api").then(mod => mod.Circle), { ssr: false });
const GoogleMap = dynamic(() =>
  import("@react-google-maps/api").then((mod) => mod.GoogleMap),
  { ssr: false }
);
const Marker = dynamic(() =>
  import("@react-google-maps/api").then((mod) => mod.Marker),
  { ssr: false }
);
const Circle = dynamic(() =>
  import("@react-google-maps/api").then((mod) => mod.Circle),
  { ssr: false }
);

export default function RentDetail({ listing, allListings, loading, showAllPhotos, setShowAllPhotos }) {
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

  // Use MonthlyRent or price field for rent properties
  const rentPrice = listing.MonthlyRent || listing.monthlyRent || listing.price || 0;

  return (
    <div className="w-full md:w-11/12 lg:w-4/5 xl:w-3/4 2xl:w-4/5 max-w-7xl bg-white shadow-lg overflow-hidden">
     <div className="pt-6 px-10"> <RentDetailNavbar /></div>
      

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
          Rs.{rentPrice > 500000 ? `${(rentPrice / 1000000).toFixed(1)} M` : Number(rentPrice).toLocaleString()}/month
          <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full ml-2">{listing.homeType === 'Single Family' || listing.homeType === 'Multi Family' || listing.homeType === 'Apartment' ? 'House' : listing.homeType === 'Land' ? 'Land' : 'Other'}</span>
        </div>
        <div className="text-gray-700 text-base mt-1">
          {listing.bedrooms} beds | {listing.attachedBathrooms + (listing.detachedBathrooms || 0)} bath | {listing.houseArea} sqft — {listing.homeType ? (listing.homeType === 'Single Family' || listing.homeType === 'Multi Family' ? 'Property' : listing.homeType) + ' for rent' : 'for rent'}
        </div>
        <div className="text-gray-700 text-base mt-1 font-medium">{listing.address}</div>
        <div className="text-gray-500 text-sm mt-1">{listing.city}, {listing.district}</div>
      </div>

      <div className="px-10 py-2">
      {listing.createdAt && <div><b>Listed on:</b> {new Date(listing.createdAt).toLocaleDateString()}</div>}
      </div>

      {/* Rental Specific Information */}
      <div className="px-10 pt-2 pb-4">
        <div className="font-semibold text-lg mb-2 border-b pb-1">Rental Information</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-700">
          <div><b>Monthly Rent:</b> Rs.{Number(rentPrice).toLocaleString()}</div>
          {listing.securityDeposit && <div><b>Security Deposit:</b> Rs.{Number(listing.securityDeposit).toLocaleString()}</div>}
          {listing.leaseTerms && <div><b>Lease Terms:</b> {listing.leaseTerms}</div>}
          {listing.availableFrom && <div><b>Available From:</b> {new Date(listing.availableFrom).toLocaleDateString()}</div>}
          {listing.furnished && <div><b>Furnished:</b> {listing.furnished}</div>}
          {listing.utilitiesIncluded && <div><b>Utilities Included:</b> {listing.utilitiesIncluded}</div>}
          {listing.petPolicy && <div><b>Pet Policy:</b> {listing.petPolicy}</div>}
        </div>
      </div>

      {/* Property Details (International Style, HomeType Aware) */}
      <div className="px-10 pt-2 pb-4">
        <div className="font-semibold text-lg mb-2 border-b pb-1">Property Details</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-700">
          {listing.homeType && <div><b>Type:</b> {listing.homeType}</div>}
          {/* Show only for non-Land and non-Apartment */}
          {(listing.homeType !== 'Land' && listing.homeType !== 'Apartment') && (
            <>
              {listing.bedrooms !== undefined && <div><b>Bedrooms:</b> {listing.bedrooms}</div>}
              {listing.attachedBathrooms !== undefined && <div><b>Attached Bathrooms:</b> {listing.attachedBathrooms}</div>}
              {listing.detachedBathrooms !== undefined && <div><b>Detached Bathrooms:</b> {listing.detachedBathrooms}</div>}
              {listing.floors !== undefined && <div><b>Floors:</b> {listing.floors}</div>}
              {listing.houseArea && <div><b>House Area:</b> {listing.houseArea} sqft</div>}
              {listing.parking && <div><b>Parking:</b> {listing.parking}</div>}
              {listing.buildYear && <div><b>Build Year:</b> {listing.buildYear}</div>}
            </>
          )}
          {/* Show only for Land */}
          {listing.homeType === 'Land' && (
            <>
              {listing.landArea && <div><b>Land Area:</b> {listing.landArea} sqft</div>}
            </>
          )}
          {/* Show for Apartment if present */}
          {listing.homeType === 'Apartment' && (
            <>
              {listing.bedrooms !== undefined && <div><b>Bedrooms:</b> {listing.bedrooms}</div>}
              {listing.attachedBathrooms !== undefined && <div><b>Attached Bathrooms:</b> {listing.attachedBathrooms}</div>}
              {listing.detachedBathrooms !== undefined && <div><b>Detached Bathrooms:</b> {listing.detachedBathrooms}</div>}
              {listing.floors !== undefined && <div><b>Floors:</b> {listing.floors}</div>}
              {listing.houseArea && <div><b>House Area:</b> {listing.houseArea} sqft</div>}
              {listing.parking && <div><b>Parking:</b> {listing.parking}</div>}
              {listing.buildYear && <div><b>Build Year:</b> {listing.buildYear}</div>}
            </>
          )}
        </div>
      </div>

      {/* Amenities (if applicable for rentals) */}
      {listing.amenities && listing.amenities.length > 0 && (
        <div className="px-10 pt-2 pb-4">
          <div className="font-semibold text-lg mb-2 border-b pb-1">Amenities</div>
          <div className="flex flex-wrap gap-2">
            {listing.amenities.map((amenity, index) => (
              <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                {amenity}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      <div className="px-10 py-2">
        <div className="font-semibold text-lg mb-1">What's Special</div>
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
                url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
                scaledSize: { width: 40, height: 40 },
              }}
            />
            {/* Circle for 5km radius */}
            <Circle
              center={{ lat: listing.lat, lng: listing.lng }}
              radius={5000}
              options={{
                fillColor: "#10B981",
                fillOpacity: 0.1,
                strokeColor: "#10B981",
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
        <div className="font-semibold text-lg mb-1">Landlord's Contact Information</div>
        <div className="text-sm text-gray-700">
        {listing.username && <div><b>Landlord Name:</b> {listing.username}</div>}
          <div>📞 <b>Phone:</b></div>
          <div className="ml-4">Primary: {listing.phone || "+1 (123) 456-7890"}</div>
          <div className="mt-2">✉️ <b>Email:</b></div>
          <div className="ml-4">{listing.email || "inquiries@eliterealty.com"}</div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 px-10 py-3 mt-2 text-xs text-gray-600 flex flex-col md:flex-row md:justify-between items-center gap-2 border-t">
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          <span><Link href={"/"}>Home</Link></span>
          <span>Help</span>
          <span>About Us</span>
          <span><Link href={"/policies/privacy_policy"}>Privacy Policy</Link></span>
          <span>Mobile App</span>
          <span>Advertise</span>
          <span>Cookies</span>
        </div>
        <div className="flex gap-2 items-center">
          <Image src="/images/home-image/appstore.png" alt="App Store" width={80} height={24} />
          <Image src="/images/home-image/googleplay.png" alt="Google Play" width={80} height={24} />
        </div>
      </div>
      <div className="text-center text-xs text-gray-400 py-2">© 2025 Urban Nest. All rights reserved.</div>
    </div>
  );
}