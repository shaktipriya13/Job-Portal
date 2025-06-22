//! package imports
import express from 'express'; //import syntax is of module js
//default is require syntax(common js)
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import morgan from 'morgan' //both cors and morgan are middlewares

//! file imports
import connectDB from './config/db.js';

//* import routes
import testRoutes from './routes/test.routes.js'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'

//& import middlewares
import errMiddleware from './middlewares/errorHandler.middleware.js';//	Handles errors sent from controllers

//below line means we are calling .env file in our application and our appln configure ho chuka ha
dotenv.config();


//first envronmnt variables must be compiled and then connection to  database must be established
//* connect to db
connectDB()

//rest object
const app = express();

//middlewares
app.use(express.json());//we could also use body parser 
app.use(cors());//to enable cors package we just need to call it
app.use(morgan('dev'))

//route
app.use('/api/v1/test', testRoutes); //'/api/v1/test' is the naming convention we need to follow, uske bad we can add subroutes in the routes folder files
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);



//validation Middleware
app.use(errMiddleware);

const port = process.env.PORT || 8080;
//listen
app.listen(port, () => {
    console.log(`node server is running in ${process.env.DEV_MODE} mode on port ${port}`.bgBlue.black);
})