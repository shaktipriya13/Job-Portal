/*The auth.controller.js file contains the "business logic" for authentication — things like:
Registering a user
Logging in a user
Logging out a user (if you're using tokens or cookies) , 
uisng jwt,bcrypt and mongoose */


//import packagaes
import userModels from "../models/user.models.js";


const JWT_SECRET = process.env.JWT_SECRET;

// Register Controller

export const registerController = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        //performing validation
        if (!name) {
            next("name is required");
        }
        if (!email) {
            next("Please provide email.")
        }
        if (!password) {
            next("Please provide password.")
        }

        //now we are validating is email already exists
        const existingUser = await userModels.findOne({ email });//	This is a Mongoose query that looks in the database for one user whose email matches the provided value.
        if (existingUser) {
            next("Email already register. Please login.");
        }
        //once all above conditions are checked we then create a new user
        const user = await userModels.create({ name, email, password });
        res.status(201).send({
            success: true,
            message: "User successfully created.",
            user
        })
        //for creation 201 status code is used
    } catch (err) {
        next(err); //using errMiddlware
    }
}

