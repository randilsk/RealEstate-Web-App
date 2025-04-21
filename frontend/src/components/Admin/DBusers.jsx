import React from "react";
import { FaBell, FaUserCircle, FaCheck, FaTimes } from 'react-icons/fa';
import { FaBan } from "react-icons/fa";


function DBusers() {
    return (
        <div className="flex-2 bg-gray-100">
            {/* Navbar */}
            <div className="bg-[#3B50DF] shadow-md p-4 flex justify-between items-center text-white">
                <input type="text" placeholder="Enter an address, city, district, province" className="p-2 border rounded-md w-1/3 text-black" />
                <div className="flex gap-4 text-xl">
                    <FaBell />
                    <FaUserCircle />
                </div>
            </div>

            {/* Dashboard */}
            <div className="p-10 " >
                <div className="bg-white mt-6 p-6 rounded-lg shadow">
                    <h3 className="text-xl font-bold mb-4">Users</h3>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-2">ID</th>
                                <th className="border p-2">Name</th>
                                <th className="border p-2">Email</th>
                                <th className="border p-2">Role</th>
                                <th className="border p-2">Status</th>
                                <th className="border p-2">Joined Date</th>
                                <th className="border p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border p-2">001</td>
                                <td className="border p-2">Rathnayaka</td>
                                <td className="border p-2">rathnayaka@gmail.com</td>
                                <td className="border p-2">Seller</td>
                                <td className="border p-2">Approved</td>
                                <td className="border p-2">02-04-2025</td>
                                <td className="border p-2 flex gap-2">
                                    <button className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600">
                                        <FaCheck />
                                    </button>
                                    <button className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600">
                                        <FaTimes />
                                    </button>
                                    <button className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600">
                                        <FaBan />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                            <td className="border p-2">001</td>
                                <td className="border p-2">Lakshan</td>
                                <td className="border p-2">lakshan@gmail.com</td>
                                <td className="border p-2">Buyer</td>
                                <td className="border p-2">Pending</td>
                                <td className="border p-2">12-05-2025</td>
                                <td className="border p-2 flex gap-2">
                                    <button className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600">
                                        <FaCheck />
                                    </button>
                                    <button className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600">
                                        <FaTimes />
                                    </button>
                                    <button className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600">
                                        <FaBan />
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

export default DBusers;