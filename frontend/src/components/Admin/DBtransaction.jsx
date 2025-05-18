"use client";
import React, { useState } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";

function DBtransaction() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");

    const transactions = [
        {
            id: "001",
            name: "Rathnayaka",
            amount: 10000,
            description: "Subscription Plan 1",
            date: "02-04-2025",
            status: "Pending",
        },
        {
            id: "002",
            name: "Dinitha",
            amount: 20000,
            description: "Subscription Plan 2",
            date: "20-04-2025",
            status: "Success",
        },
        {
            id: "003",
            name: "Nimasha",
            amount: 15000,
            description: "Plan Upgrade",
            date: "18-04-2025",
            status: "Failed",
        },
    ];

    const filteredTransactions = transactions.filter((tx) =>
        (tx.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tx.id.includes(searchQuery)) &&
        (filterStatus === "All" || tx.status === filterStatus)
    );

    // Function to determine status badge styling
    const getStatusBadgeClasses = (status) => {
        switch (status) {
            case "Success":
                return "bg-green-100 text-green-800 border-green-300";
            case "Pending":
                return "bg-yellow-100 text-yellow-800 border-yellow-300";
            case "Failed":
                return "bg-red-100 text-red-800 border-red-300";
            default:
                return "bg-gray-100 text-gray-800 border-gray-300";
        }
    };

    return (
        <div className="flex-2 bg-gray-100 min-h-screen">
            {/* Navbar */}
            <div className="bg-indigo-600 shadow-md p-4 flex justify-between items-center text-white">
                <input
                    type="text"
                    placeholder="Enter an address, city, district, province"
                    className="p-2 border rounded-md w-1/3 text-black"
                />
                <div className="flex gap-4 text-xl">
                    <FaBell className="cursor-pointer hover:text-indigo-200" />
                    <FaUserCircle className="cursor-pointer hover:text-indigo-200" />
                </div>
            </div>

            {/* Dashboard */}
            <div className="p-10">
                <div className="bg-white mt-6 p-6 rounded-lg shadow">
                    <h3 className="text-xl font-bold mb-4 text-indigo-800">Transaction History</h3>

                    {/* Search and Filter */}
                    <div className="flex justify-between items-center mb-4 gap-4">
                        <input
                            type="text"
                            placeholder="Search by User or Transaction ID"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="p-2 border border-gray-300 rounded-md w-2/3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="All">All Statuses</option>
                            <option value="Pending">Pending</option>
                            <option value="Success">Success</option>
                            <option value="Failed">Failed</option>
                        </select>
                    </div>

                    {/* Transaction Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-indigo-100">
                                    <th className="border border-gray-300 p-2 text-indigo-800">ID</th>
                                    <th className="border border-gray-300 p-2 text-indigo-800">Name</th>
                                    <th className="border border-gray-300 p-2 text-indigo-800">Amount (Rs.)</th>
                                    <th className="border border-gray-300 p-2 text-indigo-800">Description</th>
                                    <th className="border border-gray-300 p-2 text-indigo-800">Date</th>
                                    <th className="border border-gray-300 p-2 text-indigo-800">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTransactions.map((tx, index) => (
                                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                        <td className="border border-gray-300 p-2">{tx.id}</td>
                                        <td className="border border-gray-300 p-2">{tx.name}</td>
                                        <td className="border border-gray-300 p-2">{tx.amount}</td>
                                        <td className="border border-gray-300 p-2">{tx.description}</td>
                                        <td className="border border-gray-300 p-2">{tx.date}</td>
                                        <td className="border border-gray-300 p-2">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadgeClasses(tx.status)}`}>
                                                {tx.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {filteredTransactions.length === 0 && (
                                    <tr>
                                        <td className="border p-3 text-center text-gray-500" colSpan="6">
                                            No transactions found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DBtransaction;