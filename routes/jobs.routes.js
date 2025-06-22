import express from "express";
import userAuth from "../middlewares/auth.middleware.js";
import { createJobController, getAllJobsController } from './../middlewares/jobs.middleware.js';

const router = express.Router();


//routes
//1. create job-post
router.post('/create-job', userAuth, createJobController);//its a protected route so we added a middleware

// 2. get jobs: through this we can get the jobs created by a particular user through db user_id
router.get('/getJobs', userAuth, getAllJobsController);

export default router;