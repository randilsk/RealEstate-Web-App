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