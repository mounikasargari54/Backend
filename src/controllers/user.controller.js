import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import {
  uploadImageToCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";




const registerUser = asyncHandler(async (req, res) => {
  //get details from user
  //validate the details-not empty
  //check if user already exists:username or email
  //check for images,check for avatar
  //upload them to cloudinary,avatar
  //create user object-create entry in db
  //remove password and refresh token field from response
  //check for user creation
  //send response

  const { fullName, email, username, password } = req.body;
  console.log(email);
  if (
    [fullName, email, username, password].some((field) => feild?.trim() === "")
  ) {
    throw new ApiError(400, "Please fill all the fields");
  }

  const existedUser = User.findOne({ $or: [{ email }, { username }] });
  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Please upload an avatar");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(500, "Failed to upload avatar");
  }

  const user=await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage.url || "",
    email,
    password,
    username: username.toLowerCase()
  });

  const createUser=User.findById(user._id).select("-password -refreshToken");



  if(!createUser){
    throw new ApiError(500, "Failed to create user");
  }

  return res.status(201).json(
    new ApiResponse(201, createUser, "User created successfully")
  );
});

export { registerUser };
