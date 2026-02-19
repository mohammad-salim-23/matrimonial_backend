import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";

import config from "../../config/index.js";
import { User } from "./user.model.js";
import AppError from "../../errors/AppError.js";
import bcrypt from "bcrypt";
import { createToken } from "./user.util.js";
import { TRegisterUser } from "./user.interface.js";


const registerUser = async (payload: TRegisterUser) => {
  // ১. চেক করুন ইউজার আগে থেকে আছে কি না
  const isUserExist = await User.findOne({ email: payload.email });
  if (isUserExist) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User already exists with this email!');
  }

  // ২. ইউনিক রেফারেল কোড জেনারেট করা (নামের প্রথম ৩ অক্ষর + র‍্যান্ডম ৪ ডিজিট)
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const referralCode = `${payload.name.substring(0, 3).toUpperCase()}${randomSuffix}`;

  // ৩. ইউজার ক্রিয়েট (পাসওয়ার্ড অটো হ্যাশ হবে মডেলের প্রি-সেভ হুক থেকে)
  const result = await User.create({
    ...payload,
    referralCode,
  });

  return result;
};

const loginUser = async (payload: any) => {
  // স্ট্যাটিক মেথড ব্যবহার করে ইউজার চেক
  const user = await User.isUserExistsByEmail(payload.email);
  
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  if (user.isBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Your account has been blocked.');
  }

  // password match check
  const isMatched = await User.isPasswordMatched(payload.password, user.password);
  if (!isMatched) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Invalid credentials.');
  }

  const jwtPayload = {
    userId: user._id,
    name: user.name,
    email: user.email,
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