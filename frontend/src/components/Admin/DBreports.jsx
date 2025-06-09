"use client";

import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, Cell
} from "recharts"; //graphs
import { FaBell, FaUserCircle, FaCog, FaDollarSign } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function DBreports() {
    const [totalListings, setTotalListings] = useState(0);
    const [approvedListings, setApprovedListings] = useState(0);
    const [pendingListings, setPendingListings] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalTransactions, setTotalTransactions] = useState(0);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [transactions, setTransactions] = useState([]);

    const [lineChartDynamicData, setLineChartDynamicData] = useState([]);
    const [barChartDynamicData, setBarChartDynamicData] = useState([]);
    const [pieChartDynamicData, setPieChartDynamicData] = useState([]);

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

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/auth/users');
            setTotalUsers(response.data.length);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            // setLoading(false); // Only set to false after all fetches are done
        }
    };

    const fetchListings = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/listing/getallListing');
            const allListings = response.data;
            setTotalListings(allListings.length);
            setApprovedListings(allListings.filter(listing => listing.status === 'approved').length);
            setPendingListings(allListings.filter(listing => listing.status === 'pending').length);

            // Process data for charts
            const monthlyListings = {};
            const propertyTypes = {};

            allListings.forEach(listing => {
                const month = new Date(listing.createdAt).toLocaleString('en-us', { month: 'short' });
                monthlyListings[month] = (monthlyListings[month] || 0) + 1;

                const type = listing.homeType || 'Other'; // Assuming 'homeType' field exists
                propertyTypes[type] = (propertyTypes[type] || 0) + 1;
            });

            const sortedMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const processedLineChartData = sortedMonths
                .filter(month => monthlyListings[month] !== undefined)
                .map(month => ({ month, listings: monthlyListings[month] }));

            const processedPieChartData = Object.keys(propertyTypes).map(type => ({
                name: type,
                value: propertyTypes[type]
            }));

            setLineChartDynamicData(processedLineChartData);
            setPieChartDynamicData(processedPieChartData);

        } catch (error) {
            console.error('Error fetching listings:', error);
        } finally {
            // setLoading(false);
        }
    };

    const fetchTransactions = async () => {
        try {
            const response = await axios.get('/api/transactions'); // Placeholder endpoint for transactions
            const transactionsData = response.data;
            setTransactions(transactionsData);
            const totalAmount = transactionsData.reduce((sum, transaction) => sum + (transaction.amount || 0), 0);
            setTotalTransactions(totalAmount);

            const monthlyRevenue = {};
            transactionsData.forEach(transaction => {
                const month = new Date(transaction.date).toLocaleString('en-us', { month: 'short' }); // Assuming 'date' field exists
                monthlyRevenue[month] = (monthlyRevenue[month] || 0) + (transaction.amount || 0);
            });

            const sortedMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const processedBarChartData = sortedMonths
                .filter(month => monthlyRevenue[month] !== undefined)
                .map(month => ({ month, revenue: monthlyRevenue[month] }));

            setBarChartDynamicData(processedBarChartData);

        } catch (error) {
            console.error('Error fetching transactions:', error);
            setTotalTransactions(0); 
            setBarChartDynamicData([]); // Set to empty on error
            setTransactions([]); // Set to empty on error
        } finally {
            // setLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await Promise.all([
                fetchUsers(),
                fetchListings(),
                fetchTransactions()
            ]);
            setLoading(false);
        };
        fetchData();

        // Refresh data every 30 seconds, adjust as needed
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

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
          { label: "Total Listings", value: totalListings },
          { label: "Approved Listings", value: approvedListings },
          { label: "Pending Listings", value: pendingListings },
          { label: "Total Users", value: totalUsers },
          { label: "Total Transactions", value: `Rs. ${totalTransactions.toLocaleString()}` },
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
              <LineChart data={lineChartDynamicData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
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
              <BarChart data={barChartDynamicData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
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
                  data={pieChartDynamicData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieChartDynamicData.map((entry, index) => (
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
          <thead className="bg-indigo-600 text-white"><tr>
            <th className="p-2 text-left">User</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Last Login</th>
            <th className="p-2 text-left">Listings</th>
            <th className="p-2 text-left">Role</th>
          </tr></thead>
          <tbody>{users
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by creation date (most recent first)
                .slice(0, 5) // Display only the 5 most recent users
                .map((user) => (
                    <tr key={user._id} className="border-t"><td className="p-2">{user.username}</td><td className="p-2">{user.email}</td><td className="p-2">{new Date(user.createdAt).toLocaleDateString()}</td><td className="p-2">N/A</td><td className="p-2">N/A</td></tr>
                ))}</tbody>
        </table>
      </div>

      {/* Transactions Table */}
      <div className="bg-white p-4 rounded-xl shadow-md overflow-x-auto">
        <h2 className="text-lg font-semibold mb-3">Recent Transactions</h2>
        <table className="min-w-full border">
          <thead className="bg-indigo-600 text-white"><tr>
            <th className="p-2 text-left">Transaction ID</th>
            <th className="p-2 text-left">User</th>
            <th className="p-2 text-left">Amount</th>
            <th className="p-2 text-left">Plan</th>
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Status</th>
          </tr></thead>
          <tbody>{transactions
                .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date (most recent first)
                .slice(0, 5) // Display only the 5 most recent transactions
                .map((transaction) => (
                    <tr key={transaction._id || transaction.id} className="border-t">
                        <td className="p-2">{transaction._id ? transaction._id.slice(-5) : 'N/A'}</td>
                        <td className="p-2">{transaction.user || 'N/A'}</td>
                        <td className="p-2">{transaction.amount ? transaction.amount.toLocaleString() : 'N/A'}</td>
                        <td className="p-2">{transaction.plan || 'N/A'}</td>
                        <td className="p-2">{transaction.date ? new Date(transaction.date).toLocaleDateString() : 'N/A'}</td>
                        <td className="p-2">{transaction.status || 'N/A'}</td>
                    </tr>
                ))}</tbody>
        </table>
      </div>
    </div>
  );
}