import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

// ---- Our env is async is loaded that's why we are configuring on runtime ---- //
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

let isConfigured = false;

const configureCloduinary = () => {
  if (!isConfigured) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });

    isConfigured = true;
  }
}

const uploadOnCloudinary = async (localFilePath) => {
  configureCloduinary();

  try {
    if (!localFilePath) return null;

    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    });

    // file has been uploaded successfully
    // console.log("file is uploaded on cloduinary: ", response.url);
    fs.unlinkSync(localFilePath);
    return response;
  }
  catch (error) {
    // remove the locally saved temporarily saved file as the operation get failed
    console.log(error);
    fs.unlinkSync(localFilePath);
    return null;
  }
}

export {uploadOnCloudinary};
