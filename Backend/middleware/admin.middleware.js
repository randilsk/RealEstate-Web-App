import jwt from 'jsonwebtoken';
import { errorHandler } from '../utills/error.js';
import Admin from '../models/AdminModel.js';

// Verify admin token
export const verifyAdminToken = async (req, res, next) => {
  try {
    // Get the token from cookies or Authorization header
    let token = req.cookies.admin_token;
    
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }
    
    if (!token) {
      return next(errorHandler(401, 'Unauthorized - No admin token provided'));
    }
    
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if the admin exists and is active
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return next(errorHandler(404, 'Admin not found'));
    }
    
    if (!admin.isActive) {
      return next(errorHandler(403, 'Admin account is deactivated'));
    }
    
    // Verify the email domain (extra security)
    if (!admin.email.endsWith('@urbannest.com')) {
      return next(errorHandler(403, 'Invalid admin domain'));
    }
    
    // Add the admin to the request object
    req.admin = admin;
    
    // Continue to the next middleware or controller
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return next(errorHandler(401, 'Invalid admin token'));
    }
    if (error.name === 'TokenExpiredError') {
      return next(errorHandler(401, 'Admin token expired'));
    }
    next(error);
  }
};

// Verify admin permissions
export const verifyAdminPermission = (requiredPermissions) => {
  return (req, res, next) => {
    try {
      const admin = req.admin;
      
      if (!admin) {
        return next(errorHandler(401, 'Admin authentication required'));
      }
      
      // Super admin has all permissions
      if (admin.role === 'super-admin') {
        return next();
      }
      
      // Check if admin has required permissions
      const hasPermission = requiredPermissions.some(permission => 
        admin.permissions.includes(permission)
      );
      
      if (!hasPermission) {
        return next(errorHandler(403, 'Insufficient admin permissions'));
      }
      
      next();
    } catch (error) {
      next(error);
    }
  };
};

// Verify super admin only
export const verifySuperAdmin = (req, res, next) => {
  try {
    const admin = req.admin;
    
    if (!admin) {
      return next(errorHandler(401, 'Admin authentication required'));
    }
    
    if (admin.role !== 'super-admin') {
      return next(errorHandler(403, 'Super admin access required'));
    }
    
    next();
  } catch (error) {
    next(error);
  }
};

// Check if email is from urbannest.com domain
export const validateUrbanNestDomain = (req, res, next) => {
  const { email } = req.body;
  
  if (!email || !email.endsWith('@urbannest.com')) {
    return next(errorHandler(400, 'Only @urbannest.com email addresses are allowed for admin access'));
  }
  
  next();
};