/* The code is importing necessary dependencies and components for the ProfilePage component. */
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/app/components/navigation/page";
import Link from "next/link";
import { motion } from "framer-motion";

/* The code is defining a functional component called `ProfilePage`. Inside the component, it is using
the `useState` hook to declare and initialize several state variables: */
const ProfilePage = () => {
  const [userData, setUserData] = useState({ id: 0, password: "" });
  const [updateData, setUpdateData] = useState({ password: "" });
  const [message, setMessage] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Calculate scale based on password length, starting with 1 and increasing by 0.01 for each character
  /**
   * The function calculates a scale value based on the length of a password.
   * @returns a calculated scale value based on the length of the password in the `updateData` object.
   */
  const calculateScale = () => {
    const baseScale = 1;
    const scaleIncrease = 0.03;
    return baseScale + updateData.password.length * scaleIncrease;
  };

  /* The `avatarVariants` object is defining two animation variants for the avatar image. */
  const avatarVariants = {
    initial: { scale: 1 },
    active: { scale: calculateScale() }, // Use the calculated scale here
  };

  /* The `useEffect` hook is used to perform side effects in functional components. In this case, it is
used to fetch user data from the server when the component mounts. */
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

  /**
   * The function `handleUpdate` sends a PUT request to update the user's password and displays a
   * success message if the request is successful, or an error message if it fails.
   */
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

  /**
   * The function `handleMenuToggle` takes a boolean parameter `isOpen` and sets the state variable
   * `isMenuOpen` to the value of `isOpen`.
   * @param {boolean} isOpen - A boolean value indicating whether the menu is open or not.
   */
  const handleMenuToggle = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  };

  return (
    /* The `div` element with the `className` attribute is applying conditional styling to the
   component. */
    <div
      className={`bg-gray-100 min-h-screen ${isMenuOpen ? "menu-open" : ""}`}
    >
      <Navbar userRole={"supervisor"} onMenuToggle={handleMenuToggle} />
      {/* The code  is
      rendering the `Navbar` component with two props: `userRole` and
      `onMenuToggle`. The `userRole` prop is set to the string value
      "supervisor", and the `onMenuToggle` prop is set to the `handleMenuToggle`
      function.  */}
      <Navbar userRole={"supervisor"} onMenuToggle={handleMenuToggle} />
      <div
        className={`container mx-auto p-6 ${
          isMenuOpen ? "translate-x-[0px]" : ""
        }`}
      >
        {/* /* This code is rendering an image element (`<motion.img>`) with the source set to */}
        {/* download.png" and the alt text set to "Avatar". The image has the
        class name "mb-8 h-32 w-32 rounded-full", which applies styling for
        margin-bottom, height, width, and rounded corners.  */}
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <motion.img
            src="/download.png" // Replace with your avatar image path
            alt="Avatar"
            className="mb-8 h-32 w-32 rounded-full"
            variants={avatarVariants}
            animate="active" // Always use the "active" animation to respond to input changes
          />
          {/* The code you provided is rendering a form for the user to change
          their password. */}
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
