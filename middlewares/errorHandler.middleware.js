// //our custom error middleware fxn:
// //isko use krne se aapko har bar error handling nhi krni parti ha

// // error.middleware.js file —  is a centralized error handling middleware in Express.js. 
// const errMiddleware = (err, req, res, next) => {
//     console.log(err);
//     res.status(500).send({
//         success: false,
//         message: "Something went wrong",
//         err,
//     });
// };
// export default errMiddleware;//now this middleware fxn can either be used in each file or simplest is to use in server.js

const errMiddleware = (err, req, res, next) => {
    console.error(err.stack); // Log for debugging
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Something went wrong"
    });
};

export default errMiddleware;