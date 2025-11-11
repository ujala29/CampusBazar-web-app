import React, { useEffect, useState,  } from "react";
import axios from "axios";
import { AuthContextdata } from "../context/AuthContextdata";

const Profile = () => {
  //const { curruser } = useContext(AuthContextdata);
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // Fetch current user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/user/currentuser",
          { withCredentials: true }
        );
        setUser(res.data);       // backend returns user directly
        setFormData(res.data);
      } catch (err) {
        console.log("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save updated profile
  const handleSave = async () => {
    try {
      const res = await axios.put(
        "http://localhost:3000/api/v1/user/updateprofile",
        formData,
        { withCredentials: true }
      );
      setUser(res.data.user || res.data); // backend might return user object
      setEditing(false);
      console.log("Profile updated successfully", res.data);
    } catch (err) {
      console.log("Error updating profile:", err);
    }
  };

  const profileFields = ["name", "email", "phoneNumber", "rollNumber", "address", "upiId"];

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <div className="grid gap-4">
        {profileFields.map((field) => (
          <div key={field} className="flex flex-col">
            <label className="font-semibold">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            {editing ? (
              <input
                type="text"
                name={field}
                value={formData[field] || ""}
                onChange={handleChange}
                className="border px-2 py-1 rounded"
              />
            ) : (
              <span>{user?.[field] || "Not set"}</span>
            )}
          </div>
        ))}

        {editing ? (
          <div className="flex gap-2">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={() => setEditing(true)}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
