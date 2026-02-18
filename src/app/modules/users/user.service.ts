import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { TLoginUser, TRegisterUser } from "./user.interface.js";
import config from "../../config/index.js";
import { User } from "./user.model.js";
import AppError from "../../errors/AppError.js";
import bcrypt from "bcrypt";
import { createToken } from "./user.util.js";


const registerUser = async (payload: TRegisterUser) => {
  // password hash
  const hashedPassword = await bcrypt.hash(payload.password, Number(config.bcrypt_salt_round));
  
  const result = await User.create({
    ...payload,
    password: hashedPassword,
  });
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  // check user is exist 
  const user = await User.findOne({ email: payload.email }).select('+password');
  
  if (!user) {
    // User not found with this email
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found with this email address');
  }

  if (user.isBlocked) {
    //  Your account is blocked
    throw new AppError(StatusCodes.FORBIDDEN, 'Your account has been blocked. Please contact support.');
  }

  // password check
  const isMatched = await User.isPasswordMatched(payload.password, user.password);
  if (!isMatched) {
    // Password does not match
    throw new AppError(StatusCodes.FORBIDDEN, 'Invalid credentials. Password does not match.');
  }

  const jwtPayload = {
    userId: user._id,
    name: user.name,
    userEmail: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return { accessToken };
};

const getAllUser = async () => {
  return await User.find();
};

const updateUserStatus = async (id: string, isBlocked: boolean) => {
  const user = await User.findByIdAndUpdate(
    id,
    { isBlocked },
    { new: true }
  );
  if (!user) {
    //  User not found
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found to update status');
  }
  return user;
};

export const AuthServices = {
  registerUser,
  loginUser,
  getAllUser,
  updateUserStatus
};