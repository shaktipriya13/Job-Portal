import express from "express";
import userAuth from "../middlewares/auth.middleware.js";
import { createJobController, deleteJobController, getAllJobsController, jobStatsController, updateJobcontroller } from './../controllers/jobs.controller.js';

const router = express.Router();


//routes
//1. create job-post
router.post('/create-job', userAuth, createJobController);//its a protected route so we added a middleware

// 2. get jobs: through this we can get the jobs created by a particular user through db user_id
router.get('/get-job', userAuth, getAllJobsController);


//3. for update jobs, we can use both put or patch
router.patch('/update-job/:id', userAuth, updateJobcontroller);//here in this route we need to add a dynamic id of the job which will help us to update the job info.

// 4. for deleting the job, note that the job must be delted only by the user who created it,so we provide auth for protection
router.delete('/delete-job/:id', userAuth, deleteJobController);


//5. get job stats and filter
router.get('/job-stats', userAuth, jobStatsController);

export default router;