import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContextdata } from "../context/AuthContextdata";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const { setCurruser } = useContext(AuthContextdata);

  const [otp, setOtp] = useState("");
  const userId = localStorage.getItem("pendingUserId");

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
        console.log("Verifying OTP for User ID:", userId, "with OTP:", otp);
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/verify-otp",
        { userId, otp },
        { withCredentials: true }
      );


      alert("Signup completed successfully!");
      localStorage.removeItem("pendingUserId");

      setCurruser(res.data);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Invalid OTP");
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form className="p-6 shadow-lg rounded bg-white" onSubmit={handleVerify}>
        <h2 className="text-xl font-bold mb-4">Verify OTP</h2>

        <input
          type="text"
          placeholder="Enter OTP"
          className="border p-3 rounded-md outline-none focus:border-blue-500 w-full"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button className="mt-4 bg-green-600 text-white p-3 w-full rounded-md">
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
