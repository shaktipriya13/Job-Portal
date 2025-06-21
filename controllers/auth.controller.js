/*The auth.controller.js file contains the "business logic" for authentication — things like:
Registering a user
Logging in a user
Logging out a user (if you're using tokens or cookies) , 
uisng jwt,bcrypt and mongoose */


//import packagaes
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import userModels from "../models/user.models.js";


const JWT_SECRET = process.env.JWT_SECRET;

// Register Controller

export const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //performing validation
        if (!name) {
            return res.status(400).send({ success: false, message: "Please provide name" });
        }
        if (!email) {
            return res.status(400).send({ success: false, message: "Please provide email." })
        }
        if (!password) {
            return res.status(400).send({ success: false, message: "Please provide password." })
        }

        //now we are validating is email already exists
        const existingUser = await userModels.findOne({ email });//	This is a Mongoose query that looks in the database for one user whose email matches the provided value.
        if (existingUser) {
            return res.status(200).send({ success: false, message: "Email already register. Please login." })
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
        console.log(err);
        res.status(400).send({
            message: 'Error in Register Controller',
            success: false,
            err
        })
    }
}

