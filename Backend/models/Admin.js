// Backend/models/Admin.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  profile: {
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    profilePicture: { type: String, default: '' },
    // add more profile-related fields as needed
  },
  system: {
    maintenanceMode: { type: Boolean, default: false },
    version: { type: String, default: '1.0.0' },
    // add more system-related fields as needed
  },
  listings: {
    autoApprove: { type: Boolean, default: false },
    defaultStatus: { type: String, default: 'pending' },
    // add more listing-related fields
  },
  security: {
    twoFactorAuth: { type: Boolean, default: false },
    passwordPolicy: { type: String, default: 'standard' },
    // add more security-related fields
  },
  notifications: {
    emailNotifications: { type: Boolean, default: true },
    smsNotifications: { type: Boolean, default: false },
    // add more notification preferences
  },
  appearance: {
    theme: { type: String, default: 'light' },
    logoUrl: { type: String, default: '' },
    // add more appearance settings
  },
  data: {
    backupFrequency: { type: String, default: 'weekly' },
    storageLimit: { type: Number, default: 1000 }, // in MB
    // add more data settings
  },
  users: {
    canRegister: { type: Boolean, default: true },
    defaultRole: { type: String, default: 'user' },
    // add more user settings
  }
});

module.exports = mongoose.model('Admin', adminSchema);
