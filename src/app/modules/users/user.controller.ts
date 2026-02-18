import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync.js";
import { AuthServices } from "./user.service.js";
import sendResponse from "../../utils/sendResponse.js";

const registerUser = catchAsync(async (req, res) => {
  const result = await AuthServices.registerUser(req.body);
  
  const filteredData = {
    _id: result._id,
    name: result.name,
    email: result.email,
    role: result.role
  };

  // Welcome Email 
  // sendEmail(filteredData.email, "Welcome to Scollop", "Your account is ready!");

  sendResponse(res, {
    success: true,
    message: 'User registration successful',
    statusCode: StatusCodes.CREATED,
    data: filteredData
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  sendResponse(res, {
    success: true,
    message: 'Login successful',
    statusCode: StatusCodes.OK,
    data: result
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const result = await AuthServices.getAllUser();
  sendResponse(res, {
    success: true,
    message: 'All user list retrieved successfully',
    statusCode: StatusCodes.OK,
    data: result
  });
});

const updateUserStatus = catchAsync(async (req, res) => {
  let { id } = req.params;
  const { isBlocked } = req.body;

  // Normalize id to a single string and validate presence
  if (Array.isArray(id)) {
    id = id[0];
  }

  if (!id) {
    return sendResponse(res, {
      success: false,
      message: 'Valid user ID was not provided',
      statusCode: StatusCodes.BAD_REQUEST,
      data: null
    });
  }

  const result = await AuthServices.updateUserStatus(id as string, isBlocked);
  sendResponse(res, {
    success: true,
    message: 'User status updated successfully',
    statusCode: StatusCodes.OK,
    data: result
  });
});

export const AuthControllers = {
  registerUser,
  loginUser,
  getAllUser,
  updateUserStatus
};