// import express from 'express';
// import { updateUsercontroller } from '../controllers/user.controller.js';
// import userAuth from '../middlewares/auth.middleware.js';

// //router object
// const router = express.Router();

// //routes
// //get users
// // router.get('/users',); 

// //update user info
// router.put('/update-user', userAuth, updateUsercontroller);//this is a protected route,so authMiddleware is used first

// export default router;


import express from 'express';
import { getUserData, updateUsercontroller } from '../controllers/user.controller.js';
import userAuth from '../middlewares/auth.middleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User account management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateUser:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           description: First name of the user
 *         lastName:
 *           type: string
 *           description: Last name of the user
 *         email:
 *           type: string
 *           description: User's email address
 *         phone:
 *           type: string
 *           description: User's phone number
 *         location:
 *           type: string
 *           description: User's location (e.g. city, country)
 *       example:
 *         name: Jane
 *         lastName: Smith
 *         email: jane.smith@example.com
 *         phone: '+91 9876543210'
 *         location: Delhi
 */

/**
 * @swagger
 * /api/v1/user/update-user:
 *   put:
 *     summary: Update current user's information
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Fields to update (at least `name` and `email` required)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateUser'
 *       400:
 *         description: Validation error / Missing required fields
 *       401:
 *         description: Unauthorized (invalid or missing token)
 *       500:
 *         description: Server error
 */

// routes
// get user data || post
router.post('/getUser', userAuth, getUserData);

//update user || put
router.put('/update-user', userAuth, updateUsercontroller);

export default router;
