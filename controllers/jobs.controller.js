import jobsModels from "../models/jobs.models.js";
import mongoose from "mongoose";
import moment from "moment";

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


// below controller fxn ke thorugh each user can filter out the status of his application acc. to his need
export const getAllJobsController = async (req, res, next) => {
    const { status, workType, search, sort } = req.query;
    // conditions for searching filters
    const queryObject = {
        createdBy: req.user.userId
    }

    //logic for applying filters
    if (status && status !== 'all') {
        queryObject.status = status
    }
    if (workType && workType !== 'all') {
        queryObject.workType = workType
    }


    //! now we are making filter for job search option by name, so that if the user types any letter even related to the job he gets the job exactly like for 'fullstack developer' if he types 'full', so we use regex here

    if (search) {
        queryObject.position = { $regex: search, $options: 'i' }//making the type insensitive so that the user can write in both uppercase/lowercase and the case is treated as same
    }

    let queryResult = jobsModels.find(queryObject);

    //performing sorting
    if (sort === 'latest') {
        queryResult = queryResult.sort("-createdAt");//minus mtlb reverse order me
    }
    if (sort === 'oldest') {
        queryResult = queryResult.sort("createdAt");
    }
    if (sort === 'a-z') {
        queryResult = queryResult.sort('position');
    }
    if (sort === 'z-a') {
        queryResult = queryResult.sort('-position');
    }



    // performing pagination
    // & pagination :jyada jobs must not be shown on 1 page as application par load badhta ha
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // const totalJobs = await jobsModels.countDocuments(queryResult);//sir code
    const totalJobs = await jobsModels.countDocuments(queryObject);
    //jobs count
    const numOfPage = Math.ceil(totalJobs / limit);


    queryResult = queryResult.skip(skip).limit(limit);

    const jobs = await queryResult;

    // jobs on current page
    const currentPageJobsCount = jobs.length;

    // const jobs = await jobsModel.find({ createdBy: req.user.userId });
    res.status(200).json({
        totalJobs,
        jobs,
        currentPageJobsCount,
        numOfPage,
    });
};


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


// following function will show to a particular user ki what is the status of each application he had applied for (rejected,interview,pending)
// export const jobStatsController = async (req, res) => {
//     // here we don't need any next parameter, as no middleware is needed
//     //here we are going to execute our query(we need aggregation pipeline and jobs model)
//     // jis user id se job create hua usi ko test krte time first login and usi id ka bearer token is to be sent,as it is protected route

//     const stats = await jobsModels.aggregate([
//         //search by user jobs
//         {
//             $match: {
//                 createdBy: new mongoose.Types.ObjectId(req.user.userId)
//             },
//         },
//         {
//             $group: {
//                 _id: "$status",
//                 count: { $sum: 1 },
//             },
//         },
//     ]);
//     // set default stats
//     const defaultStats = {
//         pending: stats.pending || 0,
//         reject: stats.reject || 0,
//         interview: stats.interview || 0,
//     };

//     // setting filter for also monthly year stats
//     let monthlyApplication = await jobsModels.aggregate([
//         {
//             $match: {
//                 createdBy: new mongoose.Types.ObjectId(req.user.userId)
//             },
//         },
//         {
//             $group: {
//                 _id: {
//                     year: { $year: "$createdAt" },
//                     month: { $month: "$createdAt" },
//                 },
//                 count: {
//                     $sum: 1,
//                 },
//             },
//         },
//     ]);

//     monthlyApplication = monthlyApplication
//         .map((item) => {
//             const {
//                 _id: { year, month }, count,

//             } = item;
//             const date = moment().month(month - 1).year(year).format("MMM Y");
//             return { date, count };
//         })
//         .reverse();

//     res.status(200).json({ totalJobs: stats.length, defaultStats, monthlyApplication });

// };
export const jobStatsController = async (req, res) => {
    try {
        // Aggregate job counts by status for the logged-in user
        const statsResult = await jobsModels.aggregate([
            {
                $match: {
                    createdBy: new mongoose.Types.ObjectId(req.user.userId),
                },
            },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                },
            },
        ]);

        // Convert array to object: { pending: X, reject: Y, interview: Z }
        const defaultStats = {
            pending: 0,
            reject: 0,
            interview: 0,
        };

        statsResult.forEach((item) => {
            defaultStats[item._id] = item.count;
        });

        // Get monthly application stats for current user
        let monthlyApplication = await jobsModels.aggregate([
            {
                $match: {
                    createdBy: new mongoose.Types.ObjectId(req.user.userId),
                },
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                    },
                    count: { $sum: 1 },
                },
            },
            {
                $sort: {
                    "_id.year": -1,
                    "_id.month": -1,
                },
            },
            {
                $limit: 6, // latest 6 months
            },
        ]);

        // Format date and reverse to show oldest first
        monthlyApplication = monthlyApplication
            .map((item) => {
                const {
                    _id: { year, month },
                    count,
                } = item;
                const date = moment().month(month - 1).year(year).format("MMM Y");
                return { date, count };
            })
            .reverse();

        res.status(200).json({
            totalJobs: statsResult.reduce((sum, item) => sum + item.count, 0),
            defaultStats,
            monthlyApplication,
        });
    } catch (error) {
        console.error("Error in jobStatsController:", error);
        res.status(500).json({ msg: "Something went wrong while getting stats." });
    }
};
