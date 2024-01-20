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
        setPendingRequests(
          response.data.filter(
            (request: { approvalStatus: string }) =>
              request.approvalStatus !== "approved"
          )
        );
      } catch (error) {
        console.error("Error fetching pending service requests:", error);
      }
    };

    if (showAllPending || successMessage) {
      fetchPendingRequests();
    }
  }, [showAllPending, successMessage]);

  const confirmAction = (action: string, id: number) => {
    return window.confirm(`Are you sure you want to ${action} request ${id}?`);
  };

  const handleApprove = async (id: number) => {
    if (confirmAction("approve", id)) {
      try {
        await axios.patch(
          `http://localhost:3001/service-requests/approve/${id}`
        );
        setPendingRequests((prevRequests) =>
          prevRequests.filter((request) => request.id !== id)
        );
        setSuccessMessage(`Service Request ${id} approved successfully`);
      } catch (error) {
        console.error(`Error approving service request ${id}:`, error);
      }
    }
  };

  const handleDecline = async (id: number) => {
    try {
      await axios.patch(`http://localhost:3001/service-requests/decline/${id}`);
      // Update the approval status locally without making another request
      setPendingRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id
            ? { ...request, approvalStatus: "declined" }
            : request
        )
      );
      console.log(`Service Request ${id} declined successfully`);
    } catch (error) {
      console.error(`Error declining service request ${id}:`, error);
    }
  };

  const handlePending = async (id: number) => {
    try {
      await axios.patch(
        `http://localhost:3001/service-requests/revision/${id}`
      );
      // Update the approval status locally without making another request
      setPendingRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id
            ? { ...request, approvalStatus: "revision" }
            : request
        )
      );
      console.log(`Service Request ${id} set to pending successfully`);
    } catch (error) {
      console.error(`Error setting service request ${id} to pending:`, error);
    }
  };

  const handleShowAllDetails = (id: number) => {
    setShowAllDetails((prevId) => (prevId === id ? null : id));
  };

  return (
    <div>
      <Navbar userRole={"supervisor"} />
      <h1>Admin Dashboard</h1>
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <button
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 mb-4"
        onClick={() =>
          setShowAllPending((prevShowAllPending) => !prevShowAllPending)
        }
      >
        {showAllPending ? "Hide Pending Requests" : "Show All Pending Requests"}
      </button>
      {showAllPending && (
        <ul>
          {pendingRequests.map((request) => (
            <li key={request.id}>
              {request.requestNo} - {request.approvalStatus}
              <button
                className="bg-green-500 rounded-lg py-2 px-4 ml-4"
                onClick={() => handleApprove(request.id)}
              >
                Approve
              </button>
              <button
                className="bg-red-500 rounded-lg py-2 px-4 ml-2"
                onClick={() => handleDecline(request.id)}
              >
                Decline
              </button>
              <button
                className="bg-yellow-500 rounded-lg py-2 px-4 ml-2"
                onClick={() => handlePending(request.id)}
              >
                Pending
              </button>
              <button
                className="bg-blue-500 rounded-lg py-2 px-4 ml-2"
                onClick={() => handleShowAllDetails(request.id)}
              >
                {showAllDetails === request.id ? "Show Less" : "Show More"}
              </button>
              {showAllDetails === request.id && (
                <div>
                  <div>
                    <table className="w-full  bg-gray-100">
                      <tbody>
                        <tr>
                          {/* Request No and Date in one row */}
                          <td className="border-[1px] border-b-1 py-2 px-4 border-gray-600">
                            <div className="font-semibold text-sm text-gray-900">
                              Request No: {request.requestNo}
                            </div>
                          </td>

                          <td className="border-[1px] border-b-1 py-2 px-4 border-gray-600">
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
                    </table>
                  </div>
                  {/* ... (other details) */}
                  <div className="flex space-x-2 mt-2">
                    {/* <button
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-700"
                    onClick={() => handleApprove(form)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
                    onClick={() => handleDelete(form)}
                  >
                    Decline
                  </button>
                  <button
                    className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-700"
                    onClick={() => handleRevision(form)}
                  >
                    Revision
                  </button> */}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboard;
