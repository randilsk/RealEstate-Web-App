import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import { cloudinary } from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "listings", // Cloudinary folder name
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const parser = multer({ storage });

export default parser;