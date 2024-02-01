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
  supervisorStatus: string;
}

const ServiceRequests: React.FC = () => {
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedRequests, setExpandedRequests] = useState<number[]>([]);
  const [showAllRequests, setShowAllRequests] = useState(false);
  useEffect(() => {
    fetch("http://localhost:3001/service-requests/DatabaseAdministration")
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
  const toggleExpandAll = () => {
    setExpandedRequests((prev) =>
      showAllRequests ? [] : serviceRequests.map((req) => req.id)
    );
    setShowAllRequests(!showAllRequests);
  };
  const pendingToRelease = serviceRequests.filter(
    (request) => request.supervisorStatus === "Pending "
  );
  const released = serviceRequests.filter(
    (request) => request.supervisorStatus === "Pending"
  );
  const toggleShowAllRequests = () => {
    setShowAllRequests((prev) => !prev);
  };
  const totalPendingToRelease = pendingToRelease.length;
  const totalReleased = released.length;

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
      className={`bg-gray-100 pt-20 min-h-screen ${
        isMenuOpen ? "menu-open" : ""
      }`}
    >
      <Navbar userRole={"supervisor"} onMenuToggle={handleMenuToggle} />
      <div
        className={`container mx-auto p-6 ${
          isMenuOpen ? "translate-x-[230px]" : ""
        }`}
      >
        <h1 className="text-2xl font-bold text-center mb-6">
          Department Of Database Administration Service Requests
        </h1>
        <h2>Total Pending to Release: {totalPendingToRelease}</h2>
        <h2>Total Released: {totalReleased}</h2>
        {/* <button
          onClick={toggleExpandAll}
          className="text-blue-500 cursor-pointer mb-4"
        >
          {showAllRequests ? "Hide All" : "Show All"}
        </button> */}
        <button
          onClick={toggleShowAllRequests}
          className="text-blue-500 cursor-pointer mb-4"
        >
          {showAllRequests ? "Hide All" : "View All"}
        </button>

        <ul>
          {serviceRequests.map((request) => (
            <li
              key={request.id}
              className="bg-white shadow-lg   text text-center  border-b-2 border-gray-400 "
            >
              <td>
                <tr className="border-gray-300">
                  <div className="flex">
                    <h2 className="      ">
                      <label className="font-semibold "> Request No:</label>{" "}
                      {request.requestNo}|{request.reasonOfRequest.slice(0, 30)}
                      {"....."}
                    </h2>
                    <button
                      onClick={() => toggleExpand(request.id)}
                      className="text-white cursor-pointer bg-green-500 hover:bg-green-700 rounded-lg h-6 w-24"
                    >
                      {expandedRequests.includes(request.id)
                        ? "Show Less"
                        : "Show More"}
                    </button>
                  </div>
                </tr>
              </td>
              {expandedRequests.includes(request.id) ? (
                <>
                  <div>
                    <tbody>
                      <tr>
                        {/* Request No and Date in one row */}
                        <td className="border-[1px]    border-b-1 py-2 px-4 border-gray-600">
                          <div className=" text-sm text-gray-900">
                            <label className="font-semibold ">
                              Request No:{" "}
                            </label>{" "}
                            {request.requestNo}
                          </div>
                        </td>

                        <td className="border-[1px] border-b-1 py-2 px-4  border-gray-600">
                          <div className=" text-sm text-gray-900">
                            <label className="font-semibold ">Date </label>{" "}
                            {request.date}
                          </div>
                        </td>
                      </tr>

                      <tr>
                        {/* Request No and Date in one row */}
                        <td className="border-[1px] border-b-1 py-2 px-4 border-gray-600">
                          <div className=" text-sm text-gray-900">
                            <label className="font-semibold ">
                              Requested By{" "}
                            </label>{" "}
                            {request.requestedBy}
                          </div>
                        </td>

                        <td className="border-[1px] border-b-1 py-2 px-4 border-gray-600">
                          <div className=" text-sm text-gray-900">
                            <label className="font-semibold ">
                              Request For
                            </label>{" "}
                            {request.requestFor}
                          </div>
                        </td>
                      </tr>

                      <tr>
                        {/* Request No and Date in one row */}
                        <td className="border-[1px] border-b-1 py-2 px-4 border-gray-600">
                          <div className=" text-sm text-gray-900">
                            <label className="font-semibold ">Department</label>{" "}
                            {request.department}
                          </div>
                        </td>

                        <td className="border-[1px] border-b-1 py-2 px-4 border-gray-600">
                          <div className=" text-sm text-gray-900">
                            <label className="font-semibold ">
                              Employee Id
                            </label>{" "}
                            {request.employeeId}
                          </div>
                        </td>
                      </tr>

                      <tr>
                        {/* Designation in a separate row */}
                        <td
                          colSpan={2}
                          className="border-[1px] border-b-1 py-2 px-4 border-gray-600"
                        >
                          <div className=" text-sm text-gray-900">
                            <label className="font-semibold ">
                              Designation
                            </label>{" "}
                            {request.designation}
                          </div>
                        </td>
                      </tr>

                      <tr>
                        {/* Reason of Request in a separate row */}
                        <td
                          colSpan={2}
                          className="border-[1px] border-b-1 py-2 px-4 border-gray-600"
                        >
                          <div className=" text-sm text-gray-900">
                            <label className="font-semibold ">
                              Reason Of Request
                            </label>{" "}
                            {request.reasonOfRequest}
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
                            <label className="font-semibold ">
                              Service Details
                            </label>{" "}
                            {request.serviceDetails}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </div>

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
                  <button
                    onClick={() => toggleExpand(request.id)}
                    className="text-blue-500 mt-2 cursor-pointer"
                  ></button>
                </>
              ) : (
                <button
                  onClick={() => toggleExpand(request.id)}
                  className="text-blue-500 cursor-pointer"
                ></button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServiceRequests;
