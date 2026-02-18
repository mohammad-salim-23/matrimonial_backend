import { NextFunction, Request, Response } from "express";

import catchAsync from "../utils/catchAsync.js";

import { StatusCodes } from "http-status-codes";
import AppError from "../errors/AppError.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/index.js";
import { TUserRole } from "../modules/users/user.interface.js";
import { User } from "../modules/users/user.model.js";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;

    // checking token existence
    if (!token) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        'You are not authorized to access this route. No token provided.'
      );
    }

    // remove bearer prefix
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    // JWT token verify
    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(
        token as string,// as string: because token can be string | undefined , if we are sure that it is string then we can use as string
        config.jwt_access_secret as string
      ) as JwtPayload;
    } catch (error) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Token is invalid or has expired.');
    }

    const { role, userEmail } = decoded;

    // check user existence
    const user = await User.isUserExistsByEmail(userEmail);
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User not found with this token.');
    }

    // check if user is blocked
    if (user.isBlocked) {
      throw new AppError(StatusCodes.FORBIDDEN, 'Your account has been blocked. Please contact support.');
    }

    // check user role authorization
    if (requiredRoles.length && !requiredRoles.includes(role as TUserRole)) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        'You do not have permission to access this route.'
      );
    }

    // attach user to request object
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;