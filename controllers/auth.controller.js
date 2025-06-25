// /*The auth.controller.js file contains the "business logic" for authentication — things like:
// Registering a user
// Logging in a user
// Logging out a user (if you're using tokens or cookies) , 
// uisng jwt,bcrypt and mongoose */


// //import packagaes
// import userModels from "../models/user.models.js";


// const JWT_SECRET = process.env.JWT_SECRET;

// // Register Controller

// export const registerController = async (req, res, next) => {
//     try {
//         const { name, email, password } = req.body;

//         //performing validation
//         if (!name) {
//             return next(new Error("Name is required"));
//         }
//         if (!email) {
//             return next(new Error("Please provide email"));
//         }
//         if (!password) {
//             return next(new Error("Please provide password"));
//         }

//         //now we are validating is email already exists
//         const existingUser = await userModels.findOne({ email });//	This is a Mongoose query that looks in the database for one user whose email matches the provided value.
//         if (existingUser) {
//             next("Email already register. Please login.");
//         }
//         //once all above conditions are checked we then create a new user
//         const user = await userModels.create({ name, email, password });

//         //jwt token creation
//         const token = user.createJWT();//whenever a user is registerd a token is created using our token fxn defined in the user.models.js

//         res.status(201).send({
//             success: true,
//             message: "User successfully created.",
//             user
//         })
//         //for creation 201 status code is used
//     } catch (err) {
//         next(err); //using errMiddlware
//     }
// }

import userModels from "../models/user.models.js";

export const registerController = async (req, res, next) => {
    try {
        const { name, lastName, email, password, phone, location } = req.body;

        //validate
        if (!name) {
            return next(new Error("Name is required"));
        }
        if (!email) {
            return next(new Error("Please provide email"));
        }
        if (!password) {
            return next(new Error("Please provide password"));
        }
        // Check for existing user
        const existingUser = await userModels.findOne({ email });
        if (existingUser) {
            return next(new Error("Email already registered. Please login."));
        }

        // Create user
        const user = await userModels.create({ name, lastName, email, password, phone, location });
        const token = user.createJWT();

        // Send response
        res.status(201).json({
            success: true,
            message: "User successfully created.",
            user,
            token
        });
    } catch (err) {
        next(err);
    }
};

export const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        //validation
        if (!email || !password) {
            return next(new Error("Please provide all fields"));
        }
        //chk if such email exists in db
        const user = await userModels.findOne({ email });
        if (!user) {
            return next(new Error("Invalid credentials"));
        }
        //compare password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return next(new Error("Invalid credentials"));
        }

        //if there's no prblm , ie. all creedntials are right then we generate a token
        const token = user.createJWT();
        res.status(200).json({
            success: true,
            message: "Login successful",
            user, token
        })
    } catch (err) {
        next(err);
    }
};