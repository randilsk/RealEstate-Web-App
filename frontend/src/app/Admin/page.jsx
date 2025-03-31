import React from 'react';
import { FaTachometerAlt, FaBuilding, FaUsers, FaDollarSign, FaChartLine, FaCog, FaBell, FaUserCircle } from 'react-icons/fa';

export default function Dashboard() {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-blue-900 text-white p-5">
                <h2 className="text-center text-2xl font-bold mb-6">Urban Nest</h2>
                <ul className="space-y-4">
                    <li className="flex items-center gap-3 cursor-pointer hover:bg-blue-700 p-2 rounded-md">
                        <FaTachometerAlt /> Dashboard
                    </li>
                    <li className="flex items-center gap-3 cursor-pointer hover:bg-blue-700 p-2 rounded-md">
                        <FaBuilding /> Properties
                    </li>
                    <li className="flex items-center gap-3 cursor-pointer hover:bg-blue-700 p-2 rounded-md">
                        <FaUsers /> Users
                    </li>
                    <li className="flex items-center gap-3 cursor-pointer hover:bg-blue-700 p-2 rounded-md">
                        <FaDollarSign /> Transactions
                    </li>
                    <li className="flex items-center gap-3 cursor-pointer hover:bg-blue-700 p-2 rounded-md">
                        <FaChartLine /> Reports
                    </li>
                    <li className="flex items-center gap-3 cursor-pointer hover:bg-blue-700 p-2 rounded-md">
                        <FaCog /> Settings
                    </li>
                </ul>
            </div>
            
            {/* Main Content */}
            <div className="flex-1 bg-gray-100">
                {/* Navbar */}
                <div className="bg-white shadow-md p-4 flex justify-between items-center">
                    <input type="text" placeholder="Search..." className="p-2 border rounded-md w-1/3" />
                    <div className="flex gap-4 text-xl">
                        <FaBell />
                        <FaUserCircle />
                    </div>
                </div>
                
                {/* Dashboard */}
                <div className="p-6">
                    <div className="grid grid-cols-4 gap-4">
                        <div className="bg-blue-500 p-4 rounded-lg text-white text-center">Total Listings: 120</div>
                        <div className="bg-green-500 p-4 rounded-lg text-white text-center">Active Users: 450</div>
                        <div className="bg-purple-500 p-4 rounded-lg text-white text-center">Revenue: $12,000</div>
                        <div className="bg-red-500 p-4 rounded-lg text-white text-center">Pending Approvals: 15</div>
                    </div>
                    
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
                    
                    <div className="bg-gray-300 mt-6 h-64 rounded-lg flex items-center justify-center">
                        <span className="text-gray-600">Map View Placeholder</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
