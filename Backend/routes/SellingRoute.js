import express from 'express';
import { createPropertyListing, upload } from '../controllers/sellerController.js';

const router = express.Router();

// Route to create a new property listing
router.post('/create-listing', upload.array('photos', 10), createPropertyListing);

export default router;