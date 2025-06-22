import express from "express";
import userAuth from "../middlewares/auth.middleware.js";
import createJobController from './../middlewares/jobs.middleware.js';

const router = express.Router();


//routes
//1. create job-post
router.post('/create-job', userAuth, createJobController);//its a protected route so we added a middleware

export default router;