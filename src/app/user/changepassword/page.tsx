// Import necessary libraries and components
"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    id: 0,

    password: "",
  });

  const [updateData, setUpdateData] = useState({
    password: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch the user's data after they log in
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth/profile"); // Assuming you have an endpoint for fetching the user's profile
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array ensures this effect runs once after component mounts

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3001/auth/${userData.id}`,
        updateData
      );
      setUserData(response.data);
      setMessage("Password change successful!");
      // Optionally, you can clear the updateData after a successful update
      setUpdateData({
        password: "",
      });
    } catch (error) {
      console.error("Update failed:", error);
      setMessage("Password change failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Change Your Password
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <div>
            <input
              type="password"
              placeholder="Enter New Password"
              value={updateData.password}
              onChange={(e) =>
                setUpdateData({ ...updateData, password: e.target.value })
              }
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="button"
              onClick={handleUpdate}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Change Password
            </button>
          </div>
          {message && (
            <p className="text-center text-green-500 mt-2">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
