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
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    );

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
    <div className="w-full md:w-11/12 lg:w-4/5 xl:w-3/4 2xl:w-4/5 max-w-7xl bg-white shadow-2xl overflow-hidden rounded-3xl border border-gray-100">
      <div className="pt-8 px-6 md:px-10 bg-gradient-to-r from-blue-50 to-purple-50">
        <ListingDetailNavbar />
      </div>

      {/* Image Gallery with Modern Layout */}
      <div className="relative px-6 md:px-10 py-6 bg-gradient-to-b from-blue-50/30 to-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="col-span-2 row-span-2 relative h-48 md:h-72 rounded-2xl overflow-hidden shadow-lg group">
            <Image 
              src={listing.images?.[0] || "/images/home-image/home-page-image2.png"} 
              alt="Main" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          {listing.images?.slice(1, 5).map((img, idx) => (
            <div key={idx} className="relative h-20 md:h-32 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group">
              <Image src={img} alt={`img${idx}`} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              {idx === 3 && listing.images.length > 5 && (
                <button 
                  onClick={() => setShowAllPhotos(true)} 
                  className="absolute inset-0 bg-black/70 backdrop-blur-sm text-white flex items-center justify-center text-sm font-semibold hover:bg-black/80 transition-all duration-300 rounded-xl"
                >
                  <span className="flex flex-col items-center gap-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    See all photos
                  </span>
                </button>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Modern Photo Modal */}
      {showAllPhotos && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center py-6 px-4">
          <button 
            className="self-end mb-4 text-white hover:text-gray-300 transition-colors duration-200 bg-white/10 backdrop-blur-sm rounded-full p-3 hover:bg-white/20" 
            onClick={() => setShowAllPhotos(false)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[85vh] overflow-y-auto rounded-2xl bg-gray-900/20 backdrop-blur-sm p-4">
            {listing.images?.map((img, idx) => (
              <div key={idx} className="relative h-48 md:h-60 rounded-xl overflow-hidden shadow-xl">
                <Image src={img} alt={`img${idx}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Summary Section */}
      <div className="px-6 md:px-10 pt-6 pb-4">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Rs.{listing.price > 500000 ? `${(listing.price / 1000000).toFixed(1)} M` : Number(listing.price).toLocaleString()}
          </div>
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
            {listing.homeType === 'Single Family' || listing.homeType === 'Multi Family' || listing.homeType === 'Apartment' ? 'House' : listing.homeType === 'Land' ? 'Land' : 'Other'}
          </span>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 text-gray-700 text-base mb-3">
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2L3 9v11h4v-6h6v6h4V9l-7-7z"/>
            </svg>
            <span className="font-semibold">{listing.bedrooms} beds</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
            <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 2a2 2 0 00-2 2v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-2V4a2 2 0 00-2-2H8zM7 4a1 1 0 011-1h4a1 1 0 011 1v1H7V4z"/>
            </svg>
            <span className="font-semibold">{listing.attachedBathrooms + (listing.detachedBathrooms || 0)} bath</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
            <svg className="w-4 h-4 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 3a1 1 0 000 2h.01a1 1 0 100-2H5zm4 0a1 1 0 000 2h6a1 1 0 100-2H9z" clipRule="evenodd"/>
            </svg>
            <span className="font-semibold">{listing.houseArea} sqft</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-gray-700 text-base mb-2">
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">{listing.address}</span>
        </div>
        <div className="text-gray-500 text-sm ml-7">{listing.city}, {listing.district}</div>
        <div className="text-gray-500 text-sm ml-7 mt-1">
          {listing.homeType ? (listing.homeType === 'Single Family' || listing.homeType === 'Multi Family' ? 'Property' : listing.homeType) + ' for sale' : 'for sale'}
        </div>
      </div>

      {/* Listed Date */}
      <div className="px-6 md:px-10 py-2">
        {listing.createdAt && (
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span><b>Listed on:</b> {new Date(listing.createdAt).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      {/* Modern Property Details Card */}
      <div className="mx-6 md:mx-10 mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-lg border border-blue-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800">Property Details</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {listing.homeType && (
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-sm text-gray-600">Type</div>
              <div className="text-lg font-semibold text-gray-800">{listing.homeType}</div>
            </div>
          )}
          {/* Show only for non-Land and non-Apartment */}
          {(listing.homeType !== 'Land' && listing.homeType !== 'Apartment') && (
            <>
              {listing.bedrooms !== undefined && (
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-sm text-gray-600">Bedrooms</div>
                  <div className="text-lg font-semibold text-gray-800">{listing.bedrooms}</div>
                </div>
              )}
              {listing.attachedBathrooms !== undefined && (
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-sm text-gray-600">Attached Bathrooms</div>
                  <div className="text-lg font-semibold text-gray-800">{listing.attachedBathrooms}</div>
                </div>
              )}
              {listing.detachedBathrooms !== undefined && (
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-sm text-gray-600">Detached Bathrooms</div>
                  <div className="text-lg font-semibold text-gray-800">{listing.detachedBathrooms}</div>
                </div>
              )}
              {listing.floors !== undefined && (
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-sm text-gray-600">Floors</div>
                  <div className="text-lg font-semibold text-gray-800">{listing.floors}</div>
                </div>
              )}
              {listing.houseArea && (
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-sm text-gray-600">House Area</div>
                  <div className="text-lg font-semibold text-gray-800">{listing.houseArea} sqft</div>
                </div>
              )}
              {listing.parking && (
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-sm text-gray-600">Parking</div>
                  <div className="text-lg font-semibold text-gray-800">{listing.parking}</div>
                </div>
              )}
              {listing.buildYear && (
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-sm text-gray-600">Build Year</div>
                  <div className="text-lg font-semibold text-gray-800">{listing.buildYear}</div>
                </div>
              )}
            </>
          )}
          {/* Show only for Land */}
          {listing.homeType === 'Land' && (
            <>
              {listing.landArea && (
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-sm text-gray-600">Land Area</div>
                  <div className="text-lg font-semibold text-gray-800">{listing.landArea} sqft</div>
                </div>
              )}
            </>
          )}
          {/* Show for Apartment if present */}
          {listing.homeType === 'Apartment' && (
            <>
              {listing.bedrooms !== undefined && (
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-sm text-gray-600">Bedrooms</div>
                  <div className="text-lg font-semibold text-gray-800">{listing.bedrooms}</div>
                </div>
              )}
              {listing.attachedBathrooms !== undefined && (
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-sm text-gray-600">Attached Bathrooms</div>
                  <div className="text-lg font-semibold text-gray-800">{listing.attachedBathrooms}</div>
                </div>
              )}
              {listing.detachedBathrooms !== undefined && (
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-sm text-gray-600">Detached Bathrooms</div>
                  <div className="text-lg font-semibold text-gray-800">{listing.detachedBathrooms}</div>
                </div>
              )}
              {listing.floors !== undefined && (
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-sm text-gray-600">Floors</div>
                  <div className="text-lg font-semibold text-gray-800">{listing.floors}</div>
                </div>
              )}
              {listing.houseArea && (
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-sm text-gray-600">House Area</div>
                  <div className="text-lg font-semibold text-gray-800">{listing.houseArea} sqft</div>
                </div>
              )}
              {listing.parking && (
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-sm text-gray-600">Parking</div>
                  <div className="text-lg font-semibold text-gray-800">{listing.parking}</div>
                </div>
              )}
              {listing.buildYear && (
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="text-sm text-gray-600">Build Year</div>
                  <div className="text-lg font-semibold text-gray-800">{listing.buildYear}</div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modern Description Section */}
      <div className="mx-6 md:mx-10 mb-6 bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-slate-600 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800">What's Special</h3>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line mb-3">
            {listing.description || "No description provided."}
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-500 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              {listing.createdAt ? new Date(listing.createdAt).toLocaleDateString() : ""} Posted
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
              </svg>
              {listing.views || 0} views
            </div>
          </div>
        </div>
      </div>

      {/* Modern Location Section */}
      <div className="mx-6 md:mx-10 mb-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 shadow-lg border border-emerald-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800">Location</h3>
        </div>
        <div className="bg-white rounded-xl overflow-hidden shadow-lg">
          <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden">
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
                styles: [
                  {
                    featureType: "all",
                    elementType: "geometry.fill",
                    stylers: [{ weight: "2.00" }]
                  },
                  {
                    featureType: "all",
                    elementType: "geometry.stroke",
                    stylers: [{ color: "#9c9c9c" }]
                  }
                ]
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
      </div>

      {/* Modern Contact Information Card */}
      <div className="mx-6 md:mx-10 mb-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 shadow-lg border border-indigo-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800">Owner's Contact Information</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {listing.username && (
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-sm text-gray-600">Owner Name</div>
              <div className="text-lg font-semibold text-gray-800">{listing.username}</div>
            </div>
          )}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div class="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              Phone
            </div>
            <div className="text-lg font-semibold text-gray-800">
              Primary: {listing.phone || "+1 (123) 456-7890"}
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm md:col-span-2">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              Email
            </div>
            <div className="text-lg font-semibold text-gray-800">
              {listing.email || "inquiries@eliterealty.com"}
            </div>
          </div>
        </div>
      </div>

      {/* Modern Footer */}
      <div className="bg-gradient-to-r from-gray-50 to-slate-100 px-6 md:px-10 py-6 mt-4 border-t border-gray-200">
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 mb-4">
          <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">
              Home
            </Link>
            <span className="text-gray-600 hover:text-blue-600 transition-colors duration-200 cursor-pointer font-medium">Help</span>
            <span className="text-gray-600 hover:text-blue-600 transition-colors duration-200 cursor-pointer font-medium">About Us</span>
            <Link href="/policies/privacy_policy" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium">
              Privacy Policy
            </Link>
            <span className="text-gray-600 hover:text-blue-600 transition-colors duration-200 cursor-pointer font-medium">Mobile App</span>
            <span className="text-gray-600 hover:text-blue-600 transition-colors duration-200 cursor-pointer font-medium">Advertise</span>
            <span className="text-gray-600 hover:text-blue-600 transition-colors duration-200 cursor-pointer font-medium">Cookies</span>
          </div>
          <div className="flex gap-3 items-center">
            <div className="bg-white rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow duration-200">
              <Image src="/images/home-image/appstore.png" alt="App Store" width={80} height={24} className="rounded" />
            </div>
            <div className="bg-white rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow duration-200">
              <Image src="/images/home-image/googleplay.png" alt="Google Play" width={80} height={24} className="rounded" />
            </div>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-200">
          © 2025 Urban Nest. All rights reserved.
        </div>
      </div>
    </div>
  );
}