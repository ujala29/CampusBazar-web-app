import React, { useState, useEffect } from "react";
import axios from "axios";
import { AuthContextdata } from "./AuthContextdata";

export const AuthContextProvider = ({ children }) => {

  const serverUrl = "http://localhost:3000";

  const [curruser, setCurruser] = useState(null);

  // ✅ Fetch current user
  const getcurrentuser = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/v1/user/currentuser`, {
        withCredentials: true,
      });

      setCurruser(res.data);
      console.log("Current User:", res.data);

    } catch (error) {
      console.log("Error fetching current user:", error.response?.data || error);
      setCurruser(null);
    }
  };

  // ✅ Automatically check user on page reload
  useEffect(() => {
    getcurrentuser();
  }, []);

  const value = {
    serverUrl,
    curruser,
    getcurrentuser,
    setCurruser,
  };

  return (
    <AuthContextdata.Provider value={value}>
      {children}
    </AuthContextdata.Provider>
  );
};
