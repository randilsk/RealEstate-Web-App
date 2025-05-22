'use client';
import Link from 'next/link';
import React, { useState, useEffect } from "react";
import { FaTachometerAlt, FaUsers, FaDollarSign, FaCog, FaBell, FaUserCircle, FaTimes } from 'react-icons/fa';
import axios from 'axios'; //call api
import { Component, List } from "lucide-react";
import Navbar from './../Navbar/page';
import dayjs from "dayjs"; // npm install dayjsnp



// Modal Component for Listings
const ListingModal = ({ isOpen, onClose, listings }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-3/4 max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Listing Information</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FaTimes size={24} />
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                
                                <th className="border p-2">Email</th>
                                <th className="border p-2">Date</th>
                                <th className="border p-2">Price</th>
                                <th className="border p-2">District</th>
                                <th className="border p-2">Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listings.map((listing, index) => (
                                <tr key={index}>
                                   
                                    <td className="border p-2">{listing.email}</td>
                                    <td className="border p-2">
                                        {new Date(listing.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="border p-2">{listing.price}</td>
                                    <td className="border p-2">{listing.district}</td>
                                    <td className="border p-2">
                                        <button className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// Modal Component for Users
const UserModal = ({ isOpen, onClose, users }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-3/4 max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">User Information</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FaTimes size={24} />
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                               <th className='border p-2'>Username</th>
                                <th className="border p-2">Email</th>
                                <th className="border p-2">Avatar</th>
                                <th className="border p-2">Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td className="border p-2">{user.username}</td>
                                    <td className="border p-2">{user.email}</td>
                                    <td className="border p-2">
                                        <img 
                                            src={user.avatar} 
                                            alt={user.username} 
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    </td>
                                    <td className="border p-2">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const PendingApprovalModal = ({ isOpen, onClose, listings, onApprove }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-3/4 max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Pending Approvals</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FaTimes size={24} />
                    </button>
                </div>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Date</th>
                            <th className="border p-2">Price</th>
                            <th className="border p-2">District</th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listings.map((listing) => (
                            <tr key={listing._id}>
                                <td className="border p-2">{listing.email}</td>
                                <td className="border p-2">
                                    {new Date(listing.createdAt).toLocaleDateString()}
                                </td>
                                <td className="border p-2">{listing.price}</td>
                                <td className="border p-2">{listing.district}</td>
                                <td className="border p-2">
                                    <button 
                                        onClick={() => onApprove(listing._id)} 
                                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                    >
                                        Approve
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


// Reusable Stat Card Component
const StatCard = ({ title, value, icon: Icon, href, onClick }) => {
    return (
        <div 
            onClick={onClick}
            className="bg-white p-4 rounded-lg shadow text-center hover:bg-gray-100 transition duration-200 cursor-pointer"
        >
            <div className="text-2xl mb-2 flex justify-center text-blue-600">
                <Icon />
            </div>
            <p className="text-gray-600">{title}</p>
            <p className="text-xl font-bold">{value}</p>
        </div>
    );
};

function DBMainContent() {
    const [userCount, setUserCount] = useState(0);
    const [listCount, setListCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [listings, setListings] = useState([]);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isListingModalOpen, setIsListingModalOpen] = useState(false);
    const [pendingListings, setPendingListings] = useState([]);
    const [isPendingModalOpen, setIsPendingModalOpen] = useState(false);
    const [filter, setFilter] = useState("monthly");
    const [filteredListings, setFilteredListings] = useState([]);
    


    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/auth/users');
            setUsers(response.data);
            setUserCount(response.data.length);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };
    
    const fetchListings = async () => {
        try {
            const response = await axios.get('/api/listing/getallListing');
            setListings(response.data);
            setListCount(response.data.length);
        } catch (error) {
            console.error('Error fetching listings:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPendingListings = async () => {
        try {
            const response = await axios.get('/api/listing/pending-approvals');
            setPendingListings(response.data);
        } catch (error) {
            console.error('Error fetching pending listings:', error);
        }
    };

    const handleApprove = async (id) => {
        try {
            await axios.put(`/api/approval/approve/${id}`);
            setPendingListings((prev) => prev.filter((listing) => listing._id !== id));
        } catch (error) {
            console.error('Error approving listing:', error);
        }
    };
    

    
    useEffect(() => {
        fetchUsers();
        const interval = setInterval(fetchUsers, 30000);
        return () => clearInterval(interval);
    }, []);
    
    useEffect(() => {
        fetchListings();
        const interval = setInterval(fetchListings, 30000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const now = dayjs();
        let filtered = [];
    
        if (filter === "today") {
            filtered = listings.filter(l =>
                dayjs(l.createdAt).isSame(now, 'day')
            );
        } else if (filter === "monthly") {
            filtered = listings.filter(l =>
                dayjs(l.createdAt).isSame(now, 'month')
            );
        } else if (filter === "yearly") {
            filtered = listings.filter(l =>
                dayjs(l.createdAt).isSame(now, 'year')
            );
        }
    
        setFilteredListings(filtered);
    }, [filter, listings]);
    

    return (
        <div className="flex-1 bg-gray-100">
            {/* Navbar */}
            <div className="bg-[#3B50DF] flex justify-between items-center text-white">
                <Navbar/>
            </div>

            {/* Dashboard */}
            <div className="p-10">
                <div className="flex flex-wrap items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Analytics Overview</h2>
                    <div className="flex gap-2 mt-4 sm:mt-0">
    {["today", "monthly", "yearly"].map((key) => (
        <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-md transition-colors ${
                filter === key
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
        >
            {key.charAt(0).toUpperCase() + key.slice(1)}
        </button>
    ))}
</div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard 
                        title="Total Listings" 
                        value={loading ? "Loading..." : listCount}  
                        icon={FaTachometerAlt} 
                        onClick={() => setIsListingModalOpen(true)}
                    />
                    <StatCard 
                        title="Active Users" 
                        value={loading ? "Loading..." : userCount} 
                        icon={FaUsers} 
                        onClick={() => setIsUserModalOpen(true)}
                    />
                    <StatCard 
                        title="Revenue" 
                        value="$12,000" 
                        icon={FaDollarSign} 
                    />
                    <StatCard 
                        title="Pending Approvals"
                         value={pendingListings.length}
                        icon={FaCog}
                        onClick={() => {
                        fetchPendingListings();
                        setIsPendingModalOpen(true);
                                         }}
/>

                </div>

                {/* Recent Properties Table */}
                <div className="bg-white mt-6 p-6 rounded-lg shadow">
                    <h3 className="text-xl font-bold mb-4">Recent Properties</h3>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-2">ID</th>
                                <th className="border p-2">Title</th>
                                <th className="border p-2">Location</th>
                                <th className="border p-2">Price</th>
                                <th className="border p-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
    {listings.slice(0, 5).map((listing, index) => (
        <tr key={listing._id}>
            <td className="border p-2">{index + 1}</td>
            <td className="border p-2">{listing.title}</td>
            <td className="border p-2">{listing.district || listing.location}</td>
            <td className="border p-2">Rs. {listing.price}</td>
            <td className="border p-2">
                {listing.approved ? (
                    <span className="text-green-600 font-semibold">Approved</span>
                ) : (
                    <span className="text-yellow-600 font-semibold">Pending</span>
                )}
            </td>
        </tr>
    ))}
</tbody>

                    </table>
                </div>
            </div>

            {/* Modals */}
            <UserModal 
                isOpen={isUserModalOpen} 
                onClose={() => setIsUserModalOpen(false)} 
                users={users}
            />
            <ListingModal
                isOpen={isListingModalOpen} 
                onClose={() => setIsListingModalOpen(false)} 
                listings={listings}
            />

            <PendingApprovalModal
                isOpen={isPendingModalOpen}
                onClose={() => setIsPendingModalOpen(false)}
                listings={pendingListings}
                onApprove={handleApprove}
/>
        </div>
    );
}

export default DBMainContent;
