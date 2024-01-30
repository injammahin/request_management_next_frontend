// src/app/user/profile/page.tsx

"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/app/components/navigation/page";
import LoadingSpinner from "@/app/components/loading/page";
import jsPDF from "jspdf";
import "jspdf-autotable";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface UserDetails {
  id: number | undefined;
  name: string | undefined;
  email: string | undefined;
  user_id: string | undefined;
  designation: string | undefined;
  department_id: string | undefined;
  role: string | undefined;
}

interface ServiceRequest {}

interface UserWithServiceRequests extends UserDetails {
  serviceRequests?: ServiceRequest[];
}

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<UserWithServiceRequests | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();

  const handleBackButtonClick = () => {
    router.push("../dashboard/user-dashboard");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth/profile", {
          headers: {
            id: `${localStorage.getItem("userId")}`,
          },
        });

        const fetchedUserData = response.data as UserWithServiceRequests;

        fetchedUserData.serviceRequests?.forEach((request) => {});

        setUserData(fetchedUserData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const handleMenuToggle = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  };

  if (!userData) {
    return <LoadingSpinner loading={isLoading} />;
  }

  return (
    <div
      className={`bg-gray-100 min-h-screen ${isMenuOpen ? "menu-open" : ""}`}
    >
      <Navbar userRole={"supervisor"} onMenuToggle={handleMenuToggle} />
      <div
        className={`container mx-auto p-48 shadow-lg ${
          isMenuOpen ? "translate-x-[200px]" : ""
        }`}
      >
        <div className="w-full pt-16 bg-white text-center p-8 rounded-lg shadow-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold  text-gray-800">
              User Information
            </h2>
          </div>
          <div className="space-y-4">
            <p className="text-lg border-2 text-gray-700">
              <span className="font-semibold bor  ">Name:</span> {userData.name}
            </p>
            <p className="text-lg border-2 text-gray-700">
              <span className="font-semibold">Email:</span> {userData.email}
            </p>
            <p className="text-lg border-2 text-gray-700">
              <span className="font-semibold">Your user role is:</span>{" "}
              {userData.role}
            </p>
            <p className="text-lg border-2 text-gray-700">
              <span className="font-semibold">Department:</span>{" "}
              {userData.department_id}
            </p>
            <p className="text-lg border-2 text-gray-700">
              <span className="font-semibold">Employee ID:</span>{" "}
              {userData.user_id}
            </p>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
              onClick={handleBackButtonClick}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
