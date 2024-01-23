// src/app/user/profile/page.tsx

// Import statements
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/app/components/navigation/page";
import LoadingSpinner from "@/app/components/loading/page";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Link from "next/link";

interface UserDetails {
  id: number | undefined;
  name: string | undefined;
  email: string | undefined;
  maintenances?: Maintenance[];
}

interface Maintenance {
  id: number;
  EmployeeId: string;
  MaintenanceType: string;
  contractNo: string;
  date: string;
  department: string;
  endDate: string;
  endTime: string;
  impactLevel: string;
  mentionDowntime: string;
  priority: string;
  purposeOfActivity: string;
  requestNumber: string;
  requesterName: string;
  requiredDowntime: string;
  startDate: string;
  startTime: string;
  subofChange: string;
  showFullForm?: boolean; // Added property for show/hide
}

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(
    null
  );
  const handleMenuToggle = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth/profile", {
          headers: {
            id: `${localStorage.getItem("userId")}`,
          },
        });

        const fetchedUserData = response.data as UserDetails;

        // Initialize showFullForm property for each maintenance request
        fetchedUserData.maintenances?.forEach((maintenance) => {
          maintenance.showFullForm = false;
        });

        setUserData(fetchedUserData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleShowFullForm = (maintenance: Maintenance) => {
    setUserData((prevUserData) => {
      if (prevUserData) {
        const updatedMaintenances = prevUserData.maintenances?.map((m) =>
          m.id === maintenance.id ? { ...m, showFullForm: !m.showFullForm } : m
        );
        return { ...prevUserData, maintenances: updatedMaintenances };
      }
      return null;
    });
  };

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
        `http://localhost:3001/maintaintance/${selectedRequestId}`
      );
      setUserData((prevUserData) => {
        if (prevUserData) {
          return {
            ...prevUserData,
            maintenances: prevUserData.maintenances?.filter(
              (maintenance) => maintenance.id !== selectedRequestId
            ),
          };
        }
        return null;
      });
    } catch (error) {
      console.error("Error deleting maintenance request:", error);
    } finally {
      toggleDeleteConfirmation(null);
    }
  };

  const handleEditMaintenanceRequest = (id: number) => {
    // Add the logic to navigate to the edit page for maintenance request
    // router.push(`/user/editmaintenance?requestId=${id}`);
  };

  const handleDownloadPDF = (id: number) => {
    if (userData) {
      const selectedMaintenance = userData.maintenances?.find(
        (maintenance) => maintenance.id === id
      );

      if (selectedMaintenance) {
        const tableHtml = `
          <table border="4">
            <thead>
              <tr>
                <th>Request Number</th>
                <th>Employee ID</th>
                <th>Maintenance Type</th>
                <th>Contract No</th>
                <th>Date</th>
                <th>Department</th>
                <th>Start Date</th>
                <th>Start Time</th>
                <th>End Date</th>
                <th>End Time</th>
                <th>Impact Level</th>
                <th>Mention Downtime</th>
                <th>Priority</th>
                <th>Purpose of Activity</th>
                <th>Requester Name</th>
                <th>Required Downtime</th>
                <th>Sub of Change</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${selectedMaintenance.requestNumber}</td>
                <td>${selectedMaintenance.EmployeeId}</td>
                <td>${selectedMaintenance.MaintenanceType}</td>
                <td>${selectedMaintenance.contractNo}</td>
                <td>${selectedMaintenance.date}</td>
                <td>${selectedMaintenance.department}</td>
                <td>${selectedMaintenance.startDate}</td>
                <td>${selectedMaintenance.startTime}</td>
                <td>${selectedMaintenance.endDate}</td>
                <td>${selectedMaintenance.endTime}</td>
                <td>${selectedMaintenance.impactLevel}</td>
                <td>${selectedMaintenance.mentionDowntime}</td>
                <td>${selectedMaintenance.priority}</td>
                <td>${selectedMaintenance.purposeOfActivity}</td>
                <td>${selectedMaintenance.requesterName}</td>
                <td>${selectedMaintenance.requiredDowntime}</td>
                <td>${selectedMaintenance.subofChange}</td>
              </tr>
            </tbody>
          </table>
        `;

        // Convert HTML to Blob
        const blob = new Blob([tableHtml], { type: "text/html/pdf" });

        // Create a download link
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `maintenance_request_${id}.html`;

        // Trigger the download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  if (!userData) {
    return <LoadingSpinner loading={isLoading} />;
  }

  return (
    <div
      className={`bg-gray-100 min-h-screen ${isMenuOpen ? "menu-open" : ""}`}
    >
      <Navbar userRole={"user"} onMenuToggle={handleMenuToggle} />
      <div
        className={`container mx-auto p-6 ${
          isMenuOpen ? "translate-x-[200px]" : ""
        }`}
      >
        <div className="w-full pt-20 bg-white p-8 rounded-lg shadow-md space-y-8">
          <div className="bg-gray-200 p-6 rounded-lg">
            <h1 className="text-lg font-semibold mb-2">
              Maintenance Information
            </h1>
            <input
              type="text"
              placeholder="Search by Request Number"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-[1px] p-2 mb-4"
            />
            {userData.maintenances && userData.maintenances.length > 0 ? (
              <div className="table-responsive">
                <table className="w-full border-collapse border border-gray-600">
                  <thead>
                    <tr>
                      <th className="border-[1px] px-60 border-gray-600">
                        Request Number
                      </th>
                      <th className="border-1 p-2 border-gray-600">
                        Show More
                      </th>
                      <th className="border-[1px] p-2 border-gray-600">
                        Delete
                      </th>
                      <th className="border-[1px] p-2 border-gray-600">Edit</th>
                      <th className="border-[1px] p-2 border-gray-600">
                        Download PDF
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.maintenances.map((maintenance) => (
                      <React.Fragment key={maintenance.id}>
                        <tr>
                          <td className="border-[1px] p-2 border-gray-600">
                            {maintenance.requestNumber}
                          </td>
                          <td className="border-[1px] p-2 border-gray-600">
                            <button
                              onClick={() => toggleShowFullForm(maintenance)}
                              className="bg-[#43766C] rounded-lg h-8 w-28 hover:underline text-white"
                            >
                              {maintenance.showFullForm
                                ? "Show Less"
                                : "Show More"}
                            </button>
                          </td>
                          <td className="border-[1px] p-2 border-gray-600">
                            <button
                              onClick={() => handleDelete(maintenance.id)}
                              className="bg-[#9A031E] rounded-lg h-8 w-28 hover:underline text-white"
                            >
                              Delete
                            </button>
                          </td>
                          <td className="border-[1px] p-2 border-gray-600">
                            <button
                              onClick={() =>
                                handleEditMaintenanceRequest(maintenance.id)
                              }
                              className="bg-[#4CB9E7] rounded-lg h-8 w-28 text-white"
                            >
                              Edit
                            </button>
                          </td>
                          <td className="border-[1px] p-2 border-gray-600">
                            <button
                              type="button"
                              onClick={() => handleDownloadPDF(maintenance.id)}
                              className="bg-green-500 text-white h-8 w-32 rounded hover:bg-green-700"
                            >
                              Download PDF
                            </button>
                          </td>
                        </tr>
                        {maintenance.showFullForm && (
                          <div>
                            <table className="w-full  bg-gray-100">
                              <tbody>
                                <tr>
                                  {/* Request No and Date in one row */}
                                  <td className="border-[1px] border-b-1 py-2 px-4 border-gray-600">
                                    <div className="font-semibold text-sm text-gray-900">
                                      Request Number:{" "}
                                      {maintenance.requestNumber}
                                    </div>
                                  </td>

                                  <td className="border-[1px] border-b-1 py-2 px-4 border-gray-600">
                                    <div className="font-semibold text-sm text-gray-900">
                                      Request Date: {maintenance.date}
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  {/* Request No and Date in one row */}
                                  <td className="border-[1px] border-b-1 py-2 px-4 border-gray-600">
                                    <div className="font-semibold text-sm text-gray-900">
                                      Requested Name:{" "}
                                      {maintenance.requesterName}
                                    </div>
                                  </td>

                                  <td className="border-[1px] border-b-1 py-2 px-4 border-gray-600">
                                    <div className="font-semibold text-sm text-gray-900">
                                      Employee Id: {maintenance.EmployeeId}
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  {/* Request No and Date in one row */}
                                  <td className="border-[1px] border-b-1 py-2 px-4 border-gray-600">
                                    <div className="font-semibold text-sm text-gray-900">
                                      Department: {maintenance.department}
                                    </div>
                                  </td>

                                  <td className="border-[1px] border-b-1 py-2 px-4 border-gray-600">
                                    <div className="font-semibold text-sm text-gray-900">
                                      contractNo: {maintenance.contractNo}
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
                                      priority: {maintenance.priority}
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
                                      impactLevel: {maintenance.impactLevel}
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
                                      purposeOfActivity:{" "}
                                      {maintenance.purposeOfActivity}
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
              </div>
            ) : (
              <p className="text-sm text-gray-700">
                No maintenance information found.
              </p>
            )}
          </div>
        </div>
      </div>
      {isDeleteConfirmationOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-md">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to delete this maintenance request?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={() => toggleDeleteConfirmation(null)}
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
