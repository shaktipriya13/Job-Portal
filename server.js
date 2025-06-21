import express from 'express'; //import syntax is of module js
//default is require syntax(common js)
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js';


//below line means we are calling .env file in our application and our appln configure ho chuka ha
dotenv.config();


//first envronmnt variables must be compiled and then connection to  database must be established
//* connect to db
connectDB()

//rest object
const app = express();

//route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to OUR JOB PORTAL !</h1>')
})

const port = process.env.PORT || 8080;
//listen
app.listen(port, () => {
    console.log(`node server is running in ${process.env.DEV_MODE} mode on port ${port}`.bgBlue.black);
})