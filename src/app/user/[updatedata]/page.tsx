// Import necessary libraries and components
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/app/components/navigation/page";
import Link from "next/link";

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    requestNo: "",
    date: "",
    department: "",
    reasonOfRequest: "",
    requestFor: "",
    requestedBy: "",
    serviceDetails: "",
  });

  const [updateData, setUpdateData] = useState({
    requestNo: "",
    date: "",
    department: "",
    reasonOfRequest: "",
    requestFor: "",
    requestedBy: "",
    serviceDetails: "",
  });

  const [message, setMessage] = useState("");
  const [requestId, setRequestId] = useState<number | null>(null);

  useEffect(() => {
    // Fetch the user's data after they log in
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("requestId");

    setRequestId(Number(idParam));
  }, []); // Empty dependency array ensures this effect runs once after component mounts
  console.log(requestId);
  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3001/service-requests/${requestId}`,
        updateData
      );
      console.log(userData);
      setUserData(response.data);
      setMessage("information change successful!");
      // Optionally, you can clear the updateData after a successful update
      setUpdateData({
        requestNo: "",
        date: "",
        department: "",
        reasonOfRequest: "",
        requestFor: "",
        requestedBy: "",
        serviceDetails: "",
      });
    } catch (error) {
      console.error("Update failed:", error);
      setMessage("information change failed. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              service request information
            </h2>
          </div>
          <div className="mt-8 space-y-6">
            <div>
              <label>requestFor</label>
              <input
                type="text"
                value={updateData?.requestFor}
                onChange={(e) =>
                  setUpdateData({ ...updateData, requestFor: e.target.value })
                }
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-gray-500 text-white p-2 w-28 rounded hover:bg-gray-700"
                >
                  <Link href="/user/profile">back</Link>
                </button>
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Change information
                </button>
              </div>
            </div>
            {message && (
              <p className="text-center text-green-500 mt-2">{message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
