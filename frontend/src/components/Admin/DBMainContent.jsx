'use client'
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from "react"; //Hook Componets
import { FaTachometerAlt, FaUsers, FaDollarSign, FaCog, FaBell, FaUserCircle, FaTimes } from 'react-icons/fa';

import axios from 'axios';      //call API

//modal component for the listings
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
                                <th className="border p-2">Username</th>
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
                                    <td className="border p-2">{listing.username}</td>
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



// Modal Component to pop up Active User
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
                                <th className="border p-2">Username</th>
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
                                        <Image 
                                            src={user.avatar} 
                                            alt={user.username} 
                                            width={40}
                                            height={40}
                                            className="rounded-full object-cover"
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

// Reusable Card Component
const StatCard = ({ title, value, icon: Icon, onClick }) => {
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

    // fetch data from backend
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
            const response = await axios.get('http://localhost:3000/api/listing/getallListing');
            console.log('Listings fetched:', response.data); // Debug log
            setListings(response.data);
            setListCount(response.data.length);
        } catch (error) {
            console.error('Error fetching listings:', error);
        } finally {
            setLoading(false);
        }
    };

    //refrech the fetched data
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

    const handleUserCardClick = () => {
        setIsUserModalOpen(true);
    };
    
    const handleListCardClick = () => {
        setIsListingModalOpen(true);
    };

    return (
        <div className="flex-1 bg-gray-100">
            {/* Navbar */}
            
<div className="bg-[#3B50DF] shadow-md p-4 flex justify-between items-center text-white">
    <div className="w-1/3">
        {/* Empty div for spacing */}
    </div>
    <div className="w-1/3 flex justify-center">
        <input 
            type="text" 
            placeholder="Enter an address, city, district, province" 
            className="p-2 border rounded-md w-full text-black" 
        />
    </div>
    <div className="w-1/3 flex justify-end gap-4 text-xl">
        <FaBell className="cursor-pointer hover:text-blue-200 transition-colors" />
        <FaUserCircle className="cursor-pointer hover:text-blue-200 transition-colors" />
    </div>
</div>






            {/* Dashboard */}
            <div className="p-10">
                {/* Cards Section */}
                <div className="flex flex-wrap items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Analytics Overview</h2>
                    <div className="flex gap-2 mt-4 sm:mt-0">
                        <button className="px-4 py-2 bg-white text-gray-600 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">Today</button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Monthly</button>
                        <button className="px-4 py-2 bg-white text-gray-600 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">Yearly</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard 
                        title="Total Listings" 
                        value={loading ? "Loading..." : listCount}  
                        icon={FaTachometerAlt} 
                        onClick={handleListCardClick}
                        iconColor="text-blue-600"
                        percentChange="+12.5% from last month"
                        trend="up"
                    />
                    <StatCard 
                        title="Active Users" 
                        value={loading ? "Loading..." : userCount} 
                        icon={FaUsers} 
                        onClick={handleUserCardClick}
                        iconColor="text-indigo-600"
                        percentChange="+8.3% from last month"
                        trend="up"
                    />
                    <StatCard 
                        title="Revenue" 
                        value="$12,000" 
                        icon={FaDollarSign} 
                        iconColor="text-green-600"
                        percentChange="+5.2% from last month"
                        trend="up"
                    />
                    <StatCard 
                        title="Pending Approvals" 
                        value="15" 
                        icon={FaCog} 
                        iconColor="text-amber-600"
                        percentChange="-2.1% from last month"
                        trend="down"
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
                            <tr>
                                <td className="border p-2">001</td>
                                <td className="border p-2">Luxury Villa</td>
                                <td className="border p-2">Colombo</td>
                                <td className="border p-2">Rs. 30M</td>
                                <td className="border p-2">Approved</td>
                            </tr>
                            <tr>
                                <td className="border p-2">002</td>
                                <td className="border p-2">Land Plot</td>
                                <td className="border p-2">Kandy</td>
                                <td className="border p-2">Rs. 40M</td>
                                <td className="border p-2">Pending</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* User Modal */}
            <UserModal 
                isOpen={isUserModalOpen} 
                onClose={() => setIsUserModalOpen(false)} 
                users={users}
            />
            
            {/* Listing Modal */}
            <ListingModal
                isOpen={isListingModalOpen} 
                onClose={() => setIsListingModalOpen(false)} 
                listings={listings}
            />
        </div>
    );
}


export default DBMainContent;


