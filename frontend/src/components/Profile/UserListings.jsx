import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function UserListings({ onBack }) {
  const [userListings, setUserListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    const fetchUserListings = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/user/${currentUser.email}`);
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
  }, [currentUser.email]);

  return (
    <div className="w-full h-screen bg-cover bg-center flex items-center justify-center">
      <div className="w-[425px] rounded-[48px] p-5 max-w-lg mx-auto shadow-lg border bg-[#d9d9d9]">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">My Listings</h1>
          <button
            onClick={onBack}
            className="text-blue-600 hover:underline"
          >
            Back
          </button>
        </div>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="space-y-4">
          {userListings.length === 0 && !loading && (
            <p className="text-center">No listings found</p>
          )}
          
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => router.push(`/listing/${listing._id}`)}
            >
              {listing.images && listing.images[0] && (
                <div className="relative h-48 w-full mb-2">
                  <Image
                    src={listing.images[0]}
                    alt={listing.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              )}
              <h2 className="font-semibold text-lg">{listing.name}</h2>
              <p className="text-gray-600">${listing.price}</p>
              <p className="text-sm text-gray-500">{listing.address}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 