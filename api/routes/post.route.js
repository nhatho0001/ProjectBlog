import express from "express"
import { verifyUser } from "../utils/verifyUser.js"
import { createPost , getPost ,deletePost , updatepost } from "../controllers/post.controller.js"



const rounter = express.Router()

rounter.post('/create' , verifyUser , createPost);
rounter.get('/getPost' , getPost);
rounter.delete('/delete/:postId' , verifyUser ,deletePost);
rounter.put('/updatepost/:postId/:userId', verifyUser, updatepost);

export default rounter