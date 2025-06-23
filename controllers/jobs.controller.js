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

export const updateJobcontroller = async (req, res, next) => {
    const { id } = req.params;//user will provide the id before requesting for update
    const { company, position } = req.body;
    try {
        if (!company || !position) {
            return next(new Error("Please provide all fields."));
        }

        // find the job by id even it exists or not
        const job = await jobsModels.findOne({ _id: id });

        // validation
        if (!job) {
            return next(new Error(`Request job don't exists with jobID: ${id}`));
        }
        // validation for only the user who created the job can actually update it
        if (!req.user.userId === job.createdBy.toString()) {
            return next(new Error("You are not authorized to update this job."));
        }

        // now update the job after doing all validations:
        const updateJob = await jobsModels.findOneAndUpdate({ _id: id }, req.body, {
            new: true, //Return the updated document instead of the old one.
            runValidators: true//Ensures that Mongoose validates the update data against the model schema. Prevents invalid data from being saved.
        });

        // send response
        res.status(200).json({ updateJob, message: "job details updated successfully" })

    } catch (err) {
        return next(new Error("Error in updating job. Try again later."));
    }
}


export const deleteJobController = async (req, res, next) => {
    const { id } = req.params;

    // find the particular job in the models
    try {
        const job = await jobsModels.findOne({ _id: id });
        // This line queries a MongoDB collection (using Mongoose) to find one document where the _id field matches the given id.

        //* validation checking
        if (!job) {
            return next(new Error(`No job found with this job id ${id}`));
        }
        // if the user id not matches it means some another person is trying to delete job which is illegal, so authroizing the id
        if (!req.user.userId === job.createdBy.toString()) {
            return next(new Error("You are not authorized to delete this job."))
        }


        //after all validations, delete the job
        await job.deleteOne();
        res.status(200).json({ message: "Job deleted successfully." });
    } catch (error) {
        return next(new Error("Error in deleting job. Try again later."));
    }
};