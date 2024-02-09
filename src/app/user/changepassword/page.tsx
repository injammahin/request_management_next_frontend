"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/app/components/navigation/page";
import Link from "next/link";
import { motion } from "framer-motion";

const ProfilePage = () => {
  const [userData, setUserData] = useState({ id: 0, password: "" });
  const [updateData, setUpdateData] = useState({ password: "" });
  const [message, setMessage] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const avatarVariants = {
    initial: { y: 0 },
    active: { y: -20 },
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth/profile");
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3001/auth/${userData.id}`,
        updateData
      );
      setUserData(response.data);
      setMessage("Password change successful!");
      setUpdateData({ password: "" });
    } catch (error) {
      console.error("Update failed:", error);
      setMessage("Password change failed. Please try again.");
    }
  };

  const handleMenuToggle = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  };

  return (
    <div
      className={`bg-gray-100 min-h-screen ${isMenuOpen ? "menu-open" : ""}`}
    >
      <Navbar userRole={"supervisor"} onMenuToggle={handleMenuToggle} />
      <div
        className={`container mx-auto p-6 ${
          isMenuOpen ? "translate-x-[0px]" : ""
        }`}
      >
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <motion.img
            src="/download.png" // Replace with your avatar image path
            alt="Avatar"
            className="mb-8 h-32 w-32 rounded-full"
            variants={avatarVariants}
            animate={updateData.password ? "active" : "initial"}
          />
          <div className="max-w-md w-full space-y-8">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Change Your Password
            </h2>
            <div className="mt-8 space-y-6">
              <input
                type="password"
                placeholder="Enter New Password"
                value={updateData.password}
                onChange={(e) =>
                  setUpdateData({ ...updateData, password: e.target.value })
                }
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
              <div className="flex justify-between">
                <Link
                  href="/dashboard"
                  className="bg-gray-500 text-white p-2 w-32 rounded hover:bg-gray-700"
                >
                  Back
                </Link>
                <button
                  onClick={handleUpdate}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded"
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
      </div>
    </div>
  );
};

export default ProfilePage;
