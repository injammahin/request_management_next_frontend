// pages/ServiceRequests.tsx
"use client";
import Navbar from "@/app/components/navigation/page";
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
  cisoStatus: string;
  supervisorStatus: string;
}

const ServiceRequests: React.FC = () => {
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedRequests, setExpandedRequests] = useState<number[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/service-requests/approved")
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // This function will be called by the Navbar component
  const handleMenuToggle = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  };

  const handleAction = async (id: number, action: "approved" | "reject") => {
    try {
      await fetch(`http://localhost:3001/service-requests/${action}/${id}`, {
        method: "PATCH",
      });
      setServiceRequests((prev) =>
        prev.map((req) =>
          req.id === id
            ? {
                ...req,
                cisoStatus: action === "approved" ? "approved" : "reject",
              }
            : req
        )
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedRequests((prev) =>
      prev.includes(id) ? prev.filter((prevId) => prevId !== id) : [...prev, id]
    );
  };

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div
      className={`bg-gray-100 min-h-screen ${isMenuOpen ? "menu-open" : ""}`}
    >
      <Navbar userRole={"supervisor"} onMenuToggle={handleMenuToggle} />
      <div
        className={`container mx-auto p-6 ${
          isMenuOpen ? "translate-x-[300px]" : ""
        }`}
      >
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
              {expandedRequests.includes(request.id) ? (
                <>
                  <div>
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
                  </div>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`font-bold ${
                        request.cisoStatus === "reject"
                          ? "text-yellow-500"
                          : request.cisoStatus === "approved"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {request.cisoStatus}
                    </span>
                  </p>
                  <div className="flex space-x-2 mt-3">
                    <button
                      onClick={() => handleAction(request.id, "approved")}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      approved
                    </button>
                    <button
                      onClick={() => handleAction(request.id, "reject")}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Decline
                    </button>
                  </div>
                  <button
                    onClick={() => toggleExpand(request.id)}
                    className="text-blue-500 mt-2 cursor-pointer"
                  >
                    Show Less
                  </button>
                </>
              ) : (
                <button
                  onClick={() => toggleExpand(request.id)}
                  className="text-blue-500 cursor-pointer"
                >
                  Show More
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServiceRequests;
