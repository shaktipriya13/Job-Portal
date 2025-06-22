import express from 'express';
import { updateUsercontroller } from '../controllers/user.controller.js';
import userAuth from '../middlewares/auth.middleware.js';

//router object
const router = express.Router();

//routes
//get users
// router.get('/users',); 

//update user info
router.put('/update-user', userAuth, updateUsercontroller);//this is a protected route,so authMiddleware is used first

export default router;
