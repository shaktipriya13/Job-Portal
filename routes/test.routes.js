import express from "express";
import { testPostController } from "../controllers/test.controllers.js";

//creating router object from express
const router = express.Router();

//for performing crud operations through routes , get,post,put, delete mthds are used
router.post("/test-post", testPostController);

//export router object to be used in other files
export default router;