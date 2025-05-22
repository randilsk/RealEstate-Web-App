"use client";

import { useState, useEffect } from 'react';
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
import DBSideBar from "../../../components/Admin/DBSideBar.jsx";
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    profile: {
      adminName: '',
      email: '',
      phone: '',
      profilePicture: ''
    },
    system: {
      siteName: '',
      siteDescription: '',
      maintenanceMode: false
    },
    listings: {
      defaultStatus: 'Pending',
      featuredLimit: 5,
      autoApprove: false
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordPolicy: 'Standard'
    },
    notifications: {
      newListingAlerts: true,
      userRegistration: true,
      systemUpdates: false
    },
    appearance: {
      primaryColor: '#4F46E5',
      theme: 'Light',
      logo: ''
    },
    data: {
      backupFrequency: 'Weekly',
      dataRetention: '90 days'
    },
    users: {
      defaultRole: 'User',
      userRegistration: true,
      emailVerification: true
    }
  });

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

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/settings');
      setSettings(response.data);
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Failed to load settings');
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [name]: value
      }
    }));
  };

  const handleSystemChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      system: {
        ...prev.system,
        [name]: type === 'checkbox' ? checked : value
      }
    }));
  };

  const handleListingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      listings: {
        ...prev.listings,
        [name]: type === 'checkbox' ? checked : value
      }
    }));
  };

  const handleSecurityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [name]: type === 'checkbox' ? checked : value
      }
    }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [name]: checked
      }
    }));
  };

  const handleAppearanceChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        [name]: value
      }
    }));
  };

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [name]: value
      }
    }));
  };

  const handleUserChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      users: {
        ...prev.users,
        [name]: type === 'checkbox' ? checked : value
      }
    }));
  };

  const saveProfileSettings = async () => {
    try {
      await axios.put('http://localhost:5000/api/settings/profile', settings.profile);
      toast.success('Profile settings saved successfully');
    } catch (error) {
      console.error('Error saving profile settings:', error);
      toast.error('Failed to save profile settings');
    }
  };

  const saveSystemSettings = async () => {
    try {
      await axios.put('http://localhost:5000/api/settings/system', settings.system);
      toast.success('System settings saved successfully');
    } catch (error) {
      console.error('Error saving system settings:', error);
      toast.error('Failed to save system settings');
    }
  };

  const saveListingsSettings = async () => {
    try {
      await axios.put('http://localhost:5000/api/settings/listings', settings.listings);
      toast.success('Listings settings saved successfully');
    } catch (error) {
      console.error('Error saving listings settings:', error);
      toast.error('Failed to save listings settings');
    }
  };

  const saveSecuritySettings = async () => {
    try {
      await axios.put('http://localhost:5000/api/settings/security', settings.security);
      toast.success('Security settings saved successfully');
    } catch (error) {
      console.error('Error saving security settings:', error);
      toast.error('Failed to save security settings');
    }
  };

  const saveNotificationSettings = async () => {
    try {
      await axios.put('http://localhost:5000/api/settings/notifications', settings.notifications);
      toast.success('Notification settings saved successfully');
    } catch (error) {
      console.error('Error saving notification settings:', error);
      toast.error('Failed to save notification settings');
    }
  };

  const saveAppearanceSettings = async () => {
    try {
      await axios.put('http://localhost:5000/api/settings/appearance', settings.appearance);
      toast.success('Appearance settings saved successfully');
    } catch (error) {
      console.error('Error saving appearance settings:', error);
      toast.error('Failed to save appearance settings');
    }
  };

  const saveDataSettings = async () => {
    try {
      await axios.put('http://localhost:5000/api/settings/data', settings.data);
      toast.success('Data settings saved successfully');
    } catch (error) {
      console.error('Error saving data settings:', error);
      toast.error('Failed to save data settings');
    }
  };

  const saveUserSettings = async () => {
    try {
      await axios.put('http://localhost:5000/api/settings/users', settings.users);
      toast.success('User settings saved successfully');
    } catch (error) {
      console.error('Error saving user settings:', error);
      toast.error('Failed to save user settings');
    }
  };

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
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <DBSideBar />
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
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
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
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
                      name="adminName"
                      value={settings.profile.adminName}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      name="email"
                      value={settings.profile.email}
                      onChange={handleProfileChange}
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
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={saveProfileSettings}
                      className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                    >
                      <FaCog className="text-sm" />
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* System Settings */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
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
                      name="siteName"
                      value={settings.system.siteName}
                      onChange={handleSystemChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Site Description
                    </label>
                    <textarea
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      rows="3"
                      name="siteDescription"
                      value={settings.system.siteDescription}
                      onChange={handleSystemChange}
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
                        name="maintenanceMode"
                        checked={settings.system.maintenanceMode}
                        onChange={handleSystemChange}
                      />
                      <span className="text-sm text-gray-600">Enable maintenance mode</span>
                    </div>
                  </div>
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={saveSystemSettings}
                      className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                    >
                      <FaCog className="text-sm" />
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Listings Configuration */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <SectionHeader icon={FaHome} title="Listings Configuration" section="listings" />
              {expandedSections.listings && (
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Default Listing Status
                    </label>
                    <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" name="defaultStatus" value={settings.listings.defaultStatus} onChange={handleListingsChange}>
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
                      name="featuredLimit"
                      value={settings.listings.featuredLimit}
                      onChange={handleListingsChange}
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
                        name="autoApprove"
                        checked={settings.listings.autoApprove}
                        onChange={handleListingsChange}
                      />
                      <span className="text-sm text-gray-600">Automatically approve new listings</span>
                    </div>
                  </div>
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={saveListingsSettings}
                      className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                    >
                      <FaCog className="text-sm" />
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Security Settings */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
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
                        name="twoFactorAuth"
                        checked={settings.security.twoFactorAuth}
                        onChange={handleSecurityChange}
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
                      name="sessionTimeout"
                      value={settings.security.sessionTimeout}
                      onChange={handleSecurityChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password Policy
                    </label>
                    <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" name="passwordPolicy" value={settings.security.passwordPolicy} onChange={handleSecurityChange}>
                      <option>Standard</option>
                      <option>Enhanced</option>
                      <option>Strict</option>
                    </select>
                  </div>
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={saveSecuritySettings}
                      className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                    >
                      <FaCog className="text-sm" />
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
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
                          name="newListingAlerts"
                          checked={settings.notifications.newListingAlerts}
                          onChange={handleNotificationChange}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">User Registration</span>
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          name="userRegistration"
                          checked={settings.notifications.userRegistration}
                          onChange={handleNotificationChange}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">System Updates</span>
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          name="systemUpdates"
                          checked={settings.notifications.systemUpdates}
                          onChange={handleNotificationChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={saveNotificationSettings}
                      className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                    >
                      <FaCog className="text-sm" />
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Appearance Settings */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
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
                      name="primaryColor"
                      value={settings.appearance.primaryColor}
                      onChange={handleAppearanceChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Theme
                    </label>
                    <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" name="theme" value={settings.appearance.theme} onChange={handleAppearanceChange}>
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
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={saveAppearanceSettings}
                      className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                    >
                      <FaCog className="text-sm" />
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Data Management */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <SectionHeader icon={FaDatabase} title="Data Management" section="data" />
              {expandedSections.data && (
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Backup Frequency
                    </label>
                    <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" name="backupFrequency" value={settings.data.backupFrequency} onChange={handleDataChange}>
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Monthly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data Retention
                    </label>
                    <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" name="dataRetention" value={settings.data.dataRetention} onChange={handleDataChange}>
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
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={saveDataSettings}
                      className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                    >
                      <FaCog className="text-sm" />
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Management */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              <SectionHeader icon={FaUserShield} title="User Management" section="users" />
              {expandedSections.users && (
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Default User Role
                    </label>
                    <select className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" name="defaultRole" value={settings.users.defaultRole} onChange={handleUserChange}>
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
                        name="userRegistration"
                        checked={settings.users.userRegistration}
                        onChange={handleUserChange}
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
                        name="emailVerification"
                        checked={settings.users.emailVerification}
                        onChange={handleUserChange}
                      />
                      <span className="text-sm text-gray-600">Require email verification</span>
                    </div>
                  </div>
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={saveUserSettings}
                      className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                    >
                      <FaCog className="text-sm" />
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 