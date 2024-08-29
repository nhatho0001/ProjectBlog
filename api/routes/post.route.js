import express from "express"
import { verifyUser } from "../utils/verifyUser.js"
import { createPost } from "../controllers/post.controller.js"


const rounter = express.Router()

rounter.post('/create' , verifyUser , createPost)

export default rounter