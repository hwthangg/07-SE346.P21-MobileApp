import multer from 'multer';
import { storage } from '../cloudinary.js';

/**
 * Middleware upload nhiều ảnh (ESM)
 * @param {string} fieldName - tên field form-data (VD: "images")
 * @param {number} maxCount - số ảnh tối đa
 */
const uploadMultiple = (fieldName, maxCount = 5) => {
  const upload = multer({ storage });
  return upload.array(fieldName, maxCount);
};

export default uploadMultiple;
