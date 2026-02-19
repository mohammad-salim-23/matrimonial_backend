import { Router } from 'express';
import { authRoutes } from '../modules/users/user.route.js';

 

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: authRoutes
  },
 
];


 moduleRoutes.forEach((route) => router.use(route.path, route.route));



export default router;