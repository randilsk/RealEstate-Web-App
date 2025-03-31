import React from "react";
import { FaTachometerAlt, FaBuilding, FaUsers, FaDollarSign, FaChartLine, FaCog, FaBell, FaUserCircle } from 'react-icons/fa';

function DBMainContent() {
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
                    <div className="grid grid-cols-4 gap-10">
                        <div className="bg-white p-4 rounded-lg shadow text-center">
                            <p className="text-gray-600">Total Listings</p>
                            <p className="text-xl font-bold">120</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow text-center">
                            <p className="text-gray-600">Active Users</p>
                            <p className="text-xl font-bold">450</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow text-center">
                            <p className="text-gray-600">Revenue</p>
                            <p className="text-xl font-bold">$12,000</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow text-center">
                            <p className="text-gray-600">Pending Approvals</p>
                            <p className="text-xl font-bold">15</p>
                        </div>
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
                    </div>
                    </div>
                );
}

export default DBMainContent;