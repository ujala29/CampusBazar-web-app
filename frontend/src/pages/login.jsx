import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../utitlies/firebase.js";
import axios from 'axios';
import { AuthContextdata } from '../context/AuthContextdata';

const Login = () => {

  const navigate = useNavigate();
  const { setCurruser } = useContext(AuthContextdata);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // ✅ Google Login
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const name = result.user.displayName;
      const email = result.user.email;

      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/googlelogin",
        { name, email },
        { withCredentials: true }
      );

      setCurruser(res.data);
      alert("Google Login Success!");
      navigate('/');

    } catch (error) {
      console.log("Google Login Error:", error);
    }
  };

  // ✅ Normal login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        { email, password },
        { withCredentials: true }
      );

      setCurruser(res.data);
      alert("Login Success!");
      navigate('/');

    } catch (error) {
      console.log(error);
      alert("Login Failed!");
    }
  };

  return (
    <div className="bg-pink-300 h-screen w-full flex justify-center items-center">

      <form className="w-[450px] bg-white shadow-lg rounded-lg p-8 flex flex-col gap-6"
        onSubmit={handleSubmit}>

        <h1 className="text-2xl font-bold text-center text-gray-700">Login</h1>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-md outline-none focus:border-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-md outline-none focus:border-blue-500"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* LOGIN BTN */}
        <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md font-semibold">
          Login
        </button>

        {/* OR separator */}
        <div className="flex items-center justify-center gap-4">
          <div className="w-full h-px bg-gray-300"></div>
          <span className="text-gray-500 font-medium">OR</span>
          <div className="w-full h-px bg-gray-300"></div>
        </div>

        {/* GOOGLE LOGIN */}
        <button type='button'
          className="flex items-center justify-center gap-3 w-full border border-gray-400 p-3 rounded-md hover:bg-gray-100"
          onClick={handleGoogleSignIn}
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="google-icon"
            className="w-6 h-6"
          />
          <span className="font-medium text-gray-700">Continue with Google</span>
        </button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?
          <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/signup')}>
            &nbsp;Sign Up
          </span>
        </p>

      </form>
    </div>
  );
};

export default Login;
