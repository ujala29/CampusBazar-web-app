import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../utitlies/firebase.js";
import { AuthContextdata } from '../context/AuthContextdata';

const Signup = () => {
  const navigate = useNavigate();
  const { setCurruser } = useContext(AuthContextdata);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handlesubmit = async (e) => {
  e.preventDefault();

  try {
      if (!email.toLowerCase().endsWith("@nitj.ac.in")) {
    alert("Only NITJ students can register. Use your @nitj.ac.in email.");
    return;
  }
    const res = await axios.post(
      "http://localhost:3000/api/v1/auth/signup",
      { name, email, password },
      { withCredentials: true }
    );
    console.log(res.data);

    alert("OTP sent to your NITJ email.");
    console.log("Pending User ID:", res.data.userId);
    localStorage.setItem("pendingUserId", res.data.userId);

    navigate("/verify-otp");  // redirect to OTP page

  } catch (error) {
    alert(error.response?.data?.message || "Signup failed");
    console.log(error);
  }
};

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

      console.log(res.data);
      setCurruser(res.data);
      alert("Google Signup Success!");
      navigate('/');

    } catch (error) {
      console.log("Google Login Error:", error);
    }
  };

  return (
    <div className="bg-pink-300 h-screen w-full flex justify-center items-center">

      <form className="w-[450px] bg-white shadow-lg rounded-lg p-8 flex flex-col gap-6"
        onSubmit={handlesubmit}>

        <h1 className="text-2xl font-bold text-center text-gray-700">Create Account</h1>

        <input
          type="text"
          placeholder="Full Name"
          className="border p-3 rounded-md outline-none focus:border-blue-500"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-md outline-none focus:border-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-md outline-none focus:border-blue-500"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md font-semibold">
          Sign Up
        </button>

        <div className="flex items-center justify-center gap-4">
          <div className="w-full h-px bg-gray-300"></div>
          <span className="text-gray-500 font-medium">OR</span>
          <div className="w-full h-px bg-gray-300"></div>
        </div>

        <button type="button"
          className="flex items-center justify-center gap-3 w-full border border-gray-400 p-3 rounded-md hover:bg-gray-100"
          onClick={handleGoogleSignIn}
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="google-icon"
            className="w-6 h-6"
          />
          <span className="font-medium text-gray-700">Sign up with Google</span>
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </p>
      </form>

    </div>
  );
};

export default Signup;
