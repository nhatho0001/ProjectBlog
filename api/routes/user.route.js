import express from "express";
import { getAPI , uploadUser} from "../controllers/user.controller.js";
import { verifyUser } from "../utils/verifyUser.js";


const router = express.Router();

router.get('/test' ,getAPI);
router.put('/upload/:id' ,verifyUser, uploadUser);

export default router;
