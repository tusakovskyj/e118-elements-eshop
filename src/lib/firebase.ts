// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKgpkjhJ3eIin7o1W_szhe2AsfvCuJJkU",
  authDomain: "e118-18f7a.firebaseapp.com",
  projectId: "e118-18f7a",
  storageBucket: "e118-18f7a.firebasestorage.app",
  messagingSenderId: "748571370978",
  appId: "1:748571370978:web:f3f7aaa803baf276ff45bb"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
