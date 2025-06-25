// import express from "express";
// import userAuth from "../middlewares/auth.middleware.js";
// import { createJobController, deleteJobController, getAllJobsController, jobStatsController, updateJobcontroller } from './../controllers/jobs.controller.js';

// const router = express.Router();


// //routes
// //1. create job-post
// router.post('/create-job', userAuth, createJobController);//its a protected route so we added a middleware

// // 2. get jobs: through this we can get the jobs created by a particular user through db user_id
// router.get('/get-job', userAuth, getAllJobsController);


// //3. for update jobs, we can use both put or patch
// router.patch('/update-job/:id', userAuth, updateJobcontroller);//here in this route we need to add a dynamic id of the job which will help us to update the job info.

// // 4. for deleting the job, note that the job must be delted only by the user who created it,so we provide auth for protection
// router.delete('/delete-job/:id', userAuth, deleteJobController);


// //5. get job stats and filter
// router.get('/job-stats', userAuth, jobStatsController);

// export default router;



import express from "express";
import userAuth from "../middlewares/auth.middleware.js";
import {
    createJobController,
    deleteJobController,
    getAllJobsController,
    jobStatsController,
    updateJobcontroller,
} from "../controllers/jobs.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Job management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       required:
 *         - company
 *         - position
 *         - workLocation
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the job
 *         company:
 *           type: string
 *           description: Company name
 *         position:
 *           type: string
 *           description: Job position
 *         status:
 *           type: string
 *           enum: [pending, reject, interview]
 *           default: pending
 *         workType:
 *           type: string
 *           enum: [full-time, part-time, internship, contract]
 *           default: full-time
 *         workLocation:
 *           type: string
 *           description: Job location
 *         createdBy:
 *           type: string
 *           description: User ID of the job creator
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *         _id: 60b8d295f1df5c001f6fdf6a
 *         company: Google
 *         position: Software Engineer
 *         status: pending
 *         workType: full-time
 *         workLocation: Bangalore
 *         createdBy: 60b8d295f1df5c001f6fdf69
 *         createdAt: 2023-07-01T10:00:00Z
 *         updatedAt: 2023-07-01T10:00:00Z
 */

/**
 * @swagger
 * /api/v1/job/create-job:
 *   post:
 *     summary: Create a new job post
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       201:
 *         description: Job created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/create-job", userAuth, createJobController);

/**
 * @swagger
 * /api/v1/job/get-job:
 *   get:
 *     summary: Get all jobs created by logged-in user
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Jobs fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Job'
 *       401:
 *         description: Unauthorized
 */
router.get("/get-job", userAuth, getAllJobsController);

/**
 * @swagger
 * /api/v1/job/update-job/{id}:
 *   patch:
 *     summary: Update an existing job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the job to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       200:
 *         description: Job updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Job not found
 *       401:
 *         description: Unauthorized
 */
router.patch("/update-job/:id", userAuth, updateJobcontroller);

/**
 * @swagger
 * /api/v1/job/delete-job/{id}:
 *   delete:
 *     summary: Delete a job
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the job to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *       404:
 *         description: Job not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/delete-job/:id", userAuth, deleteJobController);

/**
 * @swagger
 * /api/v1/job/job-stats:
 *   get:
 *     summary: Get job statistics (counts per status, etc.)
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Job statistics fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/job-stats", userAuth, jobStatsController);

export default router;
