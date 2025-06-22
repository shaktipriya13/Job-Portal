import express from "express";
import { loginController, registerController } from "../controllers/auth.controller.js";

// router object
const router = express.Router();


//routes defined
router.post('/register', registerController);
router.post('/login', loginController);
// router.post('/', registerUser);

export default router;//we are exporting so that we can use it in any file

