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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Listing = mongoose.model("Listing", ListingSchema);

export default Listing;
