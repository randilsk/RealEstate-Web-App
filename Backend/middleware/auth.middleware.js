import jwt from 'jsonwebtoken';
import { errorHandler } from '../utills/error.js';
import User from '../models/UserModel.js';

export const verifyToken = async (req, res, next) => {
  try {
    // Get the token from the cookies
    const token = req.cookies.access_token;
    
    if (!token) {
      return next(errorHandler(401, 'Unauthorized - No token provided'));
    }
    
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if the user exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }
    
    // Check if the user is trying to delete their own account
    const { userId } = req.params;
    if (decoded.id !== userId) {
      return next(errorHandler(403, 'Forbidden - You can only delete your own account'));
    }
    
    // Add the user to the request object
    req.user = user;
    
    // Continue to the next middleware or controller
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return next(errorHandler(401, 'Invalid token'));
    }
    if (error.name === 'TokenExpiredError') {
      return next(errorHandler(401, 'Token expired'));
    }
    next(error);
  }
};

// New middleware for Stripe routes that doesn't require userId parameter
export const verifyTokenForStripe = async (req, res, next) => {
  try {
    console.log('Cookies received:', req.cookies); // Debug log
    console.log('Headers received:', req.headers); // Debug log
    
    // Get the token from the cookies
    const token = req.cookies.access_token;
    
    if (!token) {
      console.log('No access_token found in cookies'); // Debug log
      return next(errorHandler(401, 'Unauthorized - No token provided'));
    }
    
    console.log('Token found:', token.substring(0, 20) + '...'); // Debug log (first 20 chars)
    
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded successfully, user ID:', decoded.id); // Debug log
    
    // Check if the user exists
    const user = await User.findById(decoded.id);
    if (!user) {
      console.log('User not found in database'); // Debug log
      return next(errorHandler(404, 'User not found'));
    }
    
    console.log('User found:', user.email); // Debug log
    
    // Add the user to the request object
    req.user = user;
    
    // Continue to the next middleware or controller
    next();
  } catch (error) {
    console.error('Auth middleware error:', error); // Debug log
    if (error.name === 'JsonWebTokenError') {
      return next(errorHandler(401, 'Invalid token'));
    }
    if (error.name === 'TokenExpiredError') {
      return next(errorHandler(401, 'Token expired'));
    }
    next(error);
  }
}; 

// Middleware for profile updates - allows users to update their own profile
export const verifyTokenForProfile = async (req, res, next) => {
  try {
    // Get the token from the cookies
    const token = req.cookies.access_token;
    
    if (!token) {
      return next(errorHandler(401, 'Unauthorized - No token provided'));
    }
    
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if the user exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }
    
    // Check if the user is trying to update their own profile
    const { userId } = req.params;
    if (decoded.id !== userId) {
      return next(errorHandler(403, 'Forbidden - You can only update your own profile'));
    }
    
    // Add the user to the request object
    req.user = user;
    
    // Continue to the next middleware or controller
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return next(errorHandler(401, 'Invalid token'));
    }
    if (error.name === 'TokenExpiredError') {
      return next(errorHandler(401, 'Token expired'));
    }
    next(error);
  }
};