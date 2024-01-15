// Import statements
"use client";
import Navbar from "@/app/components/navigation/page";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Interface definitions
interface UserData {
  id: string;

  requestNo: string;
}

interface ServiceRequest {
  id: number;
  requestNo: string;
  date: string;
  department: string;
  designation: string;
  employeeId: string;
  reasonOfRequest: string;
  requestFor: string;
  requestedBy: string;
  serviceDetails: string;

  // Add other fields as needed
}

export default function UserProfile() {
  const [userData, setUserData] = useState<UserData>({
    id: "",

    requestNo: "",
  });

  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const [editRequest, setEditRequest] = useState<ServiceRequest | null>(null);
  const [editFormData, setEditFormData] = useState<ServiceRequest>({
    id: 0,
    requestNo: "",
    date: "",
    department: "",
    designation: "",
    employeeId: "",
    reasonOfRequest: "",
    requestFor: "",
    requestedBy: "",
    serviceDetails: "",
    // Add other fields as needed
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("id");
        const [userDataResponse, serviceRequestsResponse] = await Promise.all([
          axios.get<UserData>(`http://localhost:3001/auth/profile`, {}),
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

  const handleServiceRequestEdit = (id: number) => {
    const requestToEdit = serviceRequests.find((request) => request.id === id);
    if (requestToEdit) {
      setEditRequest(requestToEdit);
      setEditFormData({ ...requestToEdit });
    }
  };

  const handleUpdateServiceRequest = () => {
    if (editRequest) {
      axios
        .put(
          `http://localhost:3001/service-requests/${editRequest.id}`,
          editFormData
        )
        .then((response) => {
          console.log(response.data);
          // Update the local state or refetch the service requests
          const updatedServiceRequests = serviceRequests.map((request) => {
            if (request.id === editRequest.id) {
              return {
                ...request,
                ...editFormData,
              };
            }
            return request;
          });

          setServiceRequests(updatedServiceRequests);
          // Reset edit state
          setEditRequest(null);
          setEditFormData({
            id: 0,
            requestNo: "",
            date: "",
            department: "",
            designation: "",
            employeeId: "",
            reasonOfRequest: "",
            requestFor: "",
            requestedBy: "",
            serviceDetails: "",

            // Add other fields as needed
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditFormData({
      ...editFormData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <>
      <Navbar />
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Service Requests</h2>
        {loading ? (
          <p>Loading service requests...</p>
        ) : (
          <ul>
            {serviceRequests.map((request) => (
              <li key={request.id} className="mb-4">
                <p>Request by: {request.requestedBy}</p>
                {/* <p>Date: {request.date}</p>
                <p>Department: {request.department}</p> */}
                <button
                  className="bg-prple-500 rounded"
                  onClick={() => handleServiceRequestEdit(request.id)}
                >
                  Edit Service Request
                </button>
                {/* Add an edit form or modal here for updating Service Request */}
              </li>
            ))}
          </ul>
        )}
      </div>

      {editRequest && (
        <form className="max-w-md uppercase p-4 border mx-[500px] my-[-900px]">
          <div className="grid  grid-cols-2 gap-4 mb-4">
            <div className="relative z-0 mb-2">
              <label className="block">
                request no:
                <input
                  type="text"
                  name="requestNo"
                  id="requestNo"
                  value={editFormData.requestNo}
                  // Display requestNo
                  onChange={handleInputChange}
                  readOnly
                  className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
              </label>
            </div>

            <div className="relative z-0 mb-2">
              <label className="block">
                date:
                <input
                  type="date"
                  id="date"
                  onChange={handleInputChange}
                  value={editFormData.date}
                  className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="mb-2">
              <label className="block">
                requested By:
                <input
                  type="text"
                  id="requestedBy"
                  onChange={handleInputChange}
                  value={editFormData.requestedBy}
                  className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
              </label>
            </div>

            <div className="mb-2">
              <label className="block">
                request For:
                <input
                  type="text"
                  id="requestFor"
                  onChange={handleInputChange}
                  value={editFormData.requestFor}
                  className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="mb-2">
              <label className="block">
                department:
                <input
                  type="text"
                  id="department"
                  onChange={handleInputChange}
                  value={editFormData.department}
                  className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
              </label>
            </div>

            <div className="mb-2">
              <label className="block">
                employee Id:
                <input
                  type="text"
                  id="employeeId"
                  onChange={handleInputChange}
                  value={editFormData.employeeId}
                  className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
              </label>
            </div>
          </div>

          <div className="mb-2">
            <label className="block">
              designation:
              <input
                type="text"
                id="designation"
                onChange={handleInputChange}
                value={editFormData.designation}
                className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </label>
          </div>

          <div className="mb-2">
            <label className="block">
              reason Of Request:
              <input
                type="text"
                id="reasonOfRequest"
                onChange={handleInputChange}
                value={editFormData.reasonOfRequest}
                className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </label>
          </div>

          <div className="mb-2">
            <label className="block">
              service Details:
              <input
                type="text"
                id="serviceDetails"
                onChange={handleInputChange}
                value={editFormData.serviceDetails}
                className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </label>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-500 text-white p-2 w-32 rounded hover:bg-gray-700"
            >
              <a href="/dashboard">Back</a>
            </button>
            <button
              className="bg-[#163020] w-32 h-12 rounded-xl text-white"
              onClick={handleUpdateServiceRequest}
            >
              Save Changes
            </button>
          </div>
        </form>
      )}
    </>
  );
}
