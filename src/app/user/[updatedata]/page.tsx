// Import the necessary dependencies
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
export interface ServiceRequest {
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
  const [reqNo, setReqNo] = useState<any>(null);
  const [requestId, setRequestId] = useState<number | null>(null);
  const [initialFormData, setInitialFormData] = useState<ServiceRequest | null>(
    null
  );

  // Use useEffect to parse query parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("requestId");

    setRequestId(Number(idParam));
  }, []);

  // Use useEffect to fetch data when requestId changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.put<ServiceRequest>(
          `http://localhost:3001/service-requests/${requestId}`
        );
        setEditFormData(response.data);
        setInitialFormData(response.data && response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

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
      ...initialFormData!,
      [e.target.id]: e.target.value,
    });
  };
  console.log(initialFormData, "adkjfkah");

  return (
    <form className="max-w-3xl uppercase mx-auto mt-8 p-4 border">
      <div className="grid  grid-cols-2 gap-4 mb-4">
        <div className="mb-2 flex flex-row items-center">
          <label className="flex flex-none mr-2">request no:</label>
          <input
            type="text"
            name="requestNo"
            id="requestNo"
            value={initialFormData?.requestNo} // Display requestNo
            readOnly
            className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
        </div>

        <div className="mb-2 flex flex-row items-center">
          <label className="flex flex-none mr-2">date:</label>
          <input
            type="date"
            name="date"
            onChange={handleInputChange}
            value={initialFormData?.date}
            className=" w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="mb-2 flex flex-row items-center">
          <label className=" flex flex-none mr-2">request by : </label>
          <input
            type="text"
            name="requestedBy"
            onChange={handleInputChange}
            value={initialFormData?.requestedBy}
            className="block w-full  py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
        </div>

        <div className="mb-2 flex flex-row items-center">
          <label className="flex flex-none mr-2">request For:</label>
          <input
            type="text"
            name="requestFor"
            onChange={handleInputChange}
            value={initialFormData?.requestFor}
            className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="mb-2 flex flex-row items-center">
          <label className="flex flex-none mr-2">department:</label>
          <input
            type="text"
            name="department"
            onChange={handleInputChange}
            value={initialFormData?.department}
            className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
        </div>

        <div className="mb-2 flex flex-row items-center">
          <label className="flex flex-none mr-2">employee Id:</label>
          <input
            type="text"
            name="employeeId"
            onChange={handleInputChange}
            value={initialFormData?.employeeId}
            className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
        </div>
      </div>

      <div className="mb-2 flex flex-row items-center">
        <label className="flex flex-none mr-2">designation:</label>
        <input
          type="text"
          name="designation"
          onChange={handleInputChange}
          value={initialFormData?.designation}
          className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        />
      </div>

      <div className="mb-2 flex flex-row items-center">
        <label className="flex flex-none mr-2">reason Of Request:</label>
        <input
          type="text"
          name="reasonOfRequest"
          onChange={handleInputChange}
          value={initialFormData?.reasonOfRequest}
          className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        />
      </div>

      <div className="mb-2 flex flex-row items-center">
        <label className="flex flex-none mr-2">service Details:</label>
        <input
          type="text"
          name="serviceDetails"
          onChange={handleInputChange}
          value={initialFormData?.serviceDetails}
          className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        />
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          className="bg-gray-500 text-white p-2 w-32 rounded hover:bg-gray-700"
        >
          <Link href="/dashboard">Back</Link>
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default EditServiceRequest;
