"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/app/components/navigation/page";

interface UserDetails {
  id: number;
  name: string;

  email: string;

  // Connect_bank: any[];
  // Payments: any[];
}

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth/profile", {
          headers: {
            id: `${localStorage.getItem("id")}`,
          },
        });
        const userData = response.data as UserDetails;
        console.log("ok", userData);
        setUserDetails(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md space-y-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 text-center">
              user's request's
            </h2>
          </div>
          <div className="space-y-4">
            {/* <p className="text-sm text-gray-700">
            <span className="font-bold">ID:</span> {userDetails.id}
          </p> */}
            <p className="text-sm text-gray-700">
              <span className="font-bold">Name:</span> {userDetails.name}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-bold">Email:</span> {userDetails.email}
            </p>
          </div>
          <a
            href="/user/editUser"
            className="block w-full text-center text-blue-500 hover:underline"
          >
            Edit Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
