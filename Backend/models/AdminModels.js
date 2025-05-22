import mongoose from 'mongoose';


const settingsSchema = new mongoose.Schema({
  siteName: {
    type: String,
    required: true,
    default: "Urban Nest"
  },
  emailNotifications: {
    type: Boolean,
    default: true
  },
  maintenanceMode: {
    type: Boolean,
    default: false
  },
  maxListingsPerUser: {
    type: Number,
    default: 10
  },
  currency: {
    type: String,
    default: "LKR"
  },
  timezone: {
    type: String,
    default: "Asia/Colombo"
  },
  enableUserRegistration: {
    type: Boolean,
    default: true
  },
  enableComments: {
    type: Boolean,
    default: true
  },
  enableRatings: {
    type: Boolean,
    default: true
  },
  maxFileSize: {
    type: Number,
    default: 5
  },
  allowedFileTypes: {
    type: [String],
    default: ["jpg", "png", "pdf"]
  },
  backupFrequency: {
    type: String,
    enum: ["hourly", "daily", "weekly", "monthly"],
    default: "daily"
  },
  enableTwoFactor: {
    type: Boolean,
    default: false
  },
  sessionTimeout: {
    type: Number,
    default: 30
  }
}, {
  timestamps: true
});

const Settings = mongoose.model('Settings', settingsSchema); 
export default Settings;