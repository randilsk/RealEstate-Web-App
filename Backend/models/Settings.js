const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  profile: {
    adminName: { type: String, default: 'Admin User' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    profilePicture: { type: String, default: '' }
  },
  system: {
    siteName: { type: String, default: 'Real Estate Platform' },
    siteDescription: { type: String, default: 'Your trusted platform for real estate listings and transactions' },
    maintenanceMode: { type: Boolean, default: false }
  },
  listings: {
    defaultStatus: { type: String, default: 'Active' },
    featuredLimit: { type: Number, default: 5 },
    autoApprove: { type: Boolean, default: false }
  },
  security: {
    twoFactorAuth: { type: Boolean, default: false },
    sessionTimeout: { type: Number, default: 30 },
    passwordPolicy: { type: String, default: 'Standard' }
  },
  notifications: {
    newListingAlerts: { type: Boolean, default: true },
    userRegistration: { type: Boolean, default: true },
    systemUpdates: { type: Boolean, default: false }
  },
  appearance: {
    primaryColor: { type: String, default: '#4F46E5' },
    theme: { type: String, default: 'Light' },
    logo: { type: String, default: '' }
  },
  data: {
    backupFrequency: { type: String, default: 'Daily' },
    dataRetention: { type: String, default: '30 days' }
  },
  users: {
    defaultRole: { type: String, default: 'User' },
    allowRegistration: { type: Boolean, default: true },
    requireEmailVerification: { type: Boolean, default: true }
  }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema); 