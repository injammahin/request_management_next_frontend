"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";

interface UserData {
  id: string;
  name: string;

  email: string;
  requestNo: string;
}

interface ServiceRequest {
  id: number;
  requestNo: string;
  date: string;
  department: string;

  // Add other fields as needed
}

export default function UserProfile() {
  const [userData, setUserData] = useState<UserData>({
    id: "",
    name: "",
    requestNo: "",

    email: "",
  });

  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const [userDataResponse, serviceRequestsResponse] = await Promise.all([
          axios.get<UserData>(`http://localhost:3001/auth/profile`, {
            headers: { id: userId },
          }),
          axios.get<ServiceRequest[]>(
            `http://localhost:3001/service-requests?userId=${userId}`
          ),
        ]);

        setUserData(userDataResponse.data);
        setServiceRequests(serviceRequestsResponse.data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = () => {
    axios
      .put(`http://localhost:3001/auth/${userData.id}`, { ...userData })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleServiceRequestEdit = (id: number) => {
    // Implement the logic to edit a specific service request
    // You might want to open a modal or navigate to another page for editing
    console.log(`Edit service request with id ${id}`);
  };

  return (
    <>
      <div className="mb-6">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email
        </label>
        <input
          type="text"
          id="email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="requestNo"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          requestNo
        </label>
        <input
          type="text"
          id="requestNo"
          value={userData.requestNo}
          onChange={(e) =>
            setUserData({ ...userData, requestNo: e.target.value })
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <button onClick={handleEdit}>Update User</button>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Service Requests</h2>
        {loading ? (
          <p>Loading service requests...</p>
        ) : (
          <ul>
            {serviceRequests.map((request) => (
              <li key={request.id} className="mb-4">
                {/* Display service request details here */}
                <p>Request No: {request.requestNo}</p>
                {/* ... other details ... */}
                <button onClick={() => handleServiceRequestEdit(request.id)}>
                  Edit Service Request
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
