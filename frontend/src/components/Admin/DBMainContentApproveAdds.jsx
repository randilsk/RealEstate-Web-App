import React from "react";
import { FaBell, FaUserCircle, FaCheck, FaTimes } from 'react-icons/fa'; //import react icons

function DBMainContent() {
    return (
        <div className="flex-1 bg-gray-100">
            {/* Navbar */}
            <div className="bg-[#3B50DF] shadow-md p-4 flex justify-between items-center text-white">
                <div className="w-1/3"></div>
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
            <div className="p-10 " >
                <div className="bg-white mt-6 p-6 rounded-lg shadow">
                    <h3 className="text-xl font-bold mb-4">Pending Approvals</h3>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-2">ID</th>
                                <th className="border p-2">Title</th>
                                <th className="border p-2">Location</th>
                                <th className="border p-2">Price</th>
                                <th className="border p-2">Status</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border p-2">001</td>
                                <td className="border p-2">Luxury Villa</td>
                                <td className="border p-2">Colombo</td>
                                <td className="border p-2">Rs. 30M</td>
                                <td className="border p-2">Approved</td>
                                <td className="border p-2 flex gap-2">
                                    <button className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600">
                                        <FaCheck />
                                    </button>
                                    <button className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600">
                                        <FaTimes />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className="border p-2">002</td>
                                <td className="border p-2">Land Plot</td>
                                <td className="border p-2">Kandy</td>
                                <td className="border p-2">Rs. 40M</td>
                                <td className="border p-2">Pending</td>
                                <td className="border p-2 flex gap-2">
                                    <button className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600">
                                        <FaCheck />
                                    </button>
                                    <button className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600">
                                        <FaTimes />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default DBMainContent;