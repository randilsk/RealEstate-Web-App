import { upload } from '../config/cloudinary.js';

// Export the single upload middleware
export const uploadSingle = upload.single('image');

// Export a multiple upload middleware if needed
export const uploadMultiple = upload.array('images', 5); // allows up to 5 images\