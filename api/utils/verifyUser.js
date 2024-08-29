import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
dotenv.config()
export async function verifyUser(req , res , next) {
    const token = req.cookies.access_token;
    if(!token) return next(errorHandler(403 , 'Unauthorized'));
    jwt.verify(token , process.env.ACCESS_TOKEN_SECRET , (err , user)=>{
        if(err){
            return next(errorHandler(401, 'Unauthorized'));
        }
        req.user = user;
        next()
    });
}
