"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import UserReviewForm from './UserReviewForm';

const UserReviews = ({ userId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [averageRating, setAverageRating] = useState(0);

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/reviews?reviewedUserId=${userId}`);
            if (response.data.success) {
                setReviews(response.data.data);
                // Calculate average rating
                const avg = response.data.data.reduce((acc, review) => acc + review.rating, 0) / response.data.data.length;
                setAverageRating(isNaN(avg) ? 0 : avg);
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
    }, [userId]);

    const handleReviewSubmitted = (newReview) => {
        setReviews(prevReviews => [newReview, ...prevReviews]);
        // Recalculate average rating
        const newAvg = [...reviews, newReview].reduce((acc, review) => acc + review.rating, 0) / (reviews.length + 1);
        setAverageRating(newAvg);
    };

    if (loading) {
        return <div className="text-center py-4">Loading reviews...</div>;
    }

    if (error) {
        return <div className="text-center py-4 text-red-600">{error}</div>;
    }

    return (
        <div className="space-y-6">
            {/* Average Rating Display */}
            <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Overall Rating</h3>
                <div className="flex items-center gap-2">
                    <div className="flex">
                        {[...Array(5)].map((_, index) => (
                            <FaStar
                                key={index}
                                className="text-yellow-400"
                                color={index < Math.round(averageRating) ? "#ffc107" : "#e4e5e9"}
                            />
                        ))}
                    </div>
                    <span className="text-gray-600">
                        {averageRating.toFixed(1)} ({reviews.length} reviews)
                    </span>
                </div>
            </div>

            {/* Review Form */}
            <UserReviewForm userId={userId} onReviewSubmitted={handleReviewSubmitted} />
            
            {/* Reviews List */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Reviews</h3>
                {reviews.length === 0 ? (
                    <p className="text-gray-500">No reviews yet.</p>
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
                                By {review.reviewerId?.name || 'Anonymous'}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default UserReviews; 