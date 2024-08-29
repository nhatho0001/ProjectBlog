// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import dotenv from "dotenv"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_BASE_APIKEY,
  authDomain: "blog-5ccea.firebaseapp.com",
  projectId: "blog-5ccea",
  storageBucket: "blog-5ccea.appspot.com",
  messagingSenderId: "118916369593",
  appId: "1:118916369593:web:c6641ad969a9af2f4e9f68"
};

// Initialize Firebase


export const app = initializeApp(firebaseConfig);;