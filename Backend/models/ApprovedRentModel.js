import mongoose from "mongoose";

const ApprovedRentSchema = new mongoose.Schema({
  listingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RentListing",
    required: true,
  },
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
  monthlyRent: Number,
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
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "approved",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ApprovedRent = mongoose.model("ApprovedRent", ApprovedRentSchema);

export default ApprovedRent;
