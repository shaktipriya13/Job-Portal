import express from "express";
import { registerUser } from "../controllers/auth.controller.js";

// router object
const router = express.Router();


//routes defined
router.post('/register-user', registerUser);
router.post('/login', registerUser);
router.post('/', registerUser);

export default router;//we are exporting so that we can use it in any file

