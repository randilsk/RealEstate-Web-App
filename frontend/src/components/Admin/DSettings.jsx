"use client";

<<<<<<< HEAD
import { useState, useEffect } from "react";
import axios from "axios"; // ✅ Added
import {
  FaBell, FaUserCircle, FaSave, FaLock, FaCog, FaUsers, FaShieldAlt, FaDatabase, FaCogs
=======
import { useState } from "react";
import {
  FaBell, FaUserCircle, FaSave, FaCog, FaShieldAlt, FaDatabase, FaCogs
>>>>>>> 009a9cb262ba69eba9b68f32ebc94587249f4128
} from "react-icons/fa";

const SIDEBAR_BG = "bg-[#3B50DF]";
const SIDEBAR_TEXT = "text-white";
const SIDEBAR_ACTIVE = "bg-white text-[#3B50DF] font-bold";
const SIDEBAR_ICON = "text-2xl";
const CARD = "bg-white rounded-xl shadow-md p-6 mb-6";
const SECTION_HEADER = "text-lg font-bold mb-4 text-[#3B50DF]";
<<<<<<< HEAD
export default function DSettings() {
  const [settings, setSettings] = useState({
    siteName: "",
=======

export default function DSettings() {
  const [settings, setSettings] = useState({
    siteName: "Urban Nest",
>>>>>>> 009a9cb262ba69eba9b68f32ebc94587249f4128
    emailNotifications: true,
    maintenanceMode: false,
    maxListingsPerUser: 10,
    currency: "LKR",
    timezone: "Asia/Colombo",
    enableUserRegistration: true,
    enableComments: true,
    enableRatings: true,
    maxFileSize: 5,
    allowedFileTypes: ["jpg", "png", "pdf"],
    backupFrequency: "daily",
    enableTwoFactor: false,
    sessionTimeout: 30
  });
  const [activeSection, setActiveSection] = useState('general');

<<<<<<< HEAD
  // ✅ FETCH settings on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/settings");
        if (res.data?.data) {
          setSettings(res.data.data);
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
      }
    };

    fetchSettings();
  }, []);

=======
>>>>>>> 009a9cb262ba69eba9b68f32ebc94587249f4128
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

<<<<<<< HEAD
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("http://localhost:3000/api/settings", settings); // ✅ Use your backend URL
      if (res.data.success) {
        alert("Settings saved successfully!");
        setSettings(res.data.data); // ✅ Update local state with saved version
      }
    } catch (err) {
      console.error("Error saving settings:", err);
      alert("Failed to save settings.");
    }
  };

  const menuItems = [
    { id: "general", label: "General", icon: FaCog },
    { id: "security", label: "Security", icon: FaShieldAlt },
    { id: "notifications", label: "Notifications", icon: FaBell },
    { id: "backup", label: "Backup", icon: FaDatabase },
    { id: "advanced", label: "Advanced", icon: FaCogs },
  ];

  const renderSettingsContent = () => {
    if (!settings) return null;

    switch (activeSection) {
      case "general":
=======
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement settings save functionality
    console.log('Settings saved:', settings);
  };

  const menuItems = [
    { id: 'general', label: 'General', icon: FaCog },
    { id: 'security', label: 'Security', icon: FaShieldAlt },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
    { id: 'backup', label: 'Backup', icon: FaDatabase },
    { id: 'advanced', label: 'Advanced', icon: FaCogs },
  ];

  const renderSettingsContent = () => {
    switch (activeSection) {
      case 'general':
>>>>>>> 009a9cb262ba69eba9b68f32ebc94587249f4128
        return (
          <div className={CARD}>
            <div className={SECTION_HEADER}>General Settings</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<<<<<<< HEAD
              {/* Site Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                <input
                  type="text"
                  name="siteName"
                  value={settings.siteName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              {/* Currency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                <select
                  name="currency"
                  value={settings.currency}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="LKR">LKR</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
              {/* Timezone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                <select
                  name="timezone"
                  value={settings.timezone}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                >
=======
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                <input type="text" name="siteName" value={settings.siteName} onChange={handleInputChange} className="w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                <select name="currency" value={settings.currency} onChange={handleInputChange} className="w-full p-2 border rounded-md">
                  <option value="LKR">LKR (Sri Lankan Rupee)</option>
                  <option value="USD">USD (US Dollar)</option>
                  <option value="EUR">EUR (Euro)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                <select name="timezone" value={settings.timezone} onChange={handleInputChange} className="w-full p-2 border rounded-md">
>>>>>>> 009a9cb262ba69eba9b68f32ebc94587249f4128
                  <option value="Asia/Colombo">Asia/Colombo</option>
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">America/New_York</option>
                </select>
              </div>
<<<<<<< HEAD
              {/* Max Listings */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Listings Per User</label>
                <input
                  type="number"
                  name="maxListingsPerUser"
                  value={settings.maxListingsPerUser}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
=======
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Listings Per User</label>
                <input type="number" name="maxListingsPerUser" value={settings.maxListingsPerUser} onChange={handleInputChange} className="w-full p-2 border rounded-md" />
>>>>>>> 009a9cb262ba69eba9b68f32ebc94587249f4128
              </div>
            </div>
          </div>
        );
<<<<<<< HEAD
      case "security":
=======
      case 'security':
>>>>>>> 009a9cb262ba69eba9b68f32ebc94587249f4128
        return (
          <div className={CARD}>
            <div className={SECTION_HEADER}>Security Settings</div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Two-Factor Authentication</label>
<<<<<<< HEAD
                <input
                  type="checkbox"
                  name="enableTwoFactor"
                  checked={settings.enableTwoFactor}
                  onChange={handleInputChange}
                  className="w-5 h-5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Session Timeout (minutes)</label>
                <input
                  type="number"
                  name="sessionTimeout"
                  value={settings.sessionTimeout}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
=======
                <input type="checkbox" name="enableTwoFactor" checked={settings.enableTwoFactor} onChange={handleInputChange} className="w-5 h-5" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Session Timeout (minutes)</label>
                <input type="number" name="sessionTimeout" value={settings.sessionTimeout} onChange={handleInputChange} className="w-full p-2 border rounded-md" />
>>>>>>> 009a9cb262ba69eba9b68f32ebc94587249f4128
              </div>
            </div>
          </div>
        );
<<<<<<< HEAD
      case "notifications":
=======
      case 'notifications':
>>>>>>> 009a9cb262ba69eba9b68f32ebc94587249f4128
        return (
          <div className={CARD}>
            <div className={SECTION_HEADER}>Notification Settings</div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Email Notifications</label>
<<<<<<< HEAD
              <input
                type="checkbox"
                name="emailNotifications"
                checked={settings.emailNotifications}
                onChange={handleInputChange}
                className="w-5 h-5"
              />
            </div>
          </div>
        );
      case "backup":
=======
              <input type="checkbox" name="emailNotifications" checked={settings.emailNotifications} onChange={handleInputChange} className="w-5 h-5" />
            </div>
          </div>
        );
      case 'backup':
>>>>>>> 009a9cb262ba69eba9b68f32ebc94587249f4128
        return (
          <div className={CARD}>
            <div className={SECTION_HEADER}>Backup</div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Backup Frequency</label>
<<<<<<< HEAD
                <select
                  name="backupFrequency"
                  value={settings.backupFrequency}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                >
=======
                <select name="backupFrequency" value={settings.backupFrequency} onChange={handleInputChange} className="w-full p-2 border rounded-md">
>>>>>>> 009a9cb262ba69eba9b68f32ebc94587249f4128
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div className="flex gap-4">
<<<<<<< HEAD
                <button type="button" className="bg-[#3B50DF] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">Create Backup</button>
                <button type="button" className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors">Restore</button>
=======
                <button className="bg-[#3B50DF] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">Create Backup</button>
                <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors">Restore</button>
>>>>>>> 009a9cb262ba69eba9b68f32ebc94587249f4128
              </div>
            </div>
          </div>
        );
<<<<<<< HEAD
      case "advanced":
=======
      case 'advanced':
>>>>>>> 009a9cb262ba69eba9b68f32ebc94587249f4128
        return (
          <div className={CARD}>
            <div className={SECTION_HEADER}>Advanced Settings</div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max File Size (MB)</label>
<<<<<<< HEAD
                <input
                  type="number"
                  name="maxFileSize"
                  value={settings.maxFileSize}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                />
=======
                <input type="number" name="maxFileSize" value={settings.maxFileSize} onChange={handleInputChange} className="w-full p-2 border rounded-md" />
>>>>>>> 009a9cb262ba69eba9b68f32ebc94587249f4128
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Allowed File Types</label>
                <div className="flex flex-wrap gap-2">
                  {settings.allowedFileTypes.map((type, idx) => (
                    <span key={idx} className="bg-gray-100 px-3 py-1 rounded-full text-sm">{type}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

<<<<<<< HEAD
  if (loading) return <div className="p-10 text-center text-lg">Loading settings...</div>; // ✅ Loader

=======
>>>>>>> 009a9cb262ba69eba9b68f32ebc94587249f4128
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`w-64 ${SIDEBAR_BG} flex flex-col min-h-screen`}>
        <div className="p-6 border-b border-[#3B50DF]">
          <h2 className="text-2xl font-bold text-white tracking-wide">Urban Nest</h2>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
<<<<<<< HEAD
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${activeSection === item.id ? SIDEBAR_ACTIVE : SIDEBAR_TEXT + " hover:bg-[#4F5BD5] hover:text-white"}`}
=======
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${activeSection === item.id ? SIDEBAR_ACTIVE : SIDEBAR_TEXT + ' hover:bg-[#4F5BD5] hover:text-white'}`}
>>>>>>> 009a9cb262ba69eba9b68f32ebc94587249f4128
                >
                  <item.icon className={SIDEBAR_ICON} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
<<<<<<< HEAD

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
=======
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
>>>>>>> 009a9cb262ba69eba9b68f32ebc94587249f4128
        <div className="bg-[#3B50DF] p-4 flex items-center justify-between">
          <input
            type="text"
            placeholder="Enter an address, city, district, province"
            className="p-2 border rounded-md w-1/3 text-black"
          />
          <div className="flex gap-4 text-2xl text-white">
            <FaBell className="cursor-pointer hover:text-indigo-200" />
            <FaUserCircle className="cursor-pointer hover:text-indigo-200" />
          </div>
        </div>
<<<<<<< HEAD

=======
        {/* Settings Content */}
>>>>>>> 009a9cb262ba69eba9b68f32ebc94587249f4128
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-[#3B50DF]">Settings</h1>
          {renderSettingsContent()}
          <div className="flex justify-end mt-8">
            <button
              type="submit"
<<<<<<< HEAD
              className="flex items-center gap-2 bg-[#3B50DF] text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors text-lg font-semibold shadow disabled:opacity-50"
              disabled={saving}
            >
              <FaSave />
              {saving ? "Saving..." : "Save Changes"}
=======
              className="flex items-center gap-2 bg-[#3B50DF] text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors text-lg font-semibold shadow"
            >
              <FaSave />
              Save Changes
>>>>>>> 009a9cb262ba69eba9b68f32ebc94587249f4128
            </button>
          </div>
        </form>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
} 
>>>>>>> 009a9cb262ba69eba9b68f32ebc94587249f4128
