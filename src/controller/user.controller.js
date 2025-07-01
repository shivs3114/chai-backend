import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {User} from '../models/user.model.js';
import { uploadOnCloudinary} from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser=asyncHandler(async (req, res) => 
   { //middleware to handle file uploads
   const {username,password,email,fullName} = req.body;
   console.log(req.body);
   
   if([username,password,email,fullName].some((field)=>
      field?.trim()==="")){
       throw new ApiError(400,"All fields are required"); 
   }
   const existedUser=await User.findOne({
      $or:[{username},{email}]}
      )
     if(existedUser){
      throw new ApiError("Username or email already exists",400);} 

   const avatarLocalPath=req.files?.avatar[0]?.path;
   //const coverImagePath=req.files?.coverimage[0]?.path;
   if(!avatarLocalPath)
   {throw new ApiError("Avatar is required",400);}
   const avatar=await uploadOnCloudinary(avatarLocalPath)
   let coverImagePath;
   if(req.files &&Array.isArray(req.files.coverimage) && req.files.coverimage.length > 0) {
      coverImagePath = req.files.coverimage[0].path;
   }

   const coverimage=await uploadOnCloudinary(coverImagePath);
   if(!avatar){
      throw new ApiError("Avatar upload failed",400);
   }

   const user=await User.create({fullName,
      avatar:avatar.url,
coverimage:coverimage?.url||"",
email,
password,
username:username.toLowerCase(),   })

  const createdUser= await User.findById(user._id).select("-password -refreshToken"); //string me space dekar likhna hota kya nahi chahiye
  if(!createdUser){
      throw new ApiError("User creation failed",500);
  }
  return res.status(201).json(new ApiResponse(201,"User created successfully",createdUser));
})

export {registerUser};

//get user details from frontend
//validation-not empty,already existing
// check for images ,checks fir avatar
// create user bject-create entry in db
//remove password and refresh token field from response
//check for user creation
//return response with user details