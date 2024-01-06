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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md space-y-8">
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
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Service Requests:
                  </h3>
                  {userData.serviceRequests.map((request) => (
                    <div key={request.id} className="mb-4">
                      <p>
                        <span className="font-bold">Request No:</span>{" "}
                        {request.requestNo}
                      </p>
                      <p>
                        <span className="font-bold">date :</span> {request.date}
                      </p>
                      <p>
                        <span className="font-bold">department:</span>{" "}
                        {request.department}
                      </p>
                      <p>
                        <span className="font-bold">designation :</span>{" "}
                        {request.designation}
                      </p>
                      <p>
                        <span className="font-bold">employee Id:</span>{" "}
                        {request.employeeId}
                      </p>
                      <p>
                        <span className="font-bold">reasonOfRequest :</span>{" "}
                        {request.reasonOfRequest}
                      </p>
                      <p>
                        <span className="font-bold">requestFor:</span>{" "}
                        {request.requestFor}
                      </p>
                      <p>
                        <span className="font-bold">requestNo:</span>{" "}
                        {request.requestNo}
                      </p>
                      <p>
                        <span className="font-bold">requestedBy:</span>{" "}
                        {request.requestedBy}
                      </p>
                      <p>
                        <span className="font-bold">serviceDetails:</span>{" "}
                        {request.serviceDetails}
                      </p>
                      {/* Add more fields as needed */}
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
