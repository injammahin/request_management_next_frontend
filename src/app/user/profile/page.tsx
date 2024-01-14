// src/app/user/profile/page.tsx

"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/app/components/navigation/page";
import LoadingSpinner from "@/app/components/loading/page";
import jsPDF from "jspdf";
import "jspdf-autotable";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface UserDetails {
  id: number | undefined;
  name: string | undefined;
  email: string | undefined;
}

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
  showFullForm: boolean;
}

interface UserWithServiceRequests extends UserDetails {
  serviceRequests?: ServiceRequest[];
}

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<UserWithServiceRequests | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(
    null
  );

  const router = useRouter();

  const handleBackButtonClick = () => {
    router.push("/dashboard");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log(localStorage.getItem("userId"));

        const response = await axios.get("http://localhost:3001/auth/profile", {
          headers: {
            id: `${localStorage.getItem("userId")}`,
          },
        });

        const fetchedUserData = response.data as UserWithServiceRequests;

        fetchedUserData.serviceRequests?.forEach((request) => {
          request.showFullForm = false;
        });

        setUserData(fetchedUserData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleShowFullForm = (request: ServiceRequest) => {
    setUserData((prevUserData) => {
      if (prevUserData) {
        const updatedRequests = prevUserData.serviceRequests?.map((r) =>
          r.id === request.id ? { ...r, showFullForm: !r.showFullForm } : r
        );
        return { ...prevUserData, serviceRequests: updatedRequests };
      }
      return null;
    });
  };

  const filteredServiceRequests = userData?.serviceRequests?.filter((request) =>
    request.requestNo.includes(searchQuery)
  );

  const toggleDeleteConfirmation = (requestId: number | null) => {
    setSelectedRequestId(requestId);
    setIsDeleteConfirmationOpen((prev) => !prev);
  };

  const handleDelete = async (id: number) => {
    toggleDeleteConfirmation(id);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3001/service-requests/${selectedRequestId}`
      );
      setUserData((prevUserData) => {
        if (prevUserData) {
          return {
            ...prevUserData,
            serviceRequests: prevUserData.serviceRequests?.filter(
              (request) => request.id !== selectedRequestId
            ),
          };
        }
        return null;
      });
    } catch (error) {
      console.error("Error deleting service request:", error);
    } finally {
      toggleDeleteConfirmation(null);
    }
  };

  const cancelDelete = () => {
    toggleDeleteConfirmation(null);
  };

  const handleDownloadPDF = (id: number) => {
    const doc = new jsPDF() as any;

    if (userData) {
      const selectedRequest = userData.serviceRequests?.find(
        (request) => request.id === id
      );

      if (selectedRequest) {
        doc.text("Service Request Details", 20, 20);
        doc.text(`Request No: ${selectedRequest.requestNo}`, 20, 30);
        doc.text(`Date: ${selectedRequest.date}`, 20, 40);
        doc.text(`Department: ${selectedRequest.department}`, 20, 50);
        doc.text(`Designation: ${selectedRequest.designation}`, 20, 60);
        doc.text(`Employee Id: ${selectedRequest.employeeId}`, 20, 70);
        doc.text(
          `Reason of Request: ${selectedRequest.reasonOfRequest}`,
          20,
          80
        );
        doc.text(`Request For: ${selectedRequest.requestFor}`, 20, 90);
        doc.text(`Requested By: ${selectedRequest.requestedBy}`, 20, 100);
        doc.text(`Service Details: ${selectedRequest.serviceDetails}`, 20, 110);

        doc.save(`service_request_${id}.pdf`);
      }
    }
  };

  if (!userData) {
    return <LoadingSpinner loading={isLoading} />;
  }

  return (
    <div>
      <Navbar />
      <div className="screen-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full bg-white p-8 rounded-lg shadow-md space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 text-center">
              Service Request
            </h2>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-700">
              <span className="font-bold">Your user ID is:</span> {userData.id}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-bold">Name:</span> {userData.name}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-bold">Email:</span> {userData.email}
            </p>
            {userData.serviceRequests &&
              userData.serviceRequests.length > 0 && (
                <div className="bg-gray-200 p-6 rounded-lg">
                  <h1 className="text-lg font-semibold mb-2">
                    Search your requested form
                  </h1>
                  <input
                    type="text"
                    placeholder="Search by Request No"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border p-2 mb-4"
                  />
                  {filteredServiceRequests &&
                  filteredServiceRequests.length > 0 ? (
                    <table className="w-full border-collapse  border border-gray-600">
                      <thead>
                        <tr>
                          <th className="border px-60">Request No</th>
                          <th className="border p-2">Show More</th>
                          <th className="border p-2">Delete</th>
                          <th className="border p-2">Edit</th>
                          <th className="border p-2">Download PDF</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredServiceRequests.map((request) => (
                          <React.Fragment key={request.id}>
                            <tr>
                              <td className="border p-2">
                                {request.requestNo}
                              </td>
                              <td className="border p-2">
                                <button
                                  onClick={() => toggleShowFullForm(request)}
                                  className="bg-[#43766C] rounded-lg h-8 w-28 hover:underline text-white"
                                >
                                  {request.showFullForm
                                    ? "Show Less"
                                    : "Show More"}
                                </button>
                              </td>
                              <td className="border p-2">
                                <button
                                  onClick={() => handleDelete(request.id)}
                                  className="bg-[#9A031E] rounded-lg h-8 w-28 hover:underline text-white"
                                >
                                  Delete
                                </button>
                              </td>
                              <td className="border p-2">
                                <button className="bg-[#4CB9E7] rounded-lg h-8 w-28">
                                  <a
                                    href="/user/updatedata"
                                    className="hover:underline text-white"
                                  >
                                    Edit Profile
                                  </a>
                                </button>
                              </td>
                              <td className="border p-2">
                                <button
                                  type="button"
                                  onClick={() => handleDownloadPDF(request.id)}
                                  className="bg-green-500 text-white h-8 w-32 rounded hover:bg-green-700"
                                >
                                  Download PDF
                                </button>
                              </td>
                            </tr>
                            {request.showFullForm && (
                              <div>
                                <table className="w-full">
                                  <tbody>
                                    <tr>
                                      {/* Request No and Date in one row */}
                                      <td className="border-2 border-b-4 py-2 px-4 border-gray-600">
                                        <div className="font-bold text-sm text-gray-900">
                                          Request No: {request.requestNo}
                                        </div>
                                      </td>

                                      <td className="border-2 border-b-4 py-2 px-4 border-gray-600">
                                        <div className="font-bold text-sm text-gray-900">
                                          Date: {request.date}
                                        </div>
                                      </td>
                                    </tr>

                                    <tr>
                                      {/* Request No and Date in one row */}
                                      <td className="border-2 border-b-4 py-2 px-4 border-gray-600">
                                        <div className="font-bold text-sm text-gray-900">
                                          Requested By: {request.requestedBy}
                                        </div>
                                      </td>

                                      <td className="border-2 border-b-4 py-2 px-4 border-gray-600">
                                        <div className="font-bold text-sm text-gray-900">
                                          Request For: {request.requestFor}
                                        </div>
                                      </td>
                                    </tr>

                                    <tr>
                                      {/* Request No and Date in one row */}
                                      <td className="border-2 border-b-4 py-2 px-4 border-gray-600">
                                        <div className="font-bold text-sm text-gray-900">
                                          Department: {request.department}
                                        </div>
                                      </td>

                                      <td className="border-2 border-b-4 py-2 px-4 border-gray-600">
                                        <div className="font-bold text-sm text-gray-900">
                                          Employee Id: {request.employeeId}
                                        </div>
                                      </td>
                                    </tr>

                                    <tr>
                                      {/* Designation in a separate row */}
                                      <td
                                        colSpan={2}
                                        className="border-2 border-b-4 py-2 px-4 border-gray-600"
                                      >
                                        <div className="font-bold text-sm text-gray-900">
                                          Designation: {request.designation}
                                        </div>
                                      </td>
                                    </tr>

                                    <tr>
                                      {/* Reason of Request in a separate row */}
                                      <td
                                        colSpan={2}
                                        className="border-2 border-b-4 py-2 px-4 border-gray-600"
                                      >
                                        <div className="font-bold text-sm text-gray-900">
                                          Reason of Request:{" "}
                                          {request.reasonOfRequest}
                                        </div>
                                      </td>
                                    </tr>

                                    <tr>
                                      {/* Service Details in a separate row */}
                                      <td
                                        colSpan={2}
                                        className="border-2 border-b-4 py-2 px-4 border-gray-600"
                                      >
                                        <div className="font-bold text-sm text-gray-900">
                                          Service Details:{" "}
                                          {request.serviceDetails}
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-sm text-gray-700">
                      No matching service requests found.
                    </p>
                  )}
                </div>
              )}
          </div>
          <div>
            <div className="flex justify-between">
              <button
                type="button"
                className="bg-gray-500 text-white p-2 w-32 rounded hover:bg-gray-700"
                onClick={handleBackButtonClick}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
      {isDeleteConfirmationOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-md">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to delete this request?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
