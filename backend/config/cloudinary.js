import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config(); // ✅ Must come before cloudinary.config()

// ✅ This should now show all values correctly
console.log("🔍 Cloudinary ENV", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET ? "✅ Present" : "❌ Missing"
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    console.log("🧪 localFilePath:", localFilePath);

    if (!localFilePath) {
      console.log("❌ No localFilePath provided");
      return null;
    }

    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });

    console.log("✅ Upload success:", result.secure_url);
    return result;
  } catch (error) {
    console.error("❌ Cloudinary upload error:", error);
    throw error;
  }
};

export default uploadOnCloudinary;
