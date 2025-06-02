"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheck, FaTimes } from 'react-icons/fa';

const DBMainContentListings = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchListings = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/listings/pending');
            if (response.data.success) {
                setListings(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching listings:', error);
            setError('Failed to load listings');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchListings();
    }, []);

    const handleApproval = async (listingId, status) => {
        try {
            const response = await axios.put(`http://localhost:3000/api/listings/${listingId}/approve`, {
                status: status
            });

            if (response.data.success) {
                // Remove the approved/rejected listing from the list
                setListings(prevListings => 
                    prevListings.filter(listing => listing._id !== listingId)
                );
            }
        } catch (error) {
            console.error('Error updating listing status:', error);
            alert('Failed to update listing status');
        }
    };

    if (loading) {
        return <div className="text-center py-4">Loading listings...</div>;
    }

    if (error) {
        return <div className="text-center py-4 text-red-600">{error}</div>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Pending Listings Approval</h2>
            
            {listings.length === 0 ? (
                <p className="text-gray-500 text-center">No pending listings to approve</p>
            ) : (
                <div className="grid gap-6">
                    {listings.map((listing) => (
                        <div key={listing._id} className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-semibold">{listing.title}</h3>
                                    <p className="text-gray-600">Posted by: {listing.userId?.name || 'Unknown'}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleApproval(listing._id, 'approved')}
                                        className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
                                        title="Approve"
                                    >
                                        <FaCheck />
                                    </button>
                                    <button
                                        onClick={() => handleApproval(listing._id, 'rejected')}
                                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                                        title="Reject"
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <p className="text-gray-600">Price: ${listing.price}</p>
                                    <p className="text-gray-600">Type: {listing.type}</p>
                                    <p className="text-gray-600">Location: {listing.location}</p>
                                </div>
                                <div>
                                    <p className="text-gray-600">Bedrooms: {listing.bedrooms}</p>
                                    <p className="text-gray-600">Bathrooms: {listing.bathrooms}</p>
                                    <p className="text-gray-600">Area: {listing.area} sq ft</p>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h4 className="font-semibold mb-2">Description</h4>
                                <p className="text-gray-700">{listing.description}</p>
                            </div>

                            {listing.images && listing.images.length > 0 && (
                                <div>
                                    <h4 className="font-semibold mb-2">Images</h4>
                                    <div className="grid grid-cols-3 gap-4">
                                        {listing.images.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image}
                                                alt={`Property ${index + 1}`}
                                                className="w-full h-32 object-cover rounded-lg"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DBMainContentListings; 