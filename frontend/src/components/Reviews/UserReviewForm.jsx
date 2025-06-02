"use client";
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';

const UserReviewForm = ({ reviewedUserId, onReviewSubmitted }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [hover, setHover] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const currentUser = useSelector((state) => state.user.currentUser);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!currentUser) {
            alert('Please login to submit a review');
            return;
        }

        if (currentUser._id === reviewedUserId) {
            alert('You cannot review yourself');
            return;
        }

        if (rating === 0) {
            alert('Please select a rating');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await axios.post('http://localhost:3000/api/reviews', {
                reviewedUserId,
                reviewerId: currentUser._id,
                rating,
                comment
            });

            if (response.data.success) {
                setRating(0);
                setComment('');
                if (onReviewSubmitted) {
                    onReviewSubmitted(response.data.data);
                }
                alert('Review submitted successfully!');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Failed to submit review. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Rating</label>
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, index) => {
                            const ratingValue = index + 1;
                            return (
                                <FaStar
                                    key={index}
                                    className="cursor-pointer text-2xl"
                                    color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                    onClick={() => setRating(ratingValue)}
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(0)}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Comment</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        rows="4"
                        placeholder="Share your experience with this user..."
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
            </form>
        </div>
    );
};

export default UserReviewForm; 