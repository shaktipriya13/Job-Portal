// import mongoose from "mongoose";
// import validator from 'validator';
// import bcrypt from "bcryptjs";
// import JWT from 'jsonwebtoken'

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         require: [true, 'Name field cannot be empty']
//     },
//     lastName: {
//         type: String
//     },
//     email: {
//         type: String,
//         require: [true, 'email field cannot be empty'],
//         unique: [true, 'this email already exists.'],
//         // match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
//         validate: {
//             validator: validator.isEmail,
//             message: "Please enter a valid email address."
//         }
//         //the validate option comes from mongoose package

//         // we can also validate email using regex or any other third party package like validator. It chksś if the email is in valid format like name@example.com.,we could also use regurlar expression using match;
//     },
//     phone: {
//         type: String, // Better to store as string to preserve leading 0s and country code
//         validate: {
//             validator: (value) => validator.isMobilePhone(value, 'any'),
//             message: 'Please enter a valid phone number.'
//         }
//     },
//     password: {
//         type: String,
//         require: [true, 'Password is required.'],
//         minlength: [6, "Password should be greater than 6 characters."]
//     },
//     location: {
//         type: String,
//         default: "India"
//     }
// }, { timestamps: true })
// //timestamps ke through time is noted each time a new user is created
// //sorting, filtering can be done on basis of timestamps

// //~ middlewares:
// //& 2.fxn to encrypt password before saving in db
// userSchema.pre('save', async function () {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
// });

// //& 1.fxn to secure data with sign fxn mthd:
// userSchema.methods.createJWT = function () {
//     return JWT.sign({ userId: this._id }, process.env.JWT_SECRET, { expires: '1d' });
// }

// export default mongoose.model('User', userSchema);//this will create a User named table(or collection) inside our db job-portal
// // Mongoose automatically pluralizes and lowercases the model name('User'):

// //we can also create relationships in models


import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name field cannot be empty"]
        },
        lastName: {
            type: String
        },
        email: {
            type: String,
            required: [true, "Email field cannot be empty"],
            unique: [true, "This email already exists."],
            validate: {
                validator: validator.isEmail,
                message: "Please enter a valid email address."
            }
        },
        phone: {
            type: String,
            validate: {
                validator: (value) => validator.isMobilePhone(value, "any"),
                message: "Please enter a valid phone number."
            }
        },
        password: {
            type: String,
            required: [true, "Password is required."],
            minlength: [6, "Password should be greater than 6 characters."]
        },
        location: {
            type: String,
            default: "India"
        }
    },
    { timestamps: true }
);

// Exclude password from JSON output
userSchema.set("toJSON", {
    transform: (doc, ret) => {
        delete ret.password;
        return ret;
    }
});

// Hash password only if modified
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//compare password fxn
userSchema.methods.comparePassword = async function (userPassword) {//userPassword is the variable name for the password that the user enters while logging in
    const isMatch = await bcrypt.compare(userPassword, this.password);//compares  user entered password with the actual password stored in db
    return isMatch;
}

// Create JWT
userSchema.methods.createJWT = function () {
    return JWT.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export default mongoose.model("User", userSchema);