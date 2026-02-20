import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync.js';
import { BiodataServices } from './biodata.service.js';
import sendResponse from '../../utils/sendResponse.js';
import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError.js';


const saveChunk = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.userId; // From auth middleware
  const { result, percentage } = await BiodataServices.saveBiodataChunk(userId, req.body);
  const successMessage = percentage === 100 ? "Congratulations! Your profile is 100% complete. Admin will review and approve it shortly." : `Biodata saved successfully (${percentage}% complete)`;
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: `Biodata saved successfully (${percentage}% complete)`,
    data: result,
  });
});

const getAllBiodata = catchAsync(async (req: Request, res: Response) => {
  // Passing req.query for filters and req.user for role-based privacy
  const result = await BiodataServices.getAllBiodataFromDB(req.query, req.user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Biodatas retrieved successfully',
    data: result,
  });
});

const getSingleBiodata = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  
  // Passing id and req.user to ensure privateInfo is hidden for non-admins
  const result = await BiodataServices.getSingleBiodataFromDB(id as string, req.user);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Biodata retrieved successfully',
    data: result,
  });
});
const deleteBiodata = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  // Soft delete: Updating status to Rejected
  const result = await BiodataServices.deleteBiodataFromDB(id as string);

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Biodata not found");
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Biodata has been rejected/soft-deleted successfully',
    data: result,
  });
});
export const BiodataControllers = {
  saveChunk,
  getAllBiodata,
  getSingleBiodata,
  deleteBiodata
};