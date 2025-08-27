"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function UserListings({ onBack }) {
  const [userListings, setUserListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser?.email) return;

    const fetchUserListings = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:3000/api/listing/user/${currentUser.email}`
        );
        const data = await res.json();
        if (data.error) {
          setError(data.error);
          return;
        }
        setUserListings(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserListings();
  }, [currentUser?.email]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/profile_images/profile1.jpg" // adjust path if needed
          alt="background"
          fill
          priority
          className="object-cover"
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Back Button */}
      <div className="absolute top-4 left-4 z-20">
        <button
          onClick={onBack}
          aria-label="Go back"
          title="Back"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md shadow border border-white/30 hover:bg-white/30 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
        >
          ←
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 max-w-md w-full">
          <h1 className="text-white text-2xl font-light mb-6 text-center">
            My Listings
          </h1>

          {/* Loading / Error */}
          {loading && <p className="text-center text-white">Loading...</p>}
          {error && <p className="text-red-400 text-center">{error}</p>}

          {/* Listings */}
          <div className="space-y-4">
            {userListings.length === 0 && !loading && (
              <p className="text-center text-white/70">No listings found</p>
            )}

            {userListings.map((listing) => (
              <div
                key={listing._id}
                className="bg-white/5 rounded-2xl shadow-inner border border-white/10 p-4 cursor-pointer transform-gpu transition-all duration-200 hover:scale-[1.02] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
                onClick={() => router.push(`/listing/${listing._id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") router.push(`/listing/${listing._id}`);
                }}
              >
                {listing.images && listing.images[0] && (
                  <div className="relative h-48 w-full mb-3 rounded-lg overflow-hidden">
                    <Image
                      src={listing.images[0]}
                      alt='Image'                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <h2 className="font-semibold text-lg text-white">
                  {listing.name}
                </h2>
                <p className="text-yellow-400 font-medium">${listing.price}</p>
                <p className="text-sm text-white/70">{listing.address}</p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 pt-4 border-t border-white/20">
            <p className="text-center text-xs text-white/60">
              UrbanNest - Your trusted property partner
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}