"use client";

// not appere in Dashboad

import React, { useState, useEffect } from "react";
import { FaBell, FaUserCircle, FaSearch, FaEdit, FaTrash, FaSave, FaTimes, FaUsers, FaUserCheck } from 'react-icons/fa';
import axios from 'axios';

// StatCard Component (similar to dashboard)
const StatCard = ({ title, value, icon: Icon, color = "text-blue-600" }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className={`text-2xl mb-2 flex justify-center ${color}`}>
                <Icon />
            </div>
            <p className="text-gray-600">{title}</p>
            <p className="text-xl font-bold">{value}</p>
        </div>
    );
};

// Edit User Modal Component
const EditUserModal = ({ user, onClose, onSave }) => {
    const [editedUser, setEditedUser] = useState(user);
    const [isSaving, setIsSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    useEffect(() => {
        setEditedUser(user);
        setErrorMessage('');
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prev => ({
            ...prev,
            [name]: value
        }));
        setErrorMessage('');
    };

    const handleSaveClick = () => {
        setShowConfirmDialog(true);
    };

    const handleConfirmSave = async () => {
        setIsSaving(true);
        setErrorMessage('');
        
        try {
            await onSave(editedUser);
            onClose();
        } catch (error) {
            console.error('Error saving user:', error);
            setErrorMessage(error.message);
        } finally {
            setIsSaving(false);
            setShowConfirmDialog(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-indigo-800">Edit User Details</h3>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <FaTimes size={24} />
                    </button>
                </div>

                {errorMessage && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {errorMessage}
                    </div>
                )}

                {/* Display current user details */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-700 mb-3">Current User Details</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-600">ID</p>
                            <p className="font-medium">{user._id?.slice(-4) || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Joined Date</p>
                            <p className="font-medium">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
                        </div>
                    </div>
                </div>

                {/* Editable fields */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={editedUser.username || ''}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={editedUser.email || ''}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSaveClick}
                        disabled={isSaving}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                        <FaSave />
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>

                {/* Confirmation Dialog */}
                {showConfirmDialog && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-[70] flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                            <h3 className="text-xl font-bold mb-4">Confirm Changes</h3>
                            <p className="text-gray-600 mb-6">Are you sure you want to save these changes?</p>
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => setShowConfirmDialog(false)}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                                >
                                    No, Cancel
                                </button>
                                <button
                                    onClick={handleConfirmSave}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                                >
                                    Yes, Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

function DBusers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [activeUsersCount, setActiveUsersCount] = useState(0);
    const [totalUsersCount, setTotalUsersCount] = useState(0);
    const [pendingUsersCount, setPendingUsersCount] = useState(0);

    // Calculate user statistics
    const calculateUserStats = (usersList) => {
        const active = usersList.filter(user => user.status?.toLowerCase() === 'active').length;
        const pending = usersList.filter(user => user.status?.toLowerCase() === 'pending').length;
        const total = usersList.length;
        return { active, pending, total };
    };

    // Fetch users data
    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/auth/users');
            const usersData = response.data;
            setUsers(usersData);
            const stats = calculateUserStats(usersData);
            setActiveUsersCount(stats.active);
            setPendingUsersCount(stats.pending);
            setTotalUsersCount(stats.total);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('Failed to fetch users data');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
        // Refresh data every 30 seconds
        const interval = setInterval(fetchUsers, 30000);
        return () => clearInterval(interval);
    }, []);

    // Filter users based on search term and role
    const filteredUsers = users.filter(user => {
        const matchesSearch = 
            user._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'all' || user.role?.toLowerCase() === filterRole.toLowerCase();
        return matchesSearch && matchesRole;
    });

    // Function to get status badge styling
    const getStatusBadgeClasses = (status) => {
        switch (status?.toLowerCase()) {
            case 'active':
                return 'bg-green-100 text-green-800 border-green-300';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'banned':
                return 'bg-red-100 text-red-800 border-red-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    // Function to get role badge styling
    const getRoleBadgeClasses = (role) => {
        switch (role?.toLowerCase()) {
            case 'seller':
                return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'buyer':
                return 'bg-purple-100 text-purple-800 border-purple-300';
            case 'renter':
                return 'bg-green-100 text-green-800 border-green-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    // Function to format role display
    const formatRole = (role) => {
        if (!role) return 'User';
        // Capitalize first letter and handle special cases
        const roleMap = {
            'seller': 'Seller',
            'buyer': 'Buyer',
            'renter': 'Renter'
        };
        return roleMap[role.toLowerCase()] || role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
    };

    const handleSaveUser = async (updatedUser) => {
        try {
            // Use the correct API endpoint
            const response = await axios.put(`/api/users/${updatedUser._id}`, updatedUser);
            
            if (response.data) {
                // Update the users list with the edited user
                setUsers(prevUsers => 
                    prevUsers.map(user => 
                        user._id === updatedUser._id ? response.data : user
                    )
                );
            } else {
                throw new Error('No data received from server');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            // Get the error message from the backend response if available
            const errorMessage = error.response?.data?.message || error.message || 'Failed to save changes. Please try again.';
            throw new Error(errorMessage);
        }
    };

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setShowDeleteConfirm(true);
    };

    const handleDeleteConfirm = async () => {
        if (userToDelete) {
            try {
                await axios.delete(`/api/auth/users/${userToDelete._id}`);
                await fetchUsers();
                setShowDeleteConfirm(false);
                setUserToDelete(null);
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Failed to delete user. Please try again.');
            }
        }
    };

    return (
        <div className="flex-2 bg-gray-100 min-h-screen">
            {/* Navbar */}
            <div className="bg-[#3B50DF] shadow-md p-4 flex justify-between items-center text-white">
                <input type="text" placeholder="Enter an address, city, district, province" className="p-2 border rounded-md w-1/3 text-black" />
                <div className="flex gap-4 text-xl">
                    <FaBell className="cursor-pointer hover:text-blue-200 transition-colors" />
                    <FaUserCircle className="cursor-pointer hover:text-blue-200 transition-colors" />
                </div>
            </div>

            {/* Dashboard Stats Section */}
            <div className="p-10">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">User Statistics</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <StatCard 
                            title="Total Users" 
                            value={loading ? "..." : totalUsersCount}
                            icon={FaUsers}
                            color="text-indigo-600"
                        />
                        <StatCard 
                            title="Active Users" 
                            value={loading ? "..." : activeUsersCount}
                            icon={FaUserCheck}
                            color="text-green-600"
                        />
                        <StatCard 
                            title="Pending Users" 
                            value={loading ? "..." : pendingUsersCount}
                            icon={FaUserCircle}
                            color="text-amber-600"
                        />
                    </div>
                </div>

                {/* User Management Section */}
                <div className="bg-white mt-6 p-6 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-indigo-800">User Management</h3>
                        <div className="flex gap-4 items-center">
                            <div className="relative">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by ID, name or email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <select
                                value={filterRole}
                                onChange={(e) => setFilterRole(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="all">All Users</option>
                                <option value="buyer">Buyers</option>
                                <option value="seller">Sellers</option>
                                <option value="renter">Renters</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-10 text-gray-600">Loading users...</div>
                    ) : error ? (
                        <div className="text-center py-4 text-red-500">{error}</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
                                <thead>
                                    <tr className="bg-indigo-100">
                                        <th className="border border-gray-300 p-2 text-indigo-800">ID</th>
                                        <th className="border border-gray-300 p-2 text-indigo-800">Name</th>
                                        <th className="border border-gray-300 p-2 text-indigo-800">Email</th>
                                        <th className="border border-gray-300 p-2 text-indigo-800">Joined Date</th>
                                        <th className="border border-gray-300 p-2 text-indigo-800">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user, index) => (
                                        <tr key={user._id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                            <td className="border border-gray-300 p-2 text-sm text-gray-900">
                                                {user._id?.slice(-4) || 'N/A'}
                                            </td>
                                            <td className="border border-gray-300 p-2 text-sm text-gray-900">
                                                {user.username || 'N/A'}
                                            </td>
                                            <td className="border border-gray-300 p-2 text-sm text-gray-500">
                                                {user.email || 'N/A'}
                                            </td>
                                            <td className="border border-gray-300 p-2 text-sm text-gray-500">
                                                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                            </td>
                                            <td className="border border-gray-300 p-2">
                                                <div className="flex justify-center space-x-2">
                                                    <button 
                                                        className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-md transition-colors"
                                                        title="Edit User"
                                                        onClick={() => handleEditUser(user)}
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button 
                                                        className="p-2 text-red-600 hover:bg-red-100 rounded-md transition-colors"
                                                        title="Delete User"
                                                        onClick={() => handleDeleteClick(user)}
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredUsers.length === 0 && (
                                        <tr>
                                            <td className="border p-3 text-center text-gray-500" colSpan="5">
                                                No users found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Edit User Modal */}
            {editingUser && (
                <EditUserModal
                    user={editingUser}
                    onClose={() => setEditingUser(null)}
                    onSave={handleSaveUser}
                />
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                        <h3 className="text-xl font-bold mb-4">Delete User</h3>
                        <p className="text-gray-600 mb-6">Are You Sure to Delete This User?</p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                            >
                                No
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DBusers;