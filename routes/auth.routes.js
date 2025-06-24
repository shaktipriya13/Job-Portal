import express from "express";
import { loginController, registerController } from "../controllers/auth.controller.js";
import rateLimit from "express-rate-limit";



// ip limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes : means keval 15 minutes tak hi koi access kr skta ha koi both login and register
    limit: 30, // Limit each IP to 30 requests per `window` (here, per 15 minutes).
    standardHeaders: true, // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    // store: ... , // Redis, Memcached, etc. See below.
})

// router object
const router = express.Router();


//routes defined
// we hav put limiter as a middleware in both register and login
router.post('/register', limiter, registerController);
router.post('/login', limiter, loginController);
// router.post('/', registerUser);

export default router;//we are exporting so that we can use it in any file

