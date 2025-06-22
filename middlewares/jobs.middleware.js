import jobsModels from "../models/jobs.models.js";

export const createJobController = async (req, res, next) => {
    const { company, position } = req.body;
    try {
        //validation code
        if (!company || !position) {
            return next(new Error("Please provide all fields."));
        }

        // now chk for id of user exists or not in db if above condition satisfies
        req.body.createdBy = req.user.userId;
        const job = await jobsModels.create(req.body);
        res.status(201).json({ job });

    } catch (err) {
        return next(new Error("Error in creating new job."));
    }
}

export const getAllJobsController = async (req, res, next) => {
    const jobs = await jobsModels.find({ createdBy: req.user.userId });
    res.status(200).json({
        totalJobs: jobs.length, jobs
    })
}