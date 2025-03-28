import mongoose from 'mongoose';

const sellerSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  properties: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const propertySchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true
  },
  photos: [{
    type: String,  // URLs to stored images
    required: true
  }],
  homeType: {
    type: String,
    required: true,
    enum: ['Select property type', 'Apartment', 'House', 'Villa', 'Commercial', 'Land']
  },
  beds: {
    type: Number
  },
  attachedBathrooms: {
    type: Number
  },
  detachedBathrooms: {
    type: Number
  },
  floors: {
    type: Number
  },
  houseArea: {
    type: Number,  // in sq ft
  },
  landArea: {
    type: Number,  // in sq ft
  },
  parkingAvailability: {
    type: String,
    enum: ['Select', 'Yes', 'No', 'Limited']
  },
  buildYear: {
    type: Number
  },
  description: {
    type: String
  },
  termsAccepted: {
    type: Boolean,
    default: false
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller',
    required: true
  }
}, { timestamps: true });

const Seller = mongoose.model('Seller', sellerSchema);
const Property = mongoose.model('Property', propertySchema);

export { Seller, Property };