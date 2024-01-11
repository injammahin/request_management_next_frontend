// Import statements
"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";

// Interface definitions
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
    name: "",
    requestNo: "",
    email: "",
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
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Service Requests</h2>
        {loading ? (
          <p>Loading service requests...</p>
        ) : (
          <ul>
            {serviceRequests.map((request) => (
              <li key={request.id} className="mb-4">
                <p>Request No: {request.requestNo}</p>
                {/* <p>Date: {request.date}</p>
                <p>Department: {request.department}</p> */}
                <button onClick={() => handleServiceRequestEdit(request.id)}>
                  Edit Service Request
                </button>
                {/* Add an edit form or modal here for updating Service Request */}
              </li>
            ))}
          </ul>
        )}
      </div>

      {editRequest && (
        <div>
          <h3>Edit Service Request</h3>
          <div className="mb-6">
            <label
              htmlFor="requestNo"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Request No
            </label>
            <input
              type="text"
              id="requestNo"
              value={editFormData.requestNo}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="date"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Date
            </label>
            <input
              type="text"
              id="date"
              value={editFormData.date}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {/* ???????????????????????? */}
          <div className="mb-6">
            <label
              htmlFor="department"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Department
            </label>
            <input
              type="text"
              id="department"
              value={editFormData.department}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {/* ???????????????????????? */}
          <div className="mb-6">
            <label
              htmlFor="designation"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              designation
            </label>
            <input
              type="text"
              id="designation"
              value={editFormData.designation}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {/* ???????????????????????? */}
          <div className="mb-6">
            <label
              htmlFor="employeeId"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              employee Id
            </label>
            <input
              type="number"
              id="employeeId"
              value={editFormData.employeeId}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {/* ???????????????????????? */}
          <div className="mb-6">
            <label
              htmlFor="reasonOfRequest"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Reason of Request
            </label>
            <input
              type="text"
              id="reasonOfRequest"
              value={editFormData.reasonOfRequest}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {/* ???????????????????????? */}
          <div className="mb-6">
            <label
              htmlFor="requestFor"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              requestFor
            </label>
            <input
              type="text"
              id="requestFor"
              value={editFormData.requestFor}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {/* ???????????????????????? */}
          <div className="mb-6">
            <label
              htmlFor="requestedBy"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              requestedBy
            </label>
            <input
              type="text"
              id="requestedBy"
              value={editFormData.requestedBy}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {/* ???????????????????????? */}
          <div className="mb-6">
            <label
              htmlFor="serviceDetails"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              serviceDetails
            </label>
            <input
              type="text"
              id="serviceDetails"
              value={editFormData.serviceDetails}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          {/* Add other fields as needed */}
          <button
            className="bg-[#163020] w-32 h-12 rounded-xl text-white"
            onClick={handleUpdateServiceRequest}
          >
            Save Changes
          </button>
        </div>
      )}
    </>
  );
}
