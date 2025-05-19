"use client";

import { useState, useEffect } from "react";
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Cell
} from "recharts"; //graphs
import { FaBell, FaUserCircle } from "react-icons/fa";

export default function DBreports() {
  // Mock data for charts
  const lineChartData = [
    { month: "Jan", listings: 100 },
    { month: "Feb", listings: 250 },
    { month: "Mar", listings: 300 },
    { month: "Apr", listings: 400 }
  ];

  const barChartData = [
    { month: "Jan", revenue: 500000 },
    { month: "Feb", revenue: 800000 },
    { month: "Mar", revenue: 900000 },
    { month: "Apr", revenue: 1200000 }
  ];

  const pieChartData = [
    { name: "Rentals", value: 60 },
    { name: "Sales", value: 40 }
  ];

  const COLORS = ["#3B82F6", "#F59E0B"];

  return (
    <div className="space-y-6 w-full">
        {/* Navbar */}
        <div className="bg-indigo-600 w-full shadow-md p-4 flex justify-between items-center text-white">
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
      <h1 className="text-3xl font-bold text-center">Admin Report Page</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { label: "Total Listings", value: "1230" },
          { label: "Approved Listings", value: "960" },
          { label: "Pending Listings", value: "270" },
          { label: "Total Users", value: "540" },
          { label: "Total Transactions", value: "Rs. 4.5M" },
        ].map((card, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-xl p-3 text-center"
          >
            <h2 className="text-gray-500 text-sm font-medium">{card.label}</h2>
            <p className="text-xl font-bold text-indigo-600 mt-1">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section - Row on desktop, column on mobile */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Line Chart */}
        <div className="bg-white p-3 rounded-xl shadow-md flex-1">
          <h2 className="text-sm font-semibold mb-2">Listings Growth</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="listings" 
                  stroke="#3B50DF" 
                  strokeWidth={2} 
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-3 rounded-xl shadow-md flex-1">
          <h2 className="text-sm font-semibold mb-2">Monthly Revenue</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value) => `Rs. ${value.toLocaleString()}`} />
                <Bar dataKey="revenue" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-3 rounded-xl shadow-md flex-1">
          <h2 className="text-sm font-semibold mb-2">Property Distribution</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percent}) => `${(percent * 100).toFixed(0)}%`}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* User Activity Table */}
      <div className="bg-white p-4 rounded-xl shadow-md overflow-x-auto">
        <h2 className="text-lg font-semibold mb-3">User Activity</h2>
        <table className="min-w-full border">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-2 text-left">User</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Last Login</th>
              <th className="p-2 text-left">Listings</th>
              <th className="p-2 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-2">John Doe</td>
              <td className="p-2">john@example.com</td>
              <td className="p-2">2025-04-19</td>
              <td className="p-2">5</td>
              <td className="p-2">Seller</td>
            </tr>
            <tr className="border-t">
              <td className="p-2">Dinitha</td>
              <td className="p-2">dinitha@mail.com</td>
              <td className="p-2">2025-04-18</td>
              <td className="p-2">3</td>
              <td className="p-2">Buyer</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Transactions Table */}
      <div className="bg-white p-4 rounded-xl shadow-md overflow-x-auto">
        <h2 className="text-lg font-semibold mb-3">Recent Transactions</h2>
        <table className="min-w-full border">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-2 text-left">Transaction ID</th>
              <th className="p-2 text-left">User</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Plan</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="p-2">TX01</td>
              <td className="p-2">Rathnayaka</td>
              <td className="p-2">10,000</td>
              <td className="p-2">Plan 1</td>
              <td className="p-2">2025-04-10</td>
              <td className="p-2">Success</td>
            </tr>
            <tr className="border-t">
              <td className="p-2">TX02</td>
              <td className="p-2">Dinitha</td>
              <td className="p-2">20,000</td>
              <td className="p-2">Plan 2</td>
              <td className="p-2">2025-04-15</td>
              <td className="p-2">Pending</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}