import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema({
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
  email: String,
  district: String,
  lat: Number,
  lng: Number,
  price: Number,
  images: [String],
  homeType: String,
  bedrooms: Number,
  attachedBathrooms: Number,
  detachedBathrooms: Number,
  floors: Number,
  houseArea: Number,
  landArea: Number,
  parking: String,
  buildYear: Number,
  description: String,
  phone: String,
  status: { // <--- Add this field
    type: String,
    enum: ['pending', 'approved', 'rejected'], // Define allowed values
    default: 'pending', // Set a default value if desired
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Listing = mongoose.model("Listing", ListingSchema);

export default Listing;
