// src/app/user/profile/page.tsx

"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/app/components/navigation/page";
import Link from "next/link";
import LoadingSpinner from "@/app/components/loading/page";
import jsPDF from "jspdf";
import "jspdf-autotable";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth/profile", {
          headers: {
            id: `${localStorage.getItem("id")}`,
          },
        });

        const fetchedUserData = response.data as UserWithServiceRequests;

        // Initialize showFullForm property for each service request
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
    // Toggle the showFullForm property for the clicked request
    request.showFullForm = !request.showFullForm;
    setUserData((prevUserData) => {
      if (prevUserData) {
        // If prevUserData is not null, spread its properties and update serviceRequests
        return {
          ...prevUserData,
          serviceRequests: [...prevUserData.serviceRequests!], // Use the non-null assertion operator here
        };
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
      // Update state after successful deletion
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
    const doc = new jsPDF() as any; // Type assertion to bypass TypeScript error

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
              <span className="font-bold"> your user ID is :</span>{" "}
              {userData.id}
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
                    search your requested form
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
                    filteredServiceRequests.map((request) => (
                      <div
                        key={request.id}
                        className="mb-4 bg-white border-b-2 border-gray-300 p-4 relative"
                      >
                        <p className="text-sm text-gray-900">
                          <span className="font-bold">Request No:</span>{" "}
                          {request.requestNo}{" "}
                        </p>
                        {request.showFullForm && (
                          <form>
                            <>
                              <ul className="list-none">
                                <li className="border-b-2 border-gray-300 p-4">
                                  {/* Include the other details here */}
                                  <p className="text-sm text-gray-900">
                                    <span className="font-bold">Date:</span>{" "}
                                    {request.date} |{" "}
                                    <span className="font-bold">
                                      Department:
                                    </span>{" "}
                                    {request.department} |{" "}
                                    <span className="font-bold">
                                      Designation:
                                    </span>{" "}
                                    {request.designation} |{" "}
                                    <span className="font-bold">
                                      Employee Id:
                                    </span>{" "}
                                    {request.employeeId} |{" "}
                                    <span className="font-bold">
                                      Reason of Request:
                                    </span>{" "}
                                    {request.reasonOfRequest} |{" "}
                                    <span className="font-bold">
                                      Request For:
                                    </span>{" "}
                                    {request.requestFor} |{" "}
                                    <span className="font-bold">
                                      Requested By:
                                    </span>{" "}
                                    {request.requestedBy} |{" "}
                                    <span className="font-bold">
                                      Service Details:
                                    </span>{" "}
                                    {request.serviceDetails}
                                  </p>
                                </li>
                              </ul>
                            </>
                          </form>
                        )}
                        <div className="flex space-x-2">
                          <button
                            onClick={() => toggleShowFullForm(request)}
                            className="bg-[#43766C] rounded-lg h-8 w-28 hover:underline text-white"
                          >
                            {request.showFullForm ? "Show Less" : "Show More"}
                          </button>
                          <button
                            onClick={() => handleDelete(request.id)}
                            className="bg-[#9A031E] rounded-lg h-8 w-28 hover:underline text-white"
                          >
                            Delete
                          </button>
                          <button className="bg-[#4CB9E7] rounded-lg h-8 w-28">
                            <a href="/user/updatedata">
                              <a className=" hover:underline text-white">
                                Edit Profile
                              </a>
                            </a>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDownloadPDF(request.id)}
                            className="bg-green-500 text-white h-8 w-32 rounded hover:bg-green-700"
                          >
                            Download PDF
                          </button>
                        </div>
                      </div>
                    ))
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
                type="submit"
                className="bg-gray-500 text-white p-2 w-32 rounded hover:bg-gray-700"
              >
                <a href="/dashboard">Back</a>
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
