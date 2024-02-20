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
  head: string | number | readonly string[] | undefined;
  ciso: string | number | readonly string[] | undefined;
  superadmin: string | number | readonly string[] | undefined;
  id: number;
  requestNumber: string;
  subofChange: string;
  date: string;
  requestedBy: string;
  requesterName: string;
  EmployeeId: string;
  department: string;
  contractNo: string;
  MaintenanceType: string;
  purposeOfActivity: string;
  referenceServiceRequest: string;
  priority: string;
  impactLevel: string;
  requiredDowntime: string;
  mentionDowntime: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  ////////////////////////////////* part -2 *////////////////////////////////
  changeLocation: string;
  targetedSystemFor: string;
  IPaddress: string;
  ImpactedSystemform: string;
  DetailedDescriptionOfChange: string;
  DetailedWorkedPlanTask: string;
  DetailedWorkedPlanStartTime: string;
  DetailedWorkedPlanEndTime: string;
  RequirementTools: string;
  Implementationteam: string;
  Communication: string;
  RollBackPlan: string;
  checklistStatusOne: string;
  checklistStatusTwo: string;
  checklistStatusThree: string;
  checklistStatusFour: string;
  ////////////////////////////////* part -3 *////////////////////////////////
  ImpactedSystemfor: string;
  ActualPriority: string;
  Actualimpactlevel: string;
  ////////////////////////////////* part -4 *////////////////////////////////
  ExecusionTeamMenbers: string;
  ExecusionTeamleaders: string;
  ////////////////////////////////* part -5 *////////////////////////////////
  ChangeReviewForperformed: string;
  ChangeReviewForSuccess: string;
  ActualDowntime: string;
  WorkExecutionStatus: string;
  showFullForm?: boolean; // Added property for show/hide
  supervisorStatus: string;
  HeadOfDivisionStatus: string;
  cisoStatus: string;
  approvalStatus: string;
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
  const handleDetailsClick = (request: Maintenance) => {
    localStorage.setItem("selectedRequestDetails", JSON.stringify(request));
    window.location.href = "/user/edit_maintenance_request"; // Change to your details page path
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
                              onClick={() => handleDetailsClick(maintenance)}
                              className="bg-[#4CB9E7] rounded-lg h-6 w-24 text-white"
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
                              <tbody className="max-w-[1000px] pt-10  mx-auto mt-8  border">
                                <div className="text-center  border border-gray-600 ">
                                  <div className="bg-gray-300 flex justify-center items-center">
                                    <h1 className="p-1  font-bold text-sm">
                                      PART 1 : Initiator Information
                                    </h1>
                                  </div>
                                </div>
                                <div className="grid  grid-cols-2 gap-4 ">
                                  <div className="  flex flex-row items-center  ">
                                    <label className="font-semibold text-sm flex flex-none mr-2">
                                      Request Number:
                                    </label>
                                    <input
                                      type="text"
                                      name="requestNumber"
                                      id="requestNumber"
                                      value={maintenance.requestNumber} // Display requestNo
                                      readOnly
                                      className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    />
                                  </div>

                                  <div className="flex flex-row items-center">
                                    <label className="font-semibold flex flex-none text-sm mr-2">
                                      Date:
                                    </label>
                                    <input
                                      type="date"
                                      name="date"
                                      // onChange={handleInputChange}
                                      value={maintenance.date}
                                      className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                  <div className="flex flex-row items-center">
                                    <label className="font-semibold text-sm flex flex-none mr-2">
                                      Requested By:
                                    </label>
                                    <input
                                      type="text"
                                      name="requestedBy"
                                      // onChange={handleInputChange}
                                      value={maintenance.requestedBy}
                                      readOnly
                                      className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    />
                                  </div>

                                  <div className="flex flex-row items-center">
                                    <label className="font-semibold text-sm flex flex-none mr-2">
                                      Requester Name:
                                    </label>
                                    <input
                                      type="text"
                                      name="requesterName"
                                      // onChange={handleInputChange}
                                      value={maintenance.requesterName}
                                      className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 ">
                                  <div className="flex flex-row items-center">
                                    <label className="font-semibold text-sm flex flex-none mr-2">
                                      Subject Of Change:
                                    </label>
                                    <input
                                      type="text"
                                      name="subofChange"
                                      // onChange={handleInputChange}
                                      value={maintenance.subofChange}
                                      className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    />
                                  </div>

                                  <div className="flex flex-row items-center">
                                    <label className="font-semibold text-sm flex flex-none mr-2">
                                      Employee Id:
                                    </label>
                                    <input
                                      type="text"
                                      id=""
                                      name="EmployeeId"
                                      // onChange={handleInputChange}
                                      readOnly
                                      value={maintenance.EmployeeId}
                                      className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                  <div className="flex flex-row items-center">
                                    <label className="font-semibold text-sm flex flex-none mr-2">
                                      Department:
                                    </label>
                                    <input
                                      type="text"
                                      name="department"
                                      // onChange={handleInputChange}
                                      readOnly
                                      value={maintenance.department}
                                      className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    />
                                  </div>
                                  <div className="flex flex-row items-center">
                                    <label className="font-semibold text-sm flex flex-none mr-2">
                                      Contract No:
                                    </label>
                                    <input
                                      type="text"
                                      name="contractNo"
                                      // onChange={handleInputChange}
                                      value={maintenance.contractNo}
                                      className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    />
                                  </div>
                                </div>
                                {/* //////////// */}
                                <div className="grid grid-cols-2 gap-4 ">
                                  <div className="flex flex-row items-center">
                                    <label className="font-semibold text-sm flex flex-none">
                                      Maintenance Type:
                                    </label>
                                    <input
                                      type="text"
                                      name="MaintenanceType"
                                      // onChange={handleInputChange}
                                      value={maintenance.MaintenanceType}
                                      className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    />
                                  </div>
                                  {/* <div className="flex flex-row items-center">
              <label className="font-semibold text-sm flex flex-none mr-2">
                Ref. Service Request:
              </label>
              <input
                type="text"
                name="MaintenanceType"
                onChange={handleInputChange}
                value={Management.MaintenanceType}
                className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </div> */}
                                  <div className="flex flex-row items-center">
                                    <label
                                      htmlFor="requestNumber"
                                      className="font-semibold text-sm flex flex-none mr-2"
                                    >
                                      Ref. Service Request:
                                    </label>
                                  </div>
                                </div>
                                {/* //////////// */}
                                <div className="flex flex-row items-center">
                                  <label className="font-semibold text-sm flex flex-none mr-2">
                                    purpose Of Activity:
                                  </label>
                                  <input
                                    type="text"
                                    name="purposeOfActivity"
                                    value={maintenance.purposeOfActivity}
                                    className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                  />
                                </div>
                                {/* //////////// */}
                                <div className="grid grid-cols-2 ">
                                  <div className="flex flex-row items-center">
                                    <label className="font-semibold text-sm flex flex-none mr-2">
                                      Priority:
                                    </label>
                                    <input
                                      type="text"
                                      name="priority"
                                      value={maintenance.priority}
                                      className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    />
                                  </div>
                                  {/* //////////// */}
                                  <div className="flex flex-row items-center">
                                    <label className="font-semibold text-sm flex flex-none mr-2">
                                      Impact Level:
                                    </label>
                                    <input
                                      type="text"
                                      name="impactLevel"
                                      value={maintenance.impactLevel}
                                      className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    />
                                  </div>
                                </div>
                                {/* //////////// */}
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                  <div className="flex flex-row items-center">
                                    <label className="font-semibold text-sm flex flex-none mr-2">
                                      required Downtime:
                                    </label>
                                    <input
                                      type="text"
                                      name="requiredDowntime"
                                      value={maintenance.requiredDowntime}
                                      className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    />
                                  </div>
                                  {/* //////////// */}
                                  <div className="flex flex-row items-center">
                                    <label className="font-semibold text-sm flex flex-none mr-2">
                                      Mention Downtime:
                                    </label>
                                    <input
                                      type="text"
                                      name="mentionDowntime"
                                      value={maintenance.mentionDowntime}
                                      className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    />
                                  </div>
                                </div>
                                {/* //////////// */}
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                  <div className="flex flex-row items-center">
                                    <label className="font-semibold text-sm flex flex-none mr-2">
                                      Start Date:
                                    </label>
                                    <input
                                      type="text"
                                      name="startDate"
                                      value={maintenance.startDate}
                                      className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    />
                                  </div>
                                  {/* //////////// */}
                                  <div className="flex flex-row items-center">
                                    <label className="font-semibold text-sm flex flex-none mr-2">
                                      start Time:
                                    </label>
                                    <input
                                      type="text"
                                      name="startTime"
                                      value={maintenance.startTime}
                                      className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    />
                                  </div>
                                </div>
                                {/* //////////// */}
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                  <div className="flex flex-row items-center">
                                    <label className="font-semibold text-sm flex flex-none mr-2">
                                      End Date:
                                    </label>
                                    <input
                                      type="text"
                                      name="endDate"
                                      value={maintenance.endDate}
                                      className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    />
                                  </div>
                                  {/* //////////// */}
                                  <div className="flex flex-row items-center">
                                    <label className="font-semibold text-sm flex flex-none mr-2">
                                      End Time:
                                    </label>
                                    <input
                                      type="text"
                                      name="endTime"
                                      value={maintenance.endTime}
                                      className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    />
                                  </div>
                                </div>
                                <div className="text-center  border border-gray-600 ">
                                  <div className="bg-gray-300 flex justify-center items-center">
                                    <h1 className="p-1  font-bold text-sm">
                                      PART 2 : Change Preview
                                    </h1>
                                  </div>
                                </div>
                                {/* /////// */}
                                <div className="flex flex-row items-center">
                                  <label className="font-semibold text-sm flex flex-none mr-2">
                                    Change Location:
                                  </label>
                                  <input
                                    type="text"
                                    name="changeLocation"
                                    value={maintenance.changeLocation}
                                    className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                  />
                                </div>
                                {/* ////////////////// */}
                                <div className="flex flex-row items-center">
                                  <label className="font-semibold text-sm flex flex-none mr-2">
                                    Targeted System For:
                                  </label>
                                  <input
                                    type="text"
                                    name="targetedSystemFor"
                                    value={maintenance.targetedSystemFor}
                                    className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                  />
                                </div>
                                <div className="flex flex-row items-center">
                                  <label className="font-semibold text-sm flex flex-none mr-2">
                                    IP address:
                                  </label>
                                  <input
                                    type="text"
                                    name="IPaddress"
                                    value={maintenance.IPaddress}
                                    className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                  />
                                </div>
                                <div className="flex flex-row items-center">
                                  <label className="font-semibold text-sm flex flex-none mr-2">
                                    Impacted System For:
                                  </label>
                                  <input
                                    type="text"
                                    name="ImpactedSystemfor"
                                    value={maintenance.ImpactedSystemfor}
                                    className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                  />
                                </div>
                                <div className="flex flex-row items-center">
                                  <label className="font-semibold text-sm flex flex-none mr-2">
                                    Detailed Description Of Change /
                                    Maintenance:
                                  </label>
                                  <input
                                    type="text"
                                    name="DetailedDescriptionOfChange"
                                    value={
                                      maintenance.DetailedDescriptionOfChange
                                    }
                                    className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                  />
                                </div>
                                <div className="text-center  border border-gray-600 ">
                                  <div className="bg-gray-300 flex justify-center items-center">
                                    <h1 className="p-1  font-bold text-sm">
                                      PART 3 : Review And Approval
                                    </h1>
                                  </div>
                                </div>
                                {/* //////////////////////////////// */}
                                <div className="grid  grid-cols-3  ">
                                  <div className="border  p-1 border-gray-600 font-bold text-sm flex flex-none">
                                    TasK
                                  </div>
                                  <div className="border  p-1 border-gray-600 font-bold text-sm flex flex-none">
                                    Start Time
                                  </div>
                                  <div className="border  p-1 border-gray-600 font-bold text-sm flex flex-none">
                                    End Time
                                  </div>
                                  <div className="border  p-1 border-gray-600 font-bold text-sm flex flex-none">
                                    Take Backup Of Database
                                  </div>
                                  <div className="flex flex-row items-center border border-gray-600 pl-2">
                                    <label className="font-semibold text-sm flex flex-none mr-2 "></label>
                                    <input
                                      type="text"
                                      name="DetailedDescriptionOfChange"
                                      value={
                                        maintenance.DetailedWorkedPlanStartTime
                                      }
                                      className="block w-full  py-1  px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    />
                                  </div>
                                  <div className="flex flex-row items-center border border-gray-600 pl-2">
                                    <label className="font-semibold text-sm flex flex-none mr-2"></label>
                                    <input
                                      type="text"
                                      name="DetailedDescriptionOfChange"
                                      value={
                                        maintenance.DetailedWorkedPlanEndTime
                                      }
                                      className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    />
                                  </div>
                                </div>

                                {/* //////////////////////////////////////////////////////////////// */}
                                <div className="flex flex-row items-center  pl-2">
                                  <label className="font-semibold text-sm flex flex-none mr-2">
                                    {" "}
                                    Requirements( Support.Tools )
                                  </label>
                                  <input
                                    type="text"
                                    name="RequirementTools"
                                    value={maintenance.RequirementTools}
                                    className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                  />
                                </div>
                                <div className="flex flex-row items-center  pl-2">
                                  <label className="font-semibold text-sm flex flex-none mr-2">
                                    Implementation Team
                                  </label>
                                  <input
                                    type="text"
                                    name="Implementationteam"
                                    value={maintenance.Implementationteam}
                                    className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                  />
                                </div>
                                <div className="flex flex-row items-center  pl-2">
                                  <label className="font-semibold text-sm flex flex-none mr-2">
                                    Communication( Deoendent Person)
                                  </label>
                                  <input
                                    type="text"
                                    name="Communication"
                                    value={maintenance.Communication}
                                    className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                  />
                                </div>
                                <div className="flex flex-row items-center  pl-2">
                                  <label className="font-semibold text-sm flex flex-none mr-2">
                                    Roll Back Plan( If failure)
                                  </label>
                                  <input
                                    type="text"
                                    name="RollBackPlan"
                                    value={maintenance.RollBackPlan}
                                    className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                  />
                                </div>

                                <div className="text-center  border border-gray-600 ">
                                  <div className="bg-gray-300 flex justify-center items-center">
                                    <h1 className="p-1  font-bold text-sm">
                                      Change Checklist
                                    </h1>
                                  </div>
                                </div>
                                <div className="grid  grid-cols-4  ">
                                  <div className="border p-1 text-center border-gray-600 font-bold text-sm flex flex-none">
                                    Status
                                  </div>
                                  <div className="border p-1 text-center border-gray-600 font-bold text-sm flex flex-none">
                                    Task
                                  </div>
                                  <div className="border p-1 text-center border-gray-600 font-bold text-sm flex flex-none">
                                    Status
                                  </div>
                                  <div className="border p-1 text-center border-gray-600 font-bold text-sm flex flex-none">
                                    Task
                                  </div>

                                  <div className="border p-1 text-center border-gray-600 font-none text-sm flex flex-none">
                                    Is the Change Test Performed ?
                                  </div>
                                  <div className="flex flex-row items-center border border-gray-600 pl-2">
                                    <label className="font-semibold text-sm flex flex-none mr-2"></label>
                                    <select
                                      name="checklistStatusOne"
                                      value={maintenance.checklistStatusOne}
                                      className="block w-full py-1 px-3 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    >
                                      <option value="">( Select )</option>
                                      <option value="Yes">Yes</option>
                                      <option value="No">No</option>
                                    </select>
                                  </div>

                                  <div className="border p-1 text-center border-gray-600  text-sm flex flex-none ">
                                    Is The Communication maintained ?
                                  </div>
                                  <div className="flex flex-row  border border-gray-600 pl-2">
                                    <label className="font-none text-sm flex flex-none mr-2"></label>
                                    <select
                                      name="checklistStatusTwo"
                                      value={maintenance.checklistStatusTwo}
                                      className="block w-full py-1 px-3 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    >
                                      <option value="">( Select )</option>
                                      <option value="Yes">Yes</option>
                                      <option value="No">No</option>
                                    </select>
                                  </div>
                                  {/* ////// */}
                                  <div className="border p-1 text-center border-gray-600 font-none text-sm flex flex-none">
                                    Is the Back Up Token Of The System?
                                  </div>
                                  <div className="flex flex-row items-center border border-gray-600 pl-2">
                                    <label className="font-semibold text-sm flex flex-none mr-2"></label>
                                    <select
                                      name="checklistStatusThree"
                                      value={maintenance.checklistStatusThree}
                                      className="block w-full py-1 px-3 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    >
                                      <option value="">( Select )</option>
                                      <option value="Yes">Yes</option>
                                      <option value="No">No</option>
                                    </select>
                                  </div>

                                  <div className="border p-1 text-center border-gray-600  text-sm flex flex-none ">
                                    Is The Change Identifid Stable ?
                                  </div>
                                  <div className="flex flex-row  border border-gray-600 pl-2">
                                    <label className="font-none text-sm flex flex-none mr-2"></label>
                                    <select
                                      name="checklistStatusFour"
                                      value={maintenance.checklistStatusFour}
                                      className="block w-full py-1 px-3 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    >
                                      <option value="">( Select )</option>
                                      <option value="Yes">Yes</option>
                                      <option value="No">No</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="flex flex-row items-center  pl-2">
                                  <label className="font-semibold text-sm flex flex-none mr-2">
                                    Impacted System For
                                  </label>
                                  <input
                                    type="text"
                                    name="ImpactedSystemfor"
                                    value={maintenance.ImpactedSystemfor}
                                    className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                  />
                                </div>
                                <div className="text-center  border border-gray-600 ">
                                  <div className="bg-gray-300 flex justify-center items-center">
                                    <h1 className="p-1  font-bold text-sm">
                                      PART 4 : Executor Information
                                    </h1>
                                  </div>
                                </div>
                                <div className=" grid grid-cols-2">
                                  <div className="flex flex-row items-center  pl-2">
                                    <label className="font-semibold text-sm flex flex-none mr-2">
                                      Actual Priority
                                    </label>
                                    <input
                                      type="text"
                                      name="ActualPriority"
                                      value={maintenance.ActualPriority}
                                      className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    />
                                  </div>
                                  <div className="flex flex-row items-center  pl-2">
                                    <label className="font-semibold text-sm flex flex-none mr-2">
                                      Actual Impact Level
                                    </label>
                                    <input
                                      type="text"
                                      name="Actualimpactlevel"
                                      value={maintenance.Actualimpactlevel}
                                      className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    />
                                  </div>
                                </div>
                                <div className="grid grid-cols-4  ">
                                  <div className=" flex items-center border border-gray-700">
                                    <label className="font-semibold  flex flex-none text-sm mr-2 mx-[px]">
                                      (TEAM LEADER) :
                                    </label>
                                    <input
                                      type="text"
                                      name="revokeBy"
                                      // onChange={handleInputChange}
                                      readOnly
                                      value={maintenance.ciso}
                                      className="block w-full py-2.5 px-0 text-sm   underline-offset-4 text-gray-900 bg-transparent text-center border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer "
                                    />
                                  </div>
                                  <div className=" flex items-center border border-gray-700">
                                    <label className="font-semibold  flex flex-none text-sm mr-2 mx-[px]">
                                      (HEAD 0F IRFA) :
                                    </label>
                                    <input
                                      type="text"
                                      name="revokeBy"
                                      // onChange={handleInputChange}
                                      readOnly
                                      value={maintenance.superadmin}
                                      className="block w-full py-2.5 px-0 text-sm   underline-offset-4 text-gray-900 bg-transparent text-center border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer "
                                    />
                                  </div>
                                  <div className=" flex items-center border border-gray-700">
                                    <label className="font-semibold  flex flex-none text-sm mr-2 mx-[px]">
                                      (CISO) :
                                    </label>
                                    <input
                                      type="text"
                                      name="revokeBy"
                                      // onChange={handleInputChange}
                                      readOnly
                                      value={maintenance.ciso}
                                      className="block w-full py-2.5 px-0 text-sm  underline-offset-4 text-gray-900 bg-transparent text-center border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer "
                                    />
                                  </div>
                                  <div className=" flex items-center border border-gray-700">
                                    <label className="font-semibold  flex flex-none text-sm mr-2 mx-[px]">
                                      (HEAD) :
                                    </label>
                                    <input
                                      type="text"
                                      name="revokeBy"
                                      // onChange={handleInputChange}
                                      readOnly
                                      value={maintenance.head}
                                      className="block w-full py-2.5 px-0 text-sm   underline-offset-4 text-gray-900 bg-transparent text-center border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer "
                                    />
                                  </div>
                                </div>
                                <div className="text-center  border border-gray-600 ">
                                  <div className="bg-gray-300 flex justify-center items-center">
                                    <h1 className="p-1  font-bold text-sm">
                                      PART 5 : Change Review
                                    </h1>
                                  </div>
                                </div>
                                <div className="flex flex-row items-center  pl-2">
                                  <label className="font-semibold text-sm flex flex-none mr-2">
                                    Execusion Team Menbers
                                  </label>

                                  <input
                                    type="text"
                                    name="ExecusionTeamMenbers"
                                    value={maintenance.ExecusionTeamMenbers}
                                    className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                  />
                                  <label className="font-semibold text-sm flex flex-none mr-2">
                                    Execusion Team Leaders:
                                  </label>

                                  {maintenance.ExecusionTeamleaders}
                                </div>
                                {/* ////////////////////////////////////////////// */}
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
