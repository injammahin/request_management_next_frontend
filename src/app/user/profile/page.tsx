// src/app/user/profile/page.tsx
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/app/components/navigation/page";
import Link from "next/link";

interface UserDetails {
  id: number;
  name: string;
  email: string;
}

interface ServiceRequest {
  id: number;
  date: string;
  department: string;
  designation: string;
  employeeId: string;
  reasonOfRequest: string;
  requestFor: string;
  requestNo: string;
  requestedBy: string;
  serviceDetails: string;
}

interface UserWithServiceRequests extends UserDetails {
  serviceRequests: ServiceRequest[];
}

const ProfilePage = () => {
  const [userData, setUserData] = useState<UserWithServiceRequests | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth/profile", {
          headers: {
            id: `${localStorage.getItem("id")}`,
          },
        });

        const userData = response.data as UserWithServiceRequests;
        console.log("User Data:", userData);
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="screen-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className=" w-full bg-white p-8 rounded-lg shadow-md space-y-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 text-center">
              User's Requests
            </h2>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <span className="font-bold">ID:</span> {userData.id}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-bold">Name:</span> {userData.name}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-bold">Email:</span> {userData.email}
            </p>
            {userData.serviceRequests &&
              userData.serviceRequests.length > 0 && (
                <div className="bg-gray-200 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">
                    Service Requests:
                  </h3>

                  {userData.serviceRequests.map((request) => (
                    <div
                      key={request.id}
                      className="mb-4 bg-white border-b-2 border-gray-300 p-4"
                    >
                      <p className="text-sm text-gray-900">
                        <span className="font-bold">Request No:</span>{" "}
                        {request.requestNo} -{" "}
                        <span className="font-bold">Date:</span> {request.date}{" "}
                        - <span className="font-bold">Department:</span>{" "}
                        {request.department} -{" "}
                        <span className="font-bold">Designation:</span>{" "}
                        {request.designation} -{" "}
                        <span className="font-bold">Employee Id:</span>{" "}
                        {request.employeeId} -{" "}
                        <span className="font-bold">Reason of Request:</span>{" "}
                        {request.reasonOfRequest} -{" "}
                        <span className="font-bold">Request For:</span>{" "}
                        {request.requestFor} -{" "}
                        <span className="font-bold">Requested By:</span>{" "}
                        {request.requestedBy} -{" "}
                        <span className="font-bold">Service Details:</span>{" "}
                        {request.serviceDetails}
                      </p>
                    </div>
                  ))}
                </div>
              )}
          </div>
          <div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-gray-500 text-white p-2 w-32 rounded hover:bg-gray-700"
              >
                <Link href="/dashboard">Back</Link>
              </button>
              <a
                href="/user/editUser"
                className="block w-full text-center text-blue-500 hover:underline"
              >
                Edit Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
