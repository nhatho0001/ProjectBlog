import React from "react";
import { Navigate } from "react-router-dom";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

function About(){
    const navigate = useNavigate()
    return <div className="min-h-screen flex justify-center mx-auto">
        <div className="pt-44 max-w-4xl flex gap-6 flex-col items-center">
           <h1 className="font-mono text-3xl font-semibold max-w-[400px] text-center">FULL-STACK BLOG APP WITH <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">MERN</span> </h1> 
           <p className="text-center">The MERN Blog App is a full-stack blogging application built using the MERN stack (MongoDB, Express.js, React, Node.js). This application allows users to create, read, update, and delete blog posts. 
            It also includes user authentication and authorization, allowing users to register and log in to manage their own posts..</p>
           <Button gradientDuoTone="purpleToBlue" onClick={()=>{navigate('/')}}>Get Started</Button>
        </div>
        
    </div>
}

export default About;