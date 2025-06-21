import mongoose from "mongoose";
import validator, { isMobilePhone } from 'validator';

const userSchema = new mongoose.Schema({
    name: {
        type: string,
        require: [true, 'Name field cannot be empty']
    },
    lastName: {
        type: string
    },
    email: {
        type: string,
        require: [true, 'email field cannot be empty'],
        unique: [true, 'this email already exists.'],
        // match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
        validate: {
            validator: validator.isEmail,
            message: "Please enter a valid email address."
        }
        //the validate option comes from mongoose package

        // we can also validate email using regex or any other third party package like validator. It chksś if the email is in valid format like name@example.com.,we could also use regurlar expression using match;
    },
    Phone: {
        type: number,
        validator: isMobilePhone()
    },
    password: {
        type: string,
        require: [true, 'Password is required.'],
    },
    location: {
        type: string,
        default: "India"
    }
}, { timestamps: true })
//timestamps ke through time is noted each time a new user is created
//sorting, filtering can be done on basis of timestamps

export default mongoose.model('User', userSchema);//this will create a User named table(or collection) inside our db job-portal
// Mongoose automatically pluralizes and lowercases the model name('User'):

//we can also create relationships in models