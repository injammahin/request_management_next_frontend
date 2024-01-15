// Import the necessary dependencies
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export interface ServiceRequest {
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

interface EditServiceRequestProps {}

const EditServiceRequest: React.FC<EditServiceRequestProps> = () => {
  const [editFormData, setEditFormData] = useState<ServiceRequest | null>(null);
  const [requestId, setRequestId] = useState<number | null>(null);
  console.log(requestId);
  // Use useEffect to parse query parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("requestId");
    console.log(requestId);
    if (idParam) {
      const id = Number(idParam);
      if (!isNaN(id)) {
        setRequestId(id);
      }
    }
  }, []);
  console.log("olau", requestId);
  // Use useEffect to fetch data when requestId changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.put<ServiceRequest>(
          `http://localhost:3001/service-requests/${requestId}`
        );
        setEditFormData(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    console.log("edfe", requestId);

    // Fetch data only if requestId is available
    if (requestId !== null) {
      fetchData();
    }
  }, [requestId]);

  const handleUpdateServiceRequest = () => {
    // Implement your update logic here using editFormData
    // ...
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditFormData({
      ...editFormData!,
      [e.target.id]: e.target.value,
    });
  };

  if (editFormData === null) {
    return <p>Loading..no data pass.</p>;
  }

  return (
    <div className="max-w-md uppercase p-4 border mx-[500px] my-[-900px]">
      {/* Render your form fields using editFormData */}
      <label>
        Request No:
        <input
          type="text"
          id="requestNo"
          value={editFormData.requestNo}
          onChange={handleInputChange}
        />
      </label>
      {/* Add other form fields here */}

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
    </div>
  );
};

export default EditServiceRequest;
