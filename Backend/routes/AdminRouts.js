import express from 'express';
import {
    getSettings,
    updateSettings,
    createBackup,
    restoreBackup
  } from '../controllers/AdminControllers.js';
  
  
  const router = express.Router();




// Get settings
router.get('/', getSettings);

// Update settings
router.put('/', updateSettings);

// Backup routes
router.post('/backup', createBackup);
router.post('/restore', restoreBackup);



export default router;