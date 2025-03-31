"use client";

import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const Map = dynamic(() => import("@/components/Admin/Map"), { ssr: false });

export default function ApproveListings() {
    const [pendingListings, setPendingListings] = useState([]);

    useEffect(() => {
        fetch("/api/listings/pending")
            .then(response => response.json())
            .then(data => setPendingListings(data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    const handleApproval = async (id, status) => {
        try {
            const response = await fetch(`/api/listings/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status })
            });
            if (response.ok) {
                setPendingListings(prev => prev.filter(listing => listing.id !== id));
            }
        } catch (error) {
            console.error("Error updating listing status:", error);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold text-[#3B50DF] mb-4">Approve Listings</h2>
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <Map listings={pendingListings} />
            </div>
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-[#3B50DF] text-white">
                    <tr>
                        <th className="p-4 text-left">Title</th>
                        <th className="p-4 text-left">Location</th>
                        <th className="p-4 text-left">Price (Rs.)</th>
                        <th className="p-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pendingListings.map(listing => (
                        <tr key={listing.id} className="border-b">
                            <td className="p-4">{listing.title}</td>
                            <td className="p-4">{listing.location}</td>
                            <td className="p-4">{listing.price}</td>
                            <td className="p-4 flex gap-4">
                                <button 
                                    className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2"
                                    onClick={() => handleApproval(listing.id, "approved")}
                                >
                                    <FaCheckCircle /> Approve
                                </button>
                                <button 
                                    className="bg-red-500 text-white px-4 py-2 rounded flex items-center gap-2"
                                    onClick={() => handleApproval(listing.id, "rejected")}
                                >
                                    <FaTimesCircle /> Reject
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


