import React from "react";
import { FaBell, FaUserCircle, FaCheck, FaTimes, FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from 'react-icons/fa';

function DBMainContentApproveAdds() {
    // Dummy data for listings
    const listings = [
        {
            id: "001",
            title: "Luxury Villa",
            location: "Colombo 7",
            price: "Rs. 30M",
            status: "Pending",
            description: "Beautiful luxury villa with modern amenities",
            bedrooms: 4,
            bathrooms: 3,
            area: "2500 sq ft",
            image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: "002",
            title: "Land Plot",
            location: "Kandy",
            price: "Rs. 40M",
            status: "Pending",
            description: "Prime location land plot with great potential",
            area: "1 acre",
            image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        },
        {
            id: "003",
            title: "Modern Apartment",
            location: "Dehiwala",
            price: "Rs. 15M",
            status: "Pending",
            description: "Contemporary apartment with sea view",
            bedrooms: 2,
            bathrooms: 2,
            area: "1200 sq ft",
            image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        }
    ];

    return (
        <div className="flex-1 bg-gray-100">
            {/* Navbar */}
            <div className="bg-[#3B50DF] shadow-md p-4 flex justify-between items-center text-white">
                <input type="text" placeholder="Enter an address, city, district, province" className="p-2 border rounded-md w-1/3 text-black" />
                <div className="flex gap-4 text-xl">
                    <FaBell />
                    <FaUserCircle />
                </div>
            </div>

            {/* Dashboard */}
            <div className="p-10">
                <h3 className="text-2xl font-bold mb-6">Pending Approvals</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {listings.map((listing) => (
                        <div key={listing.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <img src={listing.image} alt={listing.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h4 className="text-xl font-semibold mb-2">{listing.title}</h4>
                                <p className="text-gray-600 mb-2">{listing.description}</p>
                                <div className="flex items-center text-gray-600 mb-2">
                                    <FaMapMarkerAlt className="mr-2" />
                                    {listing.location}
                                </div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-lg font-bold text-[#3B50DF]">{listing.price}</span>
                                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                                        {listing.status}
                                    </span>
                                </div>
                                <div className="flex gap-4 mb-4">
                                    {listing.bedrooms && (
                                        <div className="flex items-center text-gray-600">
                                            <FaBed className="mr-2" />
                                            {listing.bedrooms} Beds
                                        </div>
                                    )}
                                    {listing.bathrooms && (
                                        <div className="flex items-center text-gray-600">
                                            <FaBath className="mr-2" />
                                            {listing.bathrooms} Baths
                                        </div>
                                    )}
                                    <div className="flex items-center text-gray-600">
                                        <FaRulerCombined className="mr-2" />
                                        {listing.area}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="flex-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 flex items-center justify-center">
                                        <FaCheck className="mr-2" />
                                        Approve
                                    </button>
                                    <button className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 flex items-center justify-center">
                                        <FaTimes className="mr-2" />
                                        Reject
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DBMainContentApproveAdds;