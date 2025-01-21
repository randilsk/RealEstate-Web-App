// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "estate-mern-fefd2.firebaseapp.com",
  projectId: "estate-mern-fefd2",
  storageBucket: "estate-mern-fefd2.appspot.com",
  messagingSenderId: "475623154158",
  appId: "1:475623154158:web:ebd5f932a3920e9a7aeeff"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);