import mongoose from "mongoose";

const ApprovedListingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: String,
  username: String,
  district: String,
  lat: Number,
  lng: Number,
  price: Number,
  images: [String],
  homeType: {
    type: String,
    required: true,
    enum: ['Single Family', 'Multi Family', 'Apartment', 'Land', 'Other']
  },
  bedrooms: {
    type: Number,
    required: function() {
      return this.homeType !== 'Land' && this.homeType !== 'Apartment';
    }
  },
  attachedBathrooms: {
    type: Number,
    required: function() {
      return this.homeType !== 'Land' && this.homeType !== 'Apartment';
    }
  },
  detachedBathrooms: {
    type: Number,
    required: function() {
      return this.homeType !== 'Land' && this.homeType !== 'Apartment';
    }
  },
  floors: {
    type: Number,
    required: function() {
      return this.homeType !== 'Land' && this.homeType !== 'Apartment';
    }
  },
  houseArea: {
    type: Number,
    required: function() {
      return this.homeType !== 'Land';
    }
  },
  landArea: {
    type: Number,
    required: function() {
      return this.homeType === 'Land' || (this.homeType !== 'Apartment' && this.homeType !== 'Land');
    }
  },
  parking: {
    type: String,
    required: function() {
      return this.homeType !== 'Land';
    }
  },
  buildYear: {
    type: Number,
    required: function() {
      return this.homeType !== 'Land';
    }
  },
  description: String,
  phone: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
 
});

const ApprovedListing = mongoose.model("ApprovedListing", ApprovedListingSchema);

export default ApprovedListing;
