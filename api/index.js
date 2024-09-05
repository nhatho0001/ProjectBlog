import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import bodyParser from "body-parser";
import { error } from "console";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import postRouter from "./routes/post.route.js"
import commentRouter from "./routes/comment.route.js";
import cookieParser from 'cookie-parser';

dotenv.config()

const port = 3000;
const app = express();
mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Successful connect Mongoodb!')
}).catch(error => console.log(error))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/user' , userRouter)
app.use('/api/auth' , authRouter)
app.use('/api/post', postRouter)
app.use('/api/comment' , commentRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });
app.listen(port , ()=>{
    console.log(`Welcome to port ${port}`)
})