// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
 
const firebaseConfig = {
  apiKey: "AIzaSyBATHRIGnLnG8VDUE3OlbHkHpM1IlCRvnw",
  authDomain: "usingstorage-e71b9.firebaseapp.com",
  projectId: "usingstorage-e71b9",
  storageBucket: "usingstorage-e71b9.appspot.com",
  messagingSenderId: "285789449861",
  appId: "1:285789449861:web:4c54678b8e66c9d94143ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)