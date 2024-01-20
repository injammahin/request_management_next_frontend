// pages/ServiceRequests.tsx
"use client";
import React, { useState, useEffect } from "react";

interface ServiceRequest {
  id: number;
  requestNo: string;
  requestedBy: string;
  department: string;
  designation: string;
  date: string;
  requestFor: string;
  employeeId: string;
  reasonOfRequest: string;
  serviceDetails: string;
  approvalStatus: string;
  supervisorStatus: string;
}

const ServiceRequests: React.FC = () => {
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/service-requests/it-department")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setServiceRequests(data))
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, []);

  const handleAction = async (id: number, action: "release" | "block") => {
    try {
      await fetch(`http://localhost:3001/service-requests/${action}/${id}`, {
        method: "PATCH",
      });
      setServiceRequests((prev) =>
        prev.map((req) =>
          req.id === id
            ? {
                ...req,
                supervisorStatus: action === "release" ? "Released" : "Blocked",
              }
            : req
        )
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        IT Department Service Requests
      </h1>
      <ul>
        {serviceRequests.map((request) => (
          <li
            key={request.id}
            className="bg-white shadow-lg rounded-lg p-4 mb-4"
          >
            <h2 className="text-xl font-semibold mb-2">
              Request No: {request.requestNo}
            </h2>
            <p>
              <strong>Requested By:</strong> {request.requestedBy}
            </p>
            <p>
              <strong>Department:</strong> {request.department}
            </p>
            <p>
              <strong>Date:</strong> {request.date}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`font-bold ${
                  request.supervisorStatus === "Pending"
                    ? "text-yellow-500"
                    : request.supervisorStatus === "Released"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {request.supervisorStatus}
              </span>
            </p>
            <div className="flex space-x-2 mt-3">
              <button
                onClick={() => handleAction(request.id, "release")}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Release
              </button>
              <button
                onClick={() => handleAction(request.id, "block")}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Block
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceRequests;
