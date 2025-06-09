import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'; 

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,});

 const uploadOnCloudinary = async (localfilePath) => {
    try {
        if(!localfilePath) return null;
        const result = await cloudinary.uploader.upload(localfilePath, {
            resource_type: 'auto',
        });
        //return result;
        console.log('File uploaded successfully:', result.url);
        return result;
    } catch (error) {
        fs.unlinkSync(localfilePath); // Delete the file if upload fails
        console.error('Error uploading to Cloudinary:', error);
        return null;
    }}

    export {uploadOnCloudinary}
