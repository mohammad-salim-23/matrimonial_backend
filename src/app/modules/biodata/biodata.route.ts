import express from 'express';
import auth from '../../middleware/auth.js';
import { USER_ROLE } from '../users/user.interface.js';
import { BiodataControllers } from './biodata.controller.js';

const router = express.Router();

// 1. Save or Update Biodata Chunk (LoggedIn User Only)
router.post(
  '/save-chunk',
  auth(USER_ROLE.user, USER_ROLE.admin), // Both user and admin can save/update biodata
  BiodataControllers.saveChunk
);

// 2. Get All Approved Biodatas (Public or Authenticated)
// Note: req.user will be used inside controller for role-based field hiding
router.get(
  '/',
  auth(USER_ROLE.user, USER_ROLE.admin), 
  BiodataControllers.getAllBiodata
);

// 3. Get Single Biodata by ID
router.get(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  BiodataControllers.getSingleBiodata
);

// 4. Soft Delete / Reject Biodata (Only Admin can reject/delete)
router.patch(
  '/delete/:id',
  auth(USER_ROLE.admin),
  BiodataControllers.deleteBiodata
);

export const BiodataRoutes = router;