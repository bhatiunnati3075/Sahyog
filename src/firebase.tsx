// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBHSROJpAyIzWKpPIW3CqUADB05Xy6zJg",
  authDomain: "sahyog-4288c.firebaseapp.com",
  projectId: "sahyog-4288c",
  storageBucket: "sahyog-4288c.firebasestorage.app",
  messagingSenderId: "557678540085",
  appId: "1:557678540085:web:16d920a0bdb2e552a3887c",
  measurementId: "G-4L4P1001WS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);