import bcryptjs from "bcryptjs"
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"

dotenv.config();
const saltRounds = 10;
export async function signUp(req , res , next) {
    console.log(req.body)
    const {username , password , email} = req.body;
    if(!username || !password || !email || username === '' || password === '' || email === '') next(errorHandler(400, 'All fields are required'));
    const hashPassword = bcryptjs.hashSync(password , saltRounds)
    const newUser = new User({
        username : username,
        email : email,
        password : hashPassword
    })
    try {
        await newUser.save()
        res.json('Signup successful')
    } catch (error) {
        next(error);
    }
}
export async function signIn(req , res , next) {
    const {email , password} = req.body;
    try {
       const validUser = await User.findOne({email}); 
       if(!validUser){
            return next(errorHandler(404 , 'Email not exist'))
       }
       const check = bcryptjs.compareSync(password , validUser.password);
       if(!check){
            return next(errorHandler(404 , 'Password is not correct!'))
       }
       const accessToken = jwt.sign({id: validUser._id , isAdmin : validUser.isAdmin} , process.env.ACCESS_TOKEN_SECRET);
       const {password: pass , ... rest} = validUser._doc;
       res.status(200).cookie('access_token' , accessToken , {httpOnly: true,}).json(rest);
    } catch (error) {
        next(error)
    }
}

export async function Google(req , res , next) {
    const {email , photoURL} = req.body;
    try {
        const result = await User.findOne({email});
            if(result){
                const accessToken = jwt.sign({id : result._id , isAdmin : result.isAdmin} , process.env.ACCESS_TOKEN_SECRET);
                const {password : pass , ...rest} = result._doc
                res.status(200).cookie('access_token' , accessToken , {httpOnly: true}).json(rest)
            }else{
                const createUserName = email.slice(0 , email.indexOf('@')) + Math.random().toString(36).slice(2 , 8);
                const createPassword = Math.random().toString(36).slice(0,10) + Math.random().toString(36).slice(0,10); 
                const hashPassword = bcryptjs.hashSync(createPassword , saltRounds)
                const newUser = new User({
                    username : createUserName,
                    email : email,
                    password : hashPassword,
                    photoURL : photoURL
                }) 
                await newUser.save()
                const accessToken = jwt.sign({id : newUser._id } , process.env.ACCESS_TOKEN_SECRET);
                const {password : pass , ...rest} = newUser._doc;
                res.status(200).cookie('access_token' , accessToken , {httpOnly : true}).json(rest)
            }
    } catch (error) {
        next(error)
    }
}