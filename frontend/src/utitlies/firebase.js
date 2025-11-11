// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCLg_YNtxbLrhoz9SqqZ5ZVwWX5X6KbPDo",
  authDomain: "one-cart-app.firebaseapp.com",
  projectId: "one-cart-app",
  storageBucket: "one-cart-app.firebasestorage.app",
  messagingSenderId: "1033150091097",
  appId: "1:1033150091097:web:12ef650100f09f4593c648"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;