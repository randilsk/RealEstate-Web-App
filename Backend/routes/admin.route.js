import express from 'express';
import {
  adminSignUp,
  adminSignIn,
  adminSignOut,
  getAdminProfile,
  updateAdminProfile,
  getAllUsers,
  getUserById,
  deleteUser,
  getAllAdmins,
  updateAdminStatus,
  getDashboardStats
} from '../controllers/adminProfileController.js';
import {
  verifyAdminToken,
  verifyAdminPermission,
  verifySuperAdmin,
  validateUrbanNestDomain
} from '../middleware/admin.middleware.js';

const router = express.Router();

// Auth routes
router.post('/signup', validateUrbanNestDomain, adminSignUp);
router.post('/signin', validateUrbanNestDomain, adminSignIn);
router.post('/signout', adminSignOut);

// Protected admin routes
router.get('/profile', verifyAdminToken, getAdminProfile);
router.put('/profile', verifyAdminToken, updateAdminProfile);

// Dashboard
router.get('/dashboard/stats', 
  verifyAdminToken, 
  verifyAdminPermission(['view_analytics']), 
  getDashboardStats
);

// User management routes
router.get('/users', 
  verifyAdminToken, 
  verifyAdminPermission(['manage_users']), 
  getAllUsers
);

router.get('/users/:userId', 
  verifyAdminToken, 
  verifyAdminPermission(['manage_users']), 
  getUserById
);

router.delete('/users/:userId', 
  verifyAdminToken, 
  verifyAdminPermission(['manage_users']), 
  deleteUser
);

// Super admin only routes
router.get('/admins', 
  verifyAdminToken, 
  verifySuperAdmin, 
  getAllAdmins
);

router.put('/admins/:adminId/status', 
  verifyAdminToken, 
  verifySuperAdmin, 
  updateAdminStatus
);

export default router;