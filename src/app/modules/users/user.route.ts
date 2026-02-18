import { Router } from "express";

import auth from "../../middleware/auth.js";
import { AuthValidation } from "./user.validation.js";
import { AuthControllers } from "./user.controller.js";
import validateRequest from "../../middleware/validateRequest.js";


const router = Router();

router.post('/login',
    validateRequest(AuthValidation.loginValidationSchema),
    AuthControllers.loginUser
);
router.post(
  '/register',
  
  AuthControllers.registerUser,
);
router.get('/users',
  auth("admin"),
  AuthControllers.getAllUser
)
router.patch('/users/:id',
  AuthControllers.updateUserStatus
)

export const authRoutes = router;