import multer from 'multer';
import { storage } from '../cloudinary.js';
const upload = multer({ storage });

/**
 * Middleware upload 1 file
 * @param {string} fieldName - tên field form-data (VD: "image")
 */
const uploadSingle = (fieldName) => upload.single(fieldName);

export default uploadSingle;
