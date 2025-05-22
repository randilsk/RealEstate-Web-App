"use client";

import { useState } from 'react';
import { 
  FaBell, 
  FaUserCircle, 
  FaCog, 
  FaShieldAlt, 
  FaPalette, 
  FaDatabase, 
  FaUserShield,
  FaHome,
  FaChartLine,
  FaEnvelope,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';

export default function AdminSettings() {
  const [expandedSections, setExpandedSections] = useState({
    profile: true,
    system: false,
    listings: false,
    security: false,
    notifications: false,
    appearance: false,
    data: false,
    users: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const SectionHeader = ({ icon: Icon, title, section }) => (
    <button
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between p-4 bg-white rounded-t-lg border-b hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center gap-3">
        <Icon className="text-indigo-600 text-xl" />
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>
      {expandedSections[section] ? (
        <FaChevronUp className="text-gray-500" />
      ) : (
        <FaChevronDown className="text-gray-500" />
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
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

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Settings</h1>

        <div className="space-y-6">
          {/* Profile Settings */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <SectionHeader icon={FaUserCircle} title="Profile Settings" section="profile" />
            {expandedSections.profile && (
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    defaultValue="Admin User"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    defaultValue="admin@realestate.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Picture
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                      <FaUserCircle className="text-4xl text-gray-400" />
                    </div>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                      Upload New Photo
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* System Settings */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <SectionHeader icon={FaCog} title="System Settings" section="system" />
            {expandedSections.system && (
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    defaultValue="Real Estate Platform"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Description
                  </label>
                  <textarea
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    rows="3"
                    defaultValue="Your trusted platform for real estate listings and transactions"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maintenance Mode
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-600">Enable maintenance mode</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Listings Configuration */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <SectionHeader icon={FaHome} title="Listings Configuration" section="listings" />
            {expandedSections.listings && (
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Listing Status
                  </label>
                  <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option>Active</option>
                    <option>Pending</option>
                    <option>Draft</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Listings Limit
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    defaultValue="5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Auto-approve Listings
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-600">Automatically approve new listings</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <SectionHeader icon={FaShieldAlt} title="Security Settings" section="security" />
            {expandedSections.security && (
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Two-Factor Authentication
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-600">Enable 2FA for admin accounts</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Timeout (minutes)
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    defaultValue="30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password Policy
                  </label>
                  <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option>Standard</option>
                    <option>Enhanced</option>
                    <option>Strict</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <SectionHeader icon={FaEnvelope} title="Notification Settings" section="notifications" />
            {expandedSections.notifications && (
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Notifications
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">New Listing Alerts</span>
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        defaultChecked
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">User Registration</span>
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        defaultChecked
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">System Updates</span>
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Appearance Settings */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <SectionHeader icon={FaPalette} title="Appearance Settings" section="appearance" />
            {expandedSections.appearance && (
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Color
                  </label>
                  <input
                    type="color"
                    className="h-10 w-20 rounded cursor-pointer"
                    defaultValue="#4F46E5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Theme
                  </label>
                  <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option>Light</option>
                    <option>Dark</option>
                    <option>System</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-12 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-gray-500">Logo Preview</span>
                    </div>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                      Upload New Logo
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Data Management */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <SectionHeader icon={FaDatabase} title="Data Management" section="data" />
            {expandedSections.data && (
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Backup Frequency
                  </label>
                  <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data Retention
                  </label>
                  <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option>30 days</option>
                    <option>90 days</option>
                    <option>1 year</option>
                    <option>Indefinite</option>
                  </select>
                </div>
                <div className="flex gap-4">
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                    Create Backup Now
                  </button>
                  <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                    Restore from Backup
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Management */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <SectionHeader icon={FaUserShield} title="User Management" section="users" />
            {expandedSections.users && (
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default User Role
                  </label>
                  <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                    <option>User</option>
                    <option>Agent</option>
                    <option>Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    User Registration
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <span className="text-sm text-gray-600">Allow new user registrations</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Verification
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <span className="text-sm text-gray-600">Require email verification</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 