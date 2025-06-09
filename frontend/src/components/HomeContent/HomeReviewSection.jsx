"use client";

import React, { useState } from "react";
import { FaStar } from 'react-icons/fa';

function HomeReviewSection() {
    const [reviews, setReviews] = useState([
        { id: 1, name: "Alice B.", rating: 5, comment: "Fantastic platform! Found my dream home quickly and easily. Highly recommended." },
        { id: 2, name: "Bob C.", rating: 4, comment: "Great user experience. The search filters are very helpful. Would love to see more listings in my area." },
        { id: 3, name: "Charlie D.", rating: 5, comment: "Smooth process from start to finish. The team was very supportive throughout." }
    ]);
    const [newReview, setNewReview] = useState({ name: '', rating: 0, comment: '' });
    const [hover, setHover] = useState(0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReview({ ...newReview, [name]: value });
    };

    const handleSubmitReview = (e) => {
        e.preventDefault();
        if (newReview.name && newReview.rating > 0 && newReview.comment) {
            setReviews([...reviews, { ...newReview, id: reviews.length + 1 }]);
            setNewReview({ name: '', rating: 0, comment: '' });
            setHover(0); // Reset hover state for stars
        } else {
            alert("Please fill in all review fields and select a rating.");
        }
    };

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">What Our Users Say</h2>

                {/* Existing Reviews */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center mb-3">
                                {[...Array(5)].map((star, index) => {
                                    const ratingValue = index + 1;
                                    return (
                                        <FaStar
                                            key={index}
                                            className="cursor-pointer"
                                            color={ratingValue <= review.rating ? "#ffc107" : "#e4e5e9"}
                                            size={20}
                                        />
                                    );
                                })}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">{review.name}</h3>
                            <p className="text-gray-600 mt-2">{review.comment}</p>
                        </div>
                    ))}
                </div>

                {/* Submit A Review */}
                <div className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Leave a Review</h2>
                    <form onSubmit={handleSubmitReview} className="space-y-5">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={newReview.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Your Rating</label>
                            <div className="flex">
                                {[...Array(5)].map((star, index) => {
                                    const ratingValue = index + 1;
                                    return (
                                        <FaStar
                                            key={index}
                                            className="cursor-pointer transition-colors duration-200"
                                            color={ratingValue <= (hover || newReview.rating) ? "#ffc107" : "#e4e5e9"}
                                            size={30}
                                            onClick={() => setNewReview({ ...newReview, rating: ratingValue })}
                                            onMouseEnter={() => setHover(ratingValue)}
                                            onMouseLeave={() => setHover(0)}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
                            <textarea
                                id="comment"
                                name="comment"
                                value={newReview.comment}
                                onChange={handleInputChange}
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Share your experience..."
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-200 text-lg font-semibold"
                        >
                            Submit Review
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default HomeReviewSection; 