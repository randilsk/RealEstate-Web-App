"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"; //graphs

import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { FaBell, FaUserCircle } from "react-icons/fa";

export default function DBreports() {
  const [totalListings, setTotalListings] = useState(0);
  const [approvedListings, setApprovedListings] = useState(0);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  const [lineChartDynamicData, setLineChartDynamicData] = useState([]);
  const [barChartDynamicData, setBarChartDynamicData] = useState([]);
  const [pieChartDynamicData, setPieChartDynamicData] = useState([]);
  const [propertyTypeData, setPropertyTypeData] = useState([]);

  const [filterType, setFilterType] = useState("Monthly");

  const COLORS = [
    "#3B82F6",
    "#F59E0B",
    "#10B981",
    "#EF4444",
    "#6366F1",
    "#F472B6",
    "#FCD34D",
    "#60A5FA",
    "#34D399",
    "#F87171",
    "#A78BFA",
    "#FBBF24",
  ];

  // Fetch users data
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/auth/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch both sale and rent listings
  const fetchListings = async () => {
    try {
      const [saleResponse, rentResponse] = await Promise.all([
        axios.get("http://localhost:3000/api/listing/getallListing"),
        axios.get("http://localhost:3000/api/Rentroutes/getAllRentListing"),
      ]);

      const saleData = saleResponse.data.map((listing) => ({
        ...listing,
        type: "sale",
      }));
      const rentData = rentResponse.data.map((listing) => ({
        ...listing,
        type: "rent",
      }));

      setSaleListings(saleData);
      setRentListings(rentData);

      const allListings = [...saleData, ...rentData];
      setTotalListings(allListings.length);
      setApprovedListings(
        allListings.filter((listing) => listing.status === "approved").length
      );

      // Process data for charts
      processChartData(allListings);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  // Process data for all charts
  const processChartData = (allListings) => {
    const monthlyListings = {};
    const districtCounts = {};
    const propertyTypeCounts = { Sale: 0, Rent: 0 };
    const monthlyRevenue = {};

    allListings.forEach((listing) => {
      const month = new Date(listing.createdAt).toLocaleString("en-us", {
        month: "short",
      });
      monthlyListings[month] = (monthlyListings[month] || 0) + 1;

      if (listing.district) {
        const district = listing.district.trim();
        districtCounts[district] = (districtCounts[district] || 0) + 1;
      }

      // Count property types
      propertyTypeCounts[listing.type === "sale" ? "Sale" : "Rent"]++;

      // Calculate revenue (for sale listings) and rent (for rent listings)
      const amount =
        listing.type === "sale" ? listing.price || 0 : listing.monthlyRent || 0;
      if (amount > 0) {
        monthlyRevenue[month] = (monthlyRevenue[month] || 0) + amount;
      }
    });

    // Process line chart data (listings growth)
    const sortedMonths = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const processedLineChartData = sortedMonths.map((month) => ({
      month,
      listings: monthlyListings[month] || 0,
    }));

    // Process pie chart data (district distribution)
    const processedPieChartData = Object.entries(districtCounts)
      .map(([name, value]) => ({ name, value }))
      .filter((d) => d.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, 8); // Show top 8 districts

    // Process property type data
    const processedPropertyTypeData = Object.entries(propertyTypeCounts)
      .map(([name, value]) => ({ name, value }))
      .filter((d) => d.value > 0);

         // Process bar chart data (monthly revenue/rent) - ALWAYS show all 12 months
     const processedBarChartData = sortedMonths.map((month) => {
       // Always include the month, even if revenue is 0
       const revenue = monthlyRevenue[month] || 0;
       return { 
         month: month, 
         revenue: revenue,
         monthLabel: month
       };
     });

         setLineChartDynamicData(processedLineChartData);
     setPieChartDynamicData(processedPieChartData);
     setPropertyTypeData(processedPropertyTypeData);
     setBarChartDynamicData(processedBarChartData);
     
     // Debug: Log the processed data to ensure all months are included
     console.log('Monthly Revenue Data:', processedBarChartData);
     console.log('All months included:', processedBarChartData.length === 12);
     console.log('Months array:', sortedMonths);
     console.log('Monthly revenue object:', monthlyRevenue);
  };

  // Fetch transactions data
  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/transactions"
      );
      const transactionsData = response.data;
      setTransactions(transactionsData);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions([]);
    }
  };

  // Filter data based on selected time period
  const filterByType = (arr, dateField = "createdAt") => {
    const now = dayjs();
    return arr.filter((item) => {
      const date = dayjs(item[dateField] || item.date);
      if (filterType === "Today") {
        return date.isSame(now, "day");
      } else if (filterType === "Monthly") {
        return date.isSame(now, "month");
      } else if (filterType === "Yearly") {
        return date.isSame(now, "year");
      }
      return true;
    });
  };

  // Get filtered data
  const filteredUsers = filterByType(users);
  const filteredSaleListings = filterByType(saleListings);
  const filteredRentListings = filterByType(rentListings);
  const filteredTransactions = filterByType(transactions, "date");

  // Calculate filtered summary values
  const filteredTotalListings =
    filteredSaleListings.length + filteredRentListings.length;
  const filteredApprovedListings = [
    ...filteredSaleListings,
    ...filteredRentListings,
  ].filter((listing) => listing.status === "approved").length;
  const filteredPendingListings = [
    ...filteredSaleListings,
    ...filteredRentListings,
  ].filter((listing) => listing.status === "pending").length;
  const filteredTotalTransactions = filteredTransactions.reduce(
    (sum, t) => sum + (t.amount || 0),
    0
  );

  // Calculate OVERALL approval rate using ALL listings (not filtered by time)
  const overallTotalListings = saleListings.length + rentListings.length;
  const overallApprovedListings = [...saleListings, ...rentListings].filter(
    (listing) => listing.status === "approved"
  ).length;
  const overallApprovalRate = overallTotalListings > 0 
    ? ((overallApprovedListings / overallTotalListings) * 100).toFixed(1) 
    : 0;

  // Calculate total revenue from listings
  const totalRevenue = [...saleListings, ...rentListings].reduce(
    (sum, listing) => {
      if (listing.status === "approved") {
        return (
          sum +
          (listing.type === "sale"
            ? listing.price || 0
            : listing.monthlyRent || 0)
        );
      }
      return sum;
    },
    0
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchUsers(), fetchListings(), fetchTransactions()]);
      setLoading(false);
    };

    fetchData();

    // Refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 w-full">
      {/* Navbar */}
      <div className="bg-[#3B50DF] w-full shadow-md p-4 flex justify-end text-white">
        <div className="w-1/3 flex justify-end gap-4 text-xl">
          <FaBell className="cursor-pointer hover:text-indigo-200" />
          <FaUserCircle className="cursor-pointer hover:text-indigo-200" />
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-end mt-4 mr-6">
        <div className="flex gap-2">
          <button
            onClick={() => setFilterType("Today")}
            className={`px-4 py-2 ${
              filterType === "Today"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-600 border border-gray-200"
            } rounded-md hover:bg-gray-50 transition-colors`}
          >
            Today
          </button>
          <button
            onClick={() => setFilterType("Monthly")}
            className={`px-4 py-2 ${
              filterType === "Monthly"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-600 border border-gray-200"
            } rounded-md hover:bg-gray-50 transition-colors`}
          >
            Month
          </button>
          <button
            onClick={() => setFilterType("Yearly")}
            className={`px-4 py-2 ${
              filterType === "Yearly"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-600 border border-gray-200"
            } rounded-md hover:bg-gray-50 transition-colors`}
          >
            Year
          </button>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-center">Admin Report Page</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          {
            label: "Total Listings",
            value: loading ? "Loading..." : filteredTotalListings,
            color: "text-blue-600",
          },
          {
            label: "Sale Listings",
            value: loading ? "Loading..." : filteredSaleListings.length,
            color: "text-green-600",
          },
          {
            label: "Rent Listings",
            value: loading ? "Loading..." : filteredRentListings.length,
            color: "text-purple-600",
          },
          {
            label: "Pending Listings",
            value: loading ? "Loading..." : filteredPendingListings,
            color: "text-yellow-600",
          },
          {
            label: "Total Users",
            value: loading ? "Loading..." : filteredUsers.length,
            color: "text-indigo-600",
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-xl p-3 text-center"
          >
            <h2 className="text-gray-500 text-sm font-medium">{card.label}</h2>
            <p className={`text-xl font-bold ${card.color} mt-1`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Approved Listings",
            value: loading ? "Loading..." : filteredApprovedListings,
            color: "text-green-600",
          },
          {
            label: "Total Revenue",
            value: loading
              ? "Loading..."
              : `Rs. ${totalRevenue.toLocaleString()}`,
            color: "text-green-600",
          },
          {
            label: "Total Transactions",
            value: loading
              ? "Loading..."
              : `Rs. ${filteredTotalTransactions.toLocaleString()}`,
            color: "text-indigo-600",
          },
          {
            label: "Approval Rate",
            value: loading
              ? "Loading..."
              : `${overallApprovalRate}%`,
            color: "text-blue-600",
          },
        ].map((card, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-xl p-3 text-center"
          >
            <h2 className="text-gray-500 text-sm font-medium">{card.label}</h2>
            <p className={`text-lg font-bold ${card.color} mt-1`}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

             {/* Charts Section - Row 1: Line and Bar Charts */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Line Chart - Listings Growth */}
         <div className="bg-white p-4 rounded-xl shadow-md">
           <h2 className="text-lg font-semibold mb-4 text-gray-800">
             Listings Growth ({filterType})
           </h2>
           <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart
                 data={lineChartDynamicData}
                 margin={{ top: 10, right: 20, bottom: 10, left: 10 }}
               >
                 <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                 <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#666" />
                 <YAxis tick={{ fontSize: 12 }} stroke="#666" />
                 <Tooltip 
                   contentStyle={{ 
                     backgroundColor: 'white', 
                     border: '1px solid #ccc',
                     borderRadius: '8px',
                     boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                   }}
                 />
                 <Line
                   type="monotone"
                   dataKey="listings"
                   stroke="#3B50DF"
                   strokeWidth={3}
                   dot={{ r: 4, fill: '#3B50DF' }}
                   activeDot={{ r: 6, fill: '#3B50DF' }}
                 />
               </LineChart>
             </ResponsiveContainer>
           </div>
         </div>

                   {/* Bar Chart - Monthly Revenue */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Monthly Revenue/Rent ({filterType})
            </h2>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
              <BarChart
                   data={barChartDynamicData}
                   margin={{ top: 10, right: 20, bottom: 25, left: 25 }}
                   barSize={20}
                   barGap={0}
                   layout="horizontal"
                 >
                   <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                   <XAxis 
                     dataKey="month" 
                     tick={{ fontSize: 10 }} 
                     stroke="#666"
                     interval={0}
                     angle={-45}
                     textAnchor="middle"
                     height={60}
                     type="category"
                     scale="band"
                     axisLine={false}
                     tickLine={false}
                     // Fix positioning by adjusting padding
                     padding={{ left: 10, right: 10 }}
                   />
                   <YAxis 
                     tick={{ fontSize: 10 }} 
                     stroke="#666"
                     tickFormatter={(value) => `Rs. ${(value/1000).toFixed(0)}K`}
                     width={60}
                     domain={[0, 'dataMax + 1000']}
                   />
                   <Tooltip
                     formatter={(value) => `Rs. ${value.toLocaleString()}`}
                     contentStyle={{ 
                       backgroundColor: 'white', 
                       border: '1px solid #ccc',
                       borderRadius: '8px',
                       boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                     }}
                     labelFormatter={(label) => `Month: ${label}`}
                   />
                   <Bar 
                     dataKey="revenue" 
                     fill="#10B981" 
                     radius={[4, 4, 0, 0]}
                     name="Revenue"
                     // Fix bar positioning to align with month labels
                     barSize={18}
                     barGap={0}
                   />
                 </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
       </div>

               {/* Charts Section - Row 2: Pie Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart - Property Distribution by District */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Property Distribution by District
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <Pie
                    data={pieChartDynamicData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartDynamicData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    formatter={(value, entry, index) => {
                      const total = pieChartDynamicData.reduce(
                        (sum, d) => sum + d.value,
                        0
                      );
                      const percent =
                        total > 0
                          ? (
                              (pieChartDynamicData[index].value / total) *
                              100
                            ).toFixed(1)
                          : 0;
                      return `${value}: ${percent}%`;
                    }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Property Type Distribution */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Property Type Distribution
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <Pie
                    data={propertyTypeData}
                    cx="50%"
                    cy="50%"
                    fill="#8884d8"
                    dataKey="value"
                    outerRadius={120}
                    labelLine={false}
                  >
                    {propertyTypeData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === 0 ? "#3B82F6" : "#F59E0B"}
                      />
                    ))}
                  </Pie>
                  <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    formatter={(value, entry, index) => {
                      const total = propertyTypeData.reduce(
                        (sum, d) => sum + d.value,
                        0
                      );
                      const percent =
                        total > 0
                          ? ((propertyTypeData[index].value / total) * 100).toFixed(
                            1
                          )
                          : 0;
                      return `${value}: ${percent}%`;
                    }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      {/* Recent Listings Table */}
      <div className="bg-white p-4 rounded-xl shadow-md overflow-x-auto">
        <h2 className="text-lg font-semibold mb-3">
          Recent Listings ({filterType})
        </h2>
        <table className="min-w-full border">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Address</th>
              <th className="p-2 text-left">District</th>
              <th className="p-2 text-left">Price/Rent</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Created</th>
            </tr>
          </thead>
          <tbody>
            {[...filteredSaleListings, ...filteredRentListings]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 10)
              .map((listing) => (
                <tr key={listing._id} className="border-t">
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        listing.type === "rent"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {listing.type === "rent" ? "Rent" : "Sale"}
                    </span>
                  </td>
                  <td className="p-2">{listing.address || "N/A"}</td>
                  <td className="p-2">{listing.district || "N/A"}</td>
                  <td className="p-2">
                    {listing.type === "rent"
                      ? `Rs. ${
                          listing.monthlyRent
                            ? listing.monthlyRent.toLocaleString()
                            : "N/A"
                        }/month`
                      : `Rs. ${
                          listing.price ? listing.price.toLocaleString() : "N/A"
                        }`}
                  </td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        listing.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : listing.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {listing.status || "Pending"}
                    </span>
                  </td>
                  <td className="p-2">
                    {new Date(listing.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* User Activity Table */}
      <div className="bg-white p-4 rounded-xl shadow-md overflow-x-auto">
        <h2 className="text-lg font-semibold mb-3">
          Recent Users ({filterType})
        </h2>
        <table className="min-w-full border">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-2 text-left">Username</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">User Type</th>
              <th className="p-2 text-left">Created</th>
              <th className="p-2 text-left">Listings</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 8)
              .map((user) => {
                const userListings = [...saleListings, ...rentListings].filter(
                  (listing) => listing.username === user.username
                );

                return (
                  <tr key={user._id} className="border-t">
                    <td className="p-2">{user.username}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">{user.subscription || "Regular"}</td>
                    <td className="p-2">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-2">
                      <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                        {userListings.length} listings
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* Transactions Table */}
      <div className="bg-white p-4 rounded-xl shadow-md overflow-x-auto">
        <h2 className="text-lg font-semibold mb-3">
          Recent Transactions ({filterType})
        </h2>
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
            {filteredTransactions
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 8)
              .map((transaction) => (
                <tr
                  key={transaction._id || transaction.id}
                  className="border-t"
                >
                  <td className="p-2">
                    {transaction._id ? transaction._id.slice(-5) : "N/A"}
                  </td>
                  <td className="p-2">{transaction.user || "N/A"}</td>
                  <td className="p-2">
                    {transaction.amount
                      ? `Rs. ${transaction.amount.toLocaleString()}`
                      : "N/A"}
                  </td>
                  <td className="p-2">{transaction.plan || "N/A"}</td>
                  <td className="p-2">
                    {transaction.date
                      ? new Date(transaction.date).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        transaction.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : transaction.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {transaction.status || "N/A"}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
