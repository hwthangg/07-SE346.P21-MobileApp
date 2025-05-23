
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});



const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "QLDV",
    allowed_formats: ["jpg", "png", "jpeg", "webp", "pdf"],
  },
});
export { cloudinary, storage };
