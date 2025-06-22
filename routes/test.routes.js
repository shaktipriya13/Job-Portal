import express from "express";
import { testPostController } from "../controllers/test.controller.js";
import userAuth from "../middlewares/auth.middleware.js";

//creating router object from express
const router = express.Router();

//for performing crud operations through routes , get,post,put, delete mthds are used
// when we write routes, first url is written and at last controller that needs to be excuted in that route is written and b/w the 2 we can write any no. of middlewares

// login/register time jo token we got whi  use krna ha userAuth time
router.post("/test-post", userAuth, testPostController);

//export router object to be used in other files
export default router;