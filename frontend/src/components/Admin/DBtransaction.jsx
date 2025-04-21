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

    return (
        <div className="flex-2 bg-gray-100 min-h-screen">
            {/* Navbar */}
            <div className="bg-[#3B50DF] shadow-md p-4 flex justify-between items-center text-white">
                <input
                    type="text"
                    placeholder="Enter an address, city, district, province"
                    className="p-2 border rounded-md w-1/3 text-black"
                />
                <div className="flex gap-4 text-xl">
                    <FaBell />
                    <FaUserCircle />
                </div>
            </div>

            {/* Dashboard */}
            <div className="p-10">
                <div className="bg-white mt-6 p-6 rounded-lg shadow">
                    <h3 className="text-xl font-bold mb-4">Transaction History</h3>

                    {/* Search and Filter */}
                    <div className="flex justify-between items-center mb-4 gap-4">
                        <input
                            type="text"
                            placeholder="Search by User or Transaction ID"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="p-2 border border-gray-300 rounded-md w-2/3"
                        />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="p-2 border border-gray-300 rounded-md"
                        >
                            <option value="All">All Statuses</option>
                            <option value="Pending">Pending</option>
                            <option value="Success">Success</option>
                            <option value="Failed">Failed</option>
                        </select>
                    </div>

                    {/* Transaction Table */}
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-2">ID</th>
                                <th className="border p-2">Name</th>
                                <th className="border p-2">Amount (Rs.)</th>
                                <th className="border p-2">Description</th>
                                <th className="border p-2">Date</th>
                                <th className="border p-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.map((tx, index) => (
                                <tr key={index}>
                                    <td className="border p-2">{tx.id}</td>
                                    <td className="border p-2">{tx.name}</td>
                                    <td className="border p-2">{tx.amount}</td>
                                    <td className="border p-2">{tx.description}</td>
                                    <td className="border p-2">{tx.date}</td>
                                    <td className="border p-2">{tx.status}</td>
                                </tr>
                            ))}
                            {filteredTransactions.length === 0 && (
                                <tr>
                                    <td className="border p-2 text-center" colSpan="6">
                                        No transactions found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default DBtransaction;
