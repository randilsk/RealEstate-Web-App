'use client'
import React, { useState, useEffect } from "react";
import { FaTachometerAlt, FaUsers, FaDollarSign, FaCog, FaBell, FaUserCircle, FaTimes } from 'react-icons/fa';
import axios from 'axios';

// Modal Component
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

// Reusable Card Component
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
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    useEffect(() => {
        fetchUsers();
        const interval = setInterval(fetchUsers, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleUserCardClick = () => {
        setIsModalOpen(true);
    };

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
                {/* Cards Section */}
                <div className="grid grid-cols-4 gap-10">
                    <StatCard title="Total Listings" value="120" icon={FaTachometerAlt} href="/listings" />
                    <StatCard 
                        title="Active Users" 
                        value={loading ? "Loading..." : userCount} 
                        icon={FaUsers} 
                        onClick={handleUserCardClick}
                    />
                    <StatCard title="Revenue" value="$12,000" icon={FaDollarSign} href="/revenue" />
                    <StatCard title="Pending Approvals" value="15" icon={FaCog} href="/Admin/ApproveAdds" />
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
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                users={users}
            />
        </div>
    );
}

export default DBMainContent;