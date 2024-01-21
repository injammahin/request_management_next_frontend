// src/app/admin-dashboard/index.tsx
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/app/components/navigation/page";

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
  approvalStatus: string;
}

const AdminDashboard: React.FC = () => {
  const [pendingRequests, setPendingRequests] = useState<ServiceRequest[]>([]);
  const [showAllPending, setShowAllPending] = useState(false);
  const [showAllDetails, setShowAllDetails] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/service-requests/released"
        );
        setPendingRequests(response.data);
      } catch (error) {
        console.error("Error fetching service requests:", error);
      }
    };

    fetchPendingRequests();
  }, []);

  const confirmAction = (action: string, id: number) =>
    window.confirm(`Are you sure you want to ${action} request ${id}?`);

  const handleApprove = async (id: number) => {
    if (confirmAction("approve", id)) {
      try {
        await axios.patch(
          `http://localhost:3001/service-requests/approve/${id}`
        );
        setPendingRequests((prev) =>
          prev.filter((request) => request.id !== id)
        );
        setSuccessMessage(`Request ${id} approved successfully`);
      } catch (error) {
        console.error(`Error approving request ${id}:`, error);
      }
    }
  };

  const handleDecline = async (id: number) => {
    if (confirmAction("decline", id)) {
      try {
        await axios.patch(
          `http://localhost:3001/service-requests/decline/${id}`
        );
        setPendingRequests((prev) =>
          prev.map((request) =>
            request.id === id
              ? { ...request, approvalStatus: "Declined" }
              : request
          )
        );
        setSuccessMessage(`Request ${id} declined successfully`);
      } catch (error) {
        console.error(`Error declining request ${id}:`, error);
      }
    }
  };

  const handlePending = async (id: number) => {
    if (confirmAction("set to pending", id)) {
      try {
        await axios.patch(
          `http://localhost:3001/service-requests/revision/${id}`
        );
        setPendingRequests((prev) =>
          prev.map((request) =>
            request.id === id
              ? { ...request, approvalStatus: "Pending" }
              : request
          )
        );
        setSuccessMessage(`Request ${id} set to pending successfully`);
      } catch (error) {
        console.error(`Error setting request ${id} to pending:`, error);
      }
    }
  };

  const handleShowAllDetails = (id: number) =>
    setShowAllDetails((prev) => (prev === id ? null : id));

  return (
    <div className=" bg-gray-100 min-h-screen">
      <Navbar userRole={"supervisor"} />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Admin Dashboard
        </h1>
        {successMessage && <p className="text-green-600">{successMessage}</p>}
        <div className="flex justify-end mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowAllPending((prev) => !prev)}
          >
            {showAllPending ? "Hide Requests" : "Show All Requests"}
          </button>
        </div>
        {showAllPending && (
          <div className="space-y-4">
            {pendingRequests.map((request) => (
              <div key={request.id} className="bg-white shadow rounded-lg p-4">
                <h2 className="text-xl font-semibold">
                  {request.requestNo} - {request.approvalStatus}
                </h2>
                <div className="flex space-x-2 mt-4">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleApprove(request.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDecline(request.id)}
                  >
                    Decline
                  </button>
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handlePending(request.id)}
                  >
                    Pending
                  </button>
                  <button
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                      showAllDetails === request.id ? "opacity-75" : ""
                    }`}
                    onClick={() => handleShowAllDetails(request.id)}
                  >
                    {showAllDetails === request.id ? "Less" : "More"}
                  </button>
                </div>
                {showAllDetails === request.id && (
                  <tbody>
                    <tr>
                      {/* Request No and Date in one row */}
                      <td className="border-[1px]    border-b-1 py-2 px-4 border-gray-600">
                        <div className="font-semibold text-sm text-gray-900">
                          Request No: {request.requestNo}
                        </div>
                      </td>

                      <td className="border-[1px] border-b-1 py-2 px-4  border-gray-600">
                        <div className="font-semibold text-sm text-gray-900">
                          Date: {request.date}
                        </div>
                      </td>
                    </tr>

                    <tr>
                      {/* Request No and Date in one row */}
                      <td className="border-[1px] border-b-1 py-2 px-4 border-gray-600">
                        <div className="font-semibold text-sm text-gray-900">
                          Requested By: {request.requestedBy}
                        </div>
                      </td>

                      <td className="border-[1px] border-b-1 py-2 px-4 border-gray-600">
                        <div className="font-semibold text-sm text-gray-900">
                          Request For: {request.requestFor}
                        </div>
                      </td>
                    </tr>

                    <tr>
                      {/* Request No and Date in one row */}
                      <td className="border-[1px] border-b-1 py-2 px-4 border-gray-600">
                        <div className="font-semibold text-sm text-gray-900">
                          Department: {request.department}
                        </div>
                      </td>

                      <td className="border-[1px] border-b-1 py-2 px-4 border-gray-600">
                        <div className="font-semibold text-sm text-gray-900">
                          Employee Id: {request.employeeId}
                        </div>
                      </td>
                    </tr>

                    <tr>
                      {/* Designation in a separate row */}
                      <td
                        colSpan={2}
                        className="border-[1px] border-b-1 py-2 px-4 border-gray-600"
                      >
                        <div className="font-semibold text-sm text-gray-900">
                          Designation: {request.designation}
                        </div>
                      </td>
                    </tr>

                    <tr>
                      {/* Reason of Request in a separate row */}
                      <td
                        colSpan={2}
                        className="border-[1px] border-b-1 py-2 px-4 border-gray-600"
                      >
                        <div className="font-semibold text-sm text-gray-900">
                          Reason of Request: {request.reasonOfRequest}
                        </div>
                      </td>
                    </tr>

                    <tr>
                      {/* Service Details in a separate row */}
                      <td
                        colSpan={2}
                        className="border-[1px] border-b-1 py-2 px-4 border-gray-600"
                      >
                        <div className="font-semibold text-sm text-gray-900">
                          Service Details: {request.serviceDetails}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
