import express from 'express';
import {
  getAllApprovedListings,
  getApprovedListings,
  addApprovedListing,
  getSingleApprovedListing,
  updateApprovedListing,
  deleteApprovedListing,
  updateApprovedListingStatus
} from '../controllers/ApprovedListController.js';

const router = express.Router();


router.get('/getAllApprove', getAllApprovedListings);

router.get('/user/:email', getApprovedListings);

router.get('/:id', getSingleApprovedListing);


router.post('/', addApprovedListing);


router.put('/:id', updateApprovedListing);


router.patch('/:id/status', updateApprovedListingStatus);


router.delete('/:id', deleteApprovedListing);

export default router;