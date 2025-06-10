import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import User from '../models/user.model.js';
import { uploadOnCloudinary} from '../utils/cloudinary.js';

const registerUser=asyncHandler(async (req, res) => 
   { //middleware to handle file uploads
   const {username,password,email,fullname} = req.body;
   if([fullname,email,username,password].some((field)=>
      field?.trim()==="")){
       throw new ApiError(400,"All fields are required"); 
   }
   User.findOne({
      $or:[{username},{email}]}
      ).then((user)=>{throw new ApiError(

         "Username or email already exists",409)})

   const avatarLocalPath=req.files?.avatar[0]?.path;
   const coverImagePath=req.files?.coverimage[0]?.path;
   if(!avatarLocalPath)
   {throw new ApiError("Avatar is required",400);}
})

export {registerUser};

//get user details from frontend
//validation-not empty,already existing
// 