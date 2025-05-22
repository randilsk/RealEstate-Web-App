const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Admin = require('../models/Admin');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Get all settings
router.get('/', async (req, res) => {
  try {
    let admin = await Admin.findOne();
    if (!admin) {
      admin = await Admin.create({});
    }
    res.json(admin);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ message: 'Error fetching settings' });
  }
});

// Update profile settings
router.put('/profile', async (req, res) => {
  try {
    let admin = await Admin.findOne();
    if (!admin) {
      admin = new Admin();
    }
    admin.profile = { ...admin.profile, ...req.body };
    await admin.save();
    res.json(admin);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile settings' });
  }
});

// Upload profile picture
router.post('/profile/picture', upload.single('profilePicture'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    let admin = await Admin.findOne();
    if (!admin) {
      admin = new Admin();
    }

    // Delete old profile picture if exists
    if (admin.profile.profilePicture) {
      const oldPath = path.join(__dirname, '..', admin.profile.profilePicture);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    admin.profile.profilePicture = '/uploads/' + req.file.filename;
    await admin.save();
    res.json({ profilePicture: admin.profile.profilePicture });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).json({ message: 'Error uploading profile picture' });
  }
});

// Update system settings
router.put('/system', async (req, res) => {
  try {
    let admin = await Admin.findOne();
    if (!admin) {
      admin = new Admin();
    }
    admin.system = { ...admin.system, ...req.body };
    await admin.save();
    res.json(admin);
  } catch (error) {
    console.error('Error updating system settings:', error);
    res.status(500).json({ message: 'Error updating system settings' });
  }
});

// Update listings settings
router.put('/listings', async (req, res) => {
  try {
    let admin = await Admin.findOne();
    if (!admin) {
      admin = new Admin();
    }
    admin.listings = { ...admin.listings, ...req.body };
    await admin.save();
    res.json(admin);
  } catch (error) {
    console.error('Error updating listings settings:', error);
    res.status(500).json({ message: 'Error updating listings settings' });
  }
});

// Update security settings
router.put('/security', async (req, res) => {
  try {
    let admin = await Admin.findOne();
    if (!admin) {
      admin = new Admin();
    }
    admin.security = { ...admin.security, ...req.body };
    await admin.save();
    res.json(admin);
  } catch (error) {
    console.error('Error updating security settings:', error);
    res.status(500).json({ message: 'Error updating security settings' });
  }
});

// Update notification settings
router.put('/notifications', async (req, res) => {
  try {
    let admin = await Admin.findOne();
    if (!admin) {
      admin = new Admin();
    }
    admin.notifications = { ...admin.notifications, ...req.body };
    await admin.save();
    res.json(admin);
  } catch (error) {
    console.error('Error updating notification settings:', error);
    res.status(500).json({ message: 'Error updating notification settings' });
  }
});

// Update appearance settings
router.put('/appearance', async (req, res) => {
  try {
    let admin = await Admin.findOne();
    if (!admin) {
      admin = new Admin();
    }
    admin.appearance = { ...admin.appearance, ...req.body };
    await admin.save();
    res.json(admin);
  } catch (error) {
    console.error('Error updating appearance settings:', error);
    res.status(500).json({ message: 'Error updating appearance settings' });
  }
});

// Update data settings
router.put('/data', async (req, res) => {
  try {
    let admin = await Admin.findOne();
    if (!admin) {
      admin = new Admin();
    }
    admin.data = { ...admin.data, ...req.body };
    await admin.save();
    res.json(admin);
  } catch (error) {
    console.error('Error updating data settings:', error);
    res.status(500).json({ message: 'Error updating data settings' });
  }
});

// Update user settings
router.put('/users', async (req, res) => {
  try {
    let admin = await Admin.findOne();
    if (!admin) {
      admin = new Admin();
    }
    admin.users = { ...admin.users, ...req.body };
    await admin.save();
    res.json(admin);
  } catch (error) {
    console.error('Error updating user settings:', error);
    res.status(500).json({ message: 'Error updating user settings' });
  }
});

module.exports = router; 