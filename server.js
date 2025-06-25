// //! package imports
// import express from 'express'; //import syntax is of module js
// //default is require syntax(common js)
// import dotenv from 'dotenv'
// import colors from 'colors'
// import cors from 'cors'
// import morgan from 'morgan' //both cors and morgan are middlewares

// //^ security packages
// import helmet from 'helmet';
// import xss from "xss";
// import mongoSanitize from 'express-mongo-sanitize';

// //! file imports
// import connectDB from './config/db.js';

// //* import routes
// import testRoutes from './routes/test.routes.js'
// import userRoutes from './routes/user.routes.js'
// import authRoutes from './routes/auth.routes.js'
// import jobRoutes from './routes/jobs.routes.js'

// //& import middlewares
// import errMiddleware from './middlewares/errorHandler.middleware.js';//	Handles errors sent from controllers

// //below line means we are calling .env file in our application and our appln configure ho chuka ha
// dotenv.config();


// //first envronmnt variables must be compiled and then connection to  database must be established
// //* connect to db
// connectDB()

// //rest object
// const app = express();

// //middlewares

// // app.use(express.json());//we could also use body parser 

// // // ✅ Custom middleware to sanitize body & query using `xss`
// // app.use((req, res, next) => {
// //     if (req.body && typeof req.body === 'object') {
// //         for (const key in req.body) {
// //             if (typeof req.body[key] === 'string') {
// //                 req.body[key] = xss(req.body[key]);
// //             }
// //         }
// //     }

// //     if (req.query && typeof req.query === 'object') {
// //         for (const key in req.query) {
// //             if (typeof req.query[key] === 'string') {
// //                 req.query[key] = xss(req.query[key]);
// //             }
// //         }
// //     }

// //     next();
// // });
// // // other middlewares
// // app.use(helmet());
// // app.use(
// //     mongoSanitize({
// //         replaceWith: '_',     // Optional: replaces keys containing prohibited characters
// //         onSanitize: ({ req, key }) => {
// //             console.warn(`Sanitized ${key} from request`);
// //         },
// //         allowDots: true       // Optional: allows dot notation in keys if you want
// //     })
// // );
// // app.use(cors());//to enable cors package we just need to call it
// // app.use(morgan('dev'))

// // //route
// // app.use('/api/v1/test', testRoutes); //'/api/v1/test' is the naming convention we need to follow, uske bad we can add subroutes in the routes folder files
// // app.use('/api/v1/auth', authRoutes);
// // app.use('/api/v1/user', userRoutes);
// // app.use('/api/v1/jobs', jobRoutes);

// app.use(express.json()); // Body parser first

// // Sanitize input to prevent NoSQL injection
// app.use(mongoSanitize({
//     replaceWith: '_'
// }));

// // Sanitize XSS (your custom middleware)
// app.use((req, res, next) => {
//     if (req.body && typeof req.body === 'object') {
//         for (const key in req.body) {
//             if (typeof req.body[key] === 'string') {
//                 req.body[key] = xss(req.body[key]);
//             }
//         }
//     }

//     if (req.query && typeof req.query === 'object') {
//         for (const key in req.query) {
//             if (typeof req.query[key] === 'string') {
//                 req.query[key] = xss(req.query[key]);
//             }
//         }
//     }

//     next();
// });

// app.use(helmet());
// app.use(cors());
// app.use(morgan('dev'));


// //validation Middleware
// app.use(errMiddleware);

// const port = process.env.PORT || 8080;
// //listen
// app.listen(port, () => {
//     console.log(`node server is running in ${process.env.DEV_MODE} mode on port ${port}`.bgBlue.black);
// })

// import express from 'express';
// import dotenv from 'dotenv';
// import colors from 'colors';
// import cors from 'cors';
// import morgan from 'morgan';
// import helmet from 'helmet';
// import xss from 'xss';
// import mongoSanitize from 'express-mongo-sanitize';

// import connectDB from './config/db.js';
// import testRoutes from './routes/test.routes.js';
// import userRoutes from './routes/user.routes.js';
// import authRoutes from './routes/auth.routes.js';
// import jobRoutes from './routes/jobs.routes.js';
// import errMiddleware from './middlewares/errorHandler.middleware.js';

// dotenv.config();

// connectDB();

// const app = express();

// // Middleware order
// app.use(express.json()); // Parse JSON bodies first

// // Configure express-mongo-sanitize to avoid modifying req.query directly
// app.use(mongoSanitize({
//     replaceWith: '_',
//     onSanitize: ({ req, key }) => {
//         console.warn(`Sanitized ${key} from request`);
//     }
// }));

// // Custom XSS sanitization with a new sanitizedQuery property
// app.use((req, res, next) => {
//     // Sanitize body
//     if (req.body && typeof req.body === 'object') {
//         req.body = JSON.parse(JSON.stringify(req.body));
//         for (const key in req.body) {
//             if (typeof req.body[key] === 'string') {
//                 req.body[key] = xss(req.body[key]);
//             }
//         }
//     }

//     // Sanitize query (create a new sanitizedQuery object)
//     if (req.query && typeof req.query === 'object') {
//         const sanitizedQuery = {};
//         for (const key in req.query) {
//             if (typeof req.query[key] === 'string') {
//                 sanitizedQuery[key] = xss(mongoSanitize.sanitize(req.query[key])); // Apply mongoSanitize first
//             } else {
//                 sanitizedQuery[key] = req.query[key];
//             }
//         }
//         req.sanitizedQuery = sanitizedQuery; // Store sanitized query in a new property
//     }

//     next();
// });

// app.use(helmet());
// app.use(cors());
// app.use(morgan('dev'));

// // Routes
// app.use('/api/v1/test', testRoutes);
// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/user', userRoutes);
// app.use('/api/v1/jobs', jobRoutes);

// // Error handling middleware
// app.use(errMiddleware);

// const port = process.env.PORT || 8080;
// app.listen(port, () => {
//     console.log(`node server is running in ${process.env.DEV_MODE} mode on port ${port}`.bgBlue.black);
// });


//api documentation exports
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc';

import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import xss from 'xss';

import connectDB from './config/db.js';
import testRoutes from './routes/test.routes.js';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import jobRoutes from './routes/jobs.routes.js';
import errMiddleware from './middlewares/errorHandler.middleware.js';

dotenv.config();

connectDB();

//swagger api config
//swagger api options
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Job Portal Application",
            description: "Node Expressjs Job Portal Application"
        },
        //when u deploy backend write server url here, we put here arrays, as we can have here multiple hosting providers allows
        server: [
            {
                url: "http://localhost:8080"
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const spec = swaggerJSDoc(options);

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    if (req.body && typeof req.body === 'object') {
        req.body = JSON.parse(JSON.stringify(req.body));
        for (const key in req.body) {
            if (typeof req.body[key] === 'string') {
                req.body[key] = xss(req.body[key]);
            }
        }
    }

    if (req.query && typeof req.query === 'object') {
        const sanitizedQuery = {};
        for (const key in req.query) {
            if (typeof req.query[key] === 'string') {
                sanitizedQuery[key] = xss(req.query[key]);
            } else {
                sanitizedQuery[key] = req.query[key];
            }
        }
        req.sanitizedQuery = sanitizedQuery;
    }

    next();
});

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/jobs', jobRoutes);

// homeroute Route
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));

app.use(errMiddleware);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`node server is running in ${process.env.DEV_MODE} mode on port ${port}`.bgBlue.black);
});