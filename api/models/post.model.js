import { request } from "express";
import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title : {
        type: String,
        request: true,
        unique : true
    },
    userId : {
        type: String,
        request: true
    },
    content : {
        type: String,
        request: true,
    },
    image : {
        type: String,
        default : "https://elementor.com/blog/wp-content/uploads/2017/09/10ways3.png"
    },
    category: {
        type: String,
        default: 'uncategorized',
      },
      slug: {
        type: String,
        required: true,
        unique: true,
      },
} , { timestamps: true });

const Post = mongoose.model('Post' , postSchema);

export default Post;