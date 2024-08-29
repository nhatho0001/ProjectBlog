import express from "express"
import { signUp ,signIn , Google } from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/signup' , signUp);

router.post('/sigin' , signIn);

router.post('/google' , Google);

export default router;