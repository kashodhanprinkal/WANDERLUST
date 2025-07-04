import multer from 'multer';
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Now uses the ensured uploads subdirectory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname).toLowerCase();
    const originalName = path.basename(file.originalname, ext).replace(/[^a-z0-9]/gi, '_');
    cb(null, `${originalName}-${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.jpg', '.jpeg', '.png', '.webp'];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error(`Unsupported file type. Allowed types: ${allowedTypes.join(', ')}`), false);
  }
};

const limits = {
  fileSize: 5 * 1024 * 1024, // 5MB
  files: 1 // Single file uploads only
};

const upload = multer({
  storage,
  fileFilter,
  limits,
  onError: (err, next) => {
    console.error('Multer error:', err);
    next(err);
  }
});

export default upload;
