import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {User} from '../models/user.model.js';
import { uploadOnCloudinary} from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

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
   const avatar=await uploadOnCloudinary(avatarLocalPath)

   const coverimage=await uploadOnCloudinary(coverImagePath);
   if(!avatar){
      throw new ApiError("Avatar upload failed",400);
   }

   const user=await User.create({fullname,
      avatar:avatar.url
  ,
coverimage:coverimage?.url||"",
email,
password,
username:username.toLowerCase(),   })

  const createdUser= await User.findById(user._id).select("-password -refreshToken"); //string me soace dekar likhna hota kya nahi chahiye
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