// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-state-5c1d0.firebaseapp.com",
  projectId: "mern-state-5c1d0",
  storageBucket: "mern-state-5c1d0.appspot.com",
  messagingSenderId: "767899207377",
  appId: "1:767899207377:web:78f336ab4ec681c5e667f0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);