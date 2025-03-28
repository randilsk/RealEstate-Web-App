import fs from 'fs';
import { Property } from '../models/SellModel';
import { uploadToCloudinary } from '../utils/cloudinaryConfig.js';

export const createPropertyListing = async (req, res) => {
  try {
    const { 
      price, 
      homeType, 
      beds, 
      attachedBathrooms, 
      detachedBathrooms, 
      floors, 
      houseArea, 
      landArea, 
      parkingAvailability, 
      buildYear, 
      description,
      sellerId
    } = req.body;

    // Upload photos to Cloudinary
    const photoUrls = [];
    if (req.files && req.files.length > 0) {
      // Use Promise.all to upload multiple images concurrently
      const uploadPromises = req.files.map(async (file) => {
        try {
          // Upload to Cloudinary
          const cloudinaryUrl = await uploadToCloudinary(file.path);
          
          // Remove local file after upload
          fs.unlinkSync(file.path);
          
          return cloudinaryUrl;
        } catch (uploadError) {
          console.error('Failed to upload image:', uploadError);
          return null;
        }
      });

      // Wait for all uploads to complete
      const uploadedUrls = await Promise.all(uploadPromises);
      
      // Filter out any failed uploads
      photoUrls.push(...uploadedUrls.filter(url => url !== null));
    }

    // Create new property listing
    const newProperty = new Property({
      price: parseFloat(price || 0),
      photos: photoUrls,
      homeType: homeType === 'Select property type' ? null : homeType,
      beds: parseInt(beds || 0),
      attachedBathrooms: parseInt(attachedBathrooms || 0),
      detachedBathrooms: parseInt(detachedBathrooms || 0),
      floors: parseInt(floors || 0),
      houseArea: parseFloat(houseArea || 0),
      landArea: parseFloat(landArea || 0),
      parkingAvailability: parkingAvailability === 'Select' ? null : parkingAvailability,
      buildYear: parseInt(buildYear || 0),
      description: description || '',
      termsAccepted: true,
      seller: sellerId
    });

    // Save the property listing
    await newProperty.save();

    res.status(201).json({
      message: 'Property listing created successfully',
      property: newProperty
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error creating property listing', 
      error: error.message 
    });
  }
};