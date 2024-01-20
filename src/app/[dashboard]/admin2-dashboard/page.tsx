// src/app/admin-dashboard/index.tsx
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface ServiceRequest {
  id: number;
  requestNo: string;
  approvalStatus: string;
  // ... other fields
}

const AdminDashboard: React.FC = () => {
  const [pendingRequests, setPendingRequests] = useState<ServiceRequest[]>([]);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/service-requests/pending"
        );
        setPendingRequests(response.data);
      } catch (error) {
        console.error("Error fetching pending service requests:", error);
      }
    };

    fetchPendingRequests();
  }, []);

  const handleApprove = async (id: number) => {
    try {
      await axios.patch(`http://localhost:3001/service-requests/approve/${id}`);
      // Update the approval status locally without making another request
      setPendingRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id
            ? { ...request, approvalStatus: "approved" }
            : request
        )
      );
      console.log(`Service Request ${id} approved successfully`);
    } catch (error) {
      console.error(`Error approving service request ${id}:`, error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        {pendingRequests.map((request) => (
          <li key={request.id}>
            {request.requestNo} - {request.approvalStatus}
            <button
              className="bg-green-500 rounded-lg py-4 "
              onClick={() => handleApprove(request.id)}
            >
              Approve
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
