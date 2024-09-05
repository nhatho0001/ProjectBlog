import express from "express";
import { getAPI , uploadUser , deleteUser ,signout , getUsers , getUser} from "../controllers/user.controller.js";
import { verifyUser } from "../utils/verifyUser.js";


const router = express.Router();

router.get('/test' ,getAPI);
router.put('/upload/:id' ,verifyUser, uploadUser);
router.delete('/delete/:id' , verifyUser , deleteUser);
router.delete('/signout' , signout);
router.get("/getUses", verifyUser , getUsers)
router.get('/:userId', getUser);

export default router;
