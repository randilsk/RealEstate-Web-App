"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import UserReview from './UserReview';

const PropertyReviews = ({ propertyId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/reviews?propertyId=${propertyId}`);
            if (response.data.success) {
                setReviews(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
            setError('Failed to load reviews');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [propertyId]);

    const handleReviewSubmitted = (newReview) => {
        setReviews(prevReviews => [newReview, ...prevReviews]);
    };

    if (loading) {
        return <div className="text-center py-4">Loading reviews...</div>;
    }

    if (error) {
        return <div className="text-center py-4 text-red-600">{error}</div>;
    }

    return (
        <div className="space-y-6">
            <UserReview propertyId={propertyId} onReviewSubmitted={handleReviewSubmitted} />
            
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Reviews ({reviews.length})</h3>
                {reviews.length === 0 ? (
                    <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review._id} className="bg-white p-4 rounded-lg shadow">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="flex">
                                    {[...Array(5)].map((_, index) => (
                                        <FaStar
                                            key={index}
                                            className="text-yellow-400"
                                            color={index < review.rating ? "#ffc107" : "#e4e5e9"}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-500">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                            <p className="text-sm text-gray-500 mt-2">
                                By {review.userId?.name || 'Anonymous'}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PropertyReviews; 