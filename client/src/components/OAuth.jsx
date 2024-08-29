import React from 'react'
import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../Firebase';
import {
    signInStart,
    signInSuccess,
    signInFailure,
  } from '../redux/user/userSlice';
import { useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
export default function OAuth() {
    const auth = getAuth(app)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    async function handOAuth(){
        const provider = new GoogleAuthProvider();
        try {
            dispatch(signInStart())
            provider.setCustomParameters({
                prompt: 'select_account'
            });
            const result = await signInWithPopup(auth, provider); 
            const infoUer = result.user;
            const formData = {
                email : infoUer.email,
                photoURL : infoUer.photoURL
            }
            const response = await fetch('/api/auth/google' , 
                {
                  method: 'POST',
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(formData)
              }
              )
            const res = await response.json();
            if(response.ok){
                dispatch(signInSuccess(res))
                navigate('/')
            }
            
        } catch (error) {
            dispatch(signInFailure(error.message))
        }
        
    }
    return (
        <Button outline gradientDuoTone="pinkToOrange" onClick={handOAuth}>
            <AiFillGoogleCircle className='h-6 w-6 mr-2' />
            Continue with Google
        </Button>
    )
}
