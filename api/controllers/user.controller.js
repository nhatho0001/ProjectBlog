import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs"
import User from "../models/user.model.js";
const saltRounds = 10;
export async function getAPI(req , res) {
    res.json({messager : 'API is working'});
}

export async function uploadUser(req , res , next) {
    if(req.user.id !== req.params.id){
        return next(errorHandler(400 , "You can't update data"))
    }
    const privious = await User.findById(req.user.id)
    if(req.body.password){
        if(req.body.password.length < 6) return next(errorHandler(400 , "Password must be at least 6 characters"));
        req.body.password = bcryptjs.hashSync(req.body.password , saltRounds)
    }else{
        req.body.password = privious.password;
    }
    if (req.body.username) {
        if (req.body.username.length < 7 || req.body.username.length > 20) {
          return next(
            errorHandler(400, 'Username must be between 7 and 20 characters')
          );
        }
        if (req.body.username.includes(' ')) {
          return next(errorHandler(400, 'Username cannot contain spaces'));
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
          return next(errorHandler(400, 'Username must be lowercase'));
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
          return next(
            errorHandler(400, 'Username can only contain letters and numbers')
          );
        }
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: {
              username: req.body.username || privious.username,
              email: req.body.email || privious.email,
              photoURL: req.body.photoURL || privious.photoURL,
              password: req.body.password,
            },
          },
          { new: true }
        );
        const {password:pass , ...rest} = updatedUser._doc;
        res.status(200).json(rest)
    }catch(error){
        next(error)
    }
}