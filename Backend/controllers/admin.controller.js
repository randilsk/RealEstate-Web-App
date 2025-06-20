import Admin from '../models/AdminModel.js';
import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utills/error.js';

// Generate JWT token for admin
const generateAdminToken = (adminId) => {
  return jwt.sign(
    { id: adminId, type: 'admin' },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '24h' }
  );
};

// Admin Sign Up
export const adminSignUp = async (req, res, next) => {
  try {
    const { username, email, password, companyId, role = 'admin', permissions = [] } = req.body;
    
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingAdmin) {
      return next(errorHandler(400, 'Admin with this email or username already exists'));
    }
    
    // Create new admin
    const newAdmin = new Admin({
      username,
      email,
      password,
      companyId,  
      
     
    });
    
    await newAdmin.save();
    
    // Generate token
    const token = generateAdminToken(newAdmin._id);
    
    // Set cookie
    res.cookie('admin_token', token, {
      httpOnly: true,
      maxAge: 3600000,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    
    res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      admin: newAdmin
    });
  } catch (error) {
    next(error);
  }
};
// Admin Sign In
export const adminSignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return next(errorHandler(401, 'Invalid admin credentials'));
    }
    
    if (!admin.isActive) {
      return next(errorHandler(403, 'Admin account is deactivated'));
    }
    
   
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return next(errorHandler(401, 'Invalid admin credentials'));
    }
    

    admin.lastLogin = new Date();
    await admin.save();
    
  
    const token = generateAdminToken(admin._id);
    
 
    res.cookie('admin_token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    
    res.status(200).json({
      success: true,
      message: 'Admin signed in successfully',
      admin
    });
  } catch (error) {
    next(error);
  }
};


export const adminSignOut = (req, res, next) => {
  try {
    res.clearCookie('admin_token');
    res.status(200).json({
      success: true,
      message: 'Admin signed out successfully'
    });
  } catch (error) {
    next(error);
  }
};


export const getAdminProfile = async (req, res, next) => {
  try {
    const admin = req.admin;
    res.status(200).json({
      success: true,
      admin
    });
  } catch (error) {
    next(error);
  }
};

// Update Admin Profile
export const updateAdminProfile = async (req, res, next) => {
  try {
    const { username, email, permissions } = req.body;
    const adminId = req.admin._id;
    
    // Check if new email is still @urbannest.com
    if (email && !email.endsWith('@urbannest.com')) {
      return next(errorHandler(400, 'Email must be from @urbannest.com domain'));
    }
    
    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      { 
        ...(username && { username }),
        ...(email && { email }),
        ...(permissions && { permissions })
      },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      message: 'Admin profile updated successfully',
      admin: updatedAdmin
    });
  } catch (error) {
    if (error.code === 11000) {
      return next(errorHandler(400, 'Username or email already exists'));
    }
    next(error);
  }
};

// Get All Users (Admin only)
export const getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const users = await User.find()
      .select('-password')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    
    const totalUsers = await User.countDocuments();
    
    res.status(200).json({
      success: true,
      users,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalUsers / limit),
        totalUsers,
        hasNext: page < Math.ceil(totalUsers / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get User by ID (Admin only)
export const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }
    
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
};

// Delete User (Admin only)
export const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }
    
    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Get All Admins (Super Admin only)
export const getAllAdmins = async (req, res, next) => {
  try {
    const admins = await Admin.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      admins
    });
  } catch (error) {
    next(error);
  }
};

// Update Admin Status (Super Admin only)
export const updateAdminStatus = async (req, res, next) => {
  try {
    const { adminId } = req.params;
    const { isActive } = req.body;
    
    const admin = await Admin.findByIdAndUpdate(
      adminId,
      { isActive },
      { new: true }
    );
    
    if (!admin) {
      return next(errorHandler(404, 'Admin not found'));
    }
    
    res.status(200).json({
      success: true,
      message: `Admin ${isActive ? 'activated' : 'deactivated'} successfully`,
      admin
    });
  } catch (error) {
    next(error);
  }
};

// Dashboard Statistics
export const getDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAdmins = await Admin.countDocuments();
    const activeAdmins = await Admin.countDocuments({ isActive: true });
    
    // Get users registered in the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentUsers = await User.countDocuments({ 
      createdAt: { $gte: thirtyDaysAgo } 
    });
    
    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalAdmins,
        activeAdmins,
        recentUsers,
        userGrowth: ((recentUsers / totalUsers) * 100).toFixed(2) + '%'
      }
    });
  } catch (error) {
    next(error);
  }
};