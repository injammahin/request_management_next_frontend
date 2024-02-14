/* The code snippet is importing necessary dependencies and defining a React functional component
called `ProfilePage`. */
// src/app/user/profile/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/app/components/navigation/page";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

/* The `interface UserDetails` is defining the structure or shape of an object that represents user
details. It specifies the properties and their types that should be present in an object of type
`UserDetails`. In this case, the `UserDetails` interface has properties such as `id`, `name`,
`email`, `user_id`, `designation`, `department_id`, and `role`, each with its respective type. This
interface is used to ensure that the `userData` state variable in the `ProfilePage` component has
the correct shape and properties. */
interface UserDetails {
  department: any;
  id: number;
  employee_name: string;
  email: string;
  user_id: string;
  designation: string;
  department_name: string;
  role: string;
}

/* The code is defining a functional component called `ProfilePage` using the React.FC (Function
Component) type. Inside the component, it declares several state variables using the `useState`
hook. */
const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  /* The `useEffect` hook is used to perform side effects in functional components. In this case, the
 `useEffect` hook is used to fetch user data from the server when the component mounts. */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth/profile", {
          headers: {
            id: localStorage.getItem("userId")!,
          },
        });
        setUserData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  /**
   * The function handles the toggling of a menu and the navigation to a specific page.
   * @param {boolean} isOpen - isOpen is a boolean parameter that indicates whether the menu is open or
   * not.
   */
  const handleMenuToggle = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  };

  const handleBackButtonClick = () => {
    router.push("/dashboard/user-dashboard");
  };

  if (isLoading) {
    return <div>Loading...</div>; // Replace with a proper loading spinner as needed
  }

  if (!userData) {
    return <div>No user data found</div>;
  }

  /* The `containerVariants` constant is an object that defines different animation variants for the
 container element in the `ProfilePage` component. */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.5, duration: 0.5 },
    },
    exit: {
      x: "-100vw",
      transition: { ease: "easeInOut" },
    },
  };

  /* The `return` statement in the `ProfilePage` component is rendering JSX (JavaScript XML) code,
  which represents the structure and content of the component's UI. */
  return (
    <div
      className={`bg-gray-100 min-h-screen ${isMenuOpen ? "menu-open" : ""}`}
    >
      <Navbar userRole={"supervisor"} onMenuToggle={handleMenuToggle} />
      <div
        className={`container mx-auto p-6 ${
          isMenuOpen ? "translate-x-[200px]" : ""
        }`}
      >
        <motion.div
          className="container mx-auto pt-10 pb-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="bg-white rounded-lg shadow-xl p-5 md:p-10 "
            initial={{ scale: 0 }}
            animate={{ rotate: 360, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <motion.div
              className="text-center mb-10"
              initial={{ y: -250 }}
              animate={{ y: -10 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
            >
              <h1 className="font-bold text-3xl text-gray-900">
                User Information
              </h1>
              <p className="text-gray-600">View your profile details below</p>
            </motion.div>
            <div className="space-y-4">
              <p>
                <strong>Name:</strong> {userData.employee_name}
              </p>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <p>
                <strong>Role:</strong> {userData.role}
              </p>
              <p>
                <strong>Department:</strong>{" "}
                {userData.department.department_name}
              </p>
              <p>
                <strong>Employee ID:</strong> {userData.user_id}
              </p>
            </div>
            <motion.div
              className="mt-10 text-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <button
                onClick={handleBackButtonClick}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Back
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
