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
      // Optionally, you can clear the updateData after successful update
      setUpdateData({
        password: "",
      });
      console.log("Update successful!");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div>
      <h1> Change your pass word from here</h1>
      <div>
        {/* <p>Name: {userData.name}</p>
        <p>Email: {userData.email}</p> */}
        {/* <p>Password: ********</p> */}
      </div>
      <div>
        {/* <input
          type="text"
          placeholder="New Name"
          value={updateData.name}
          onChange={(e) =>
            setUpdateData({ ...updateData, name: e.target.value })
          }
        /> */}
        {/* <input
          type="text"
          placeholder="New Email"
          value={updateData.email}
          onChange={(e) =>
            setUpdateData({ ...updateData, email: e.target.value })
          }
        /> */}
        <input
          type="password"
          placeholder="enter New Password"
          value={updateData.password}
          onChange={(e) =>
            setUpdateData({ ...updateData, password: e.target.value })
          }
        />
      </div>
      <button onClick={handleUpdate}> change pass word</button>
    </div>
  );
};

export default ProfilePage;
