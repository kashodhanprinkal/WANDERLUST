import multer from "multer";
import path from "path";

// Create absolute path for storage folder (public)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "public")); // Absolute path to /public folder
  },
  filename: (req, file, cb) => {
    // Add timestamp prefix to avoid overwriting files
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);  // preserve file extension
    cb(null, uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

export default upload;
