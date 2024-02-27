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
import Modal from "@/app/components/modal/Modal";
import Delete from "/public/delete.svg";
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
  const [maintenance, setmaintenance] = useState<Maintenance | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const handleShowMore = (maintenance: Maintenance) => {
    setmaintenance(maintenance);
    setIsModalOpen(true);
  };

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
                      <th className="border-[1px] flex-auto font-semi-bold  px-50 border-gray-600">
                        Request Number
                      </th>
                      <th className="border-1 p-1 font-semi-bold  border-gray-600">
                        Show More
                      </th>
                      <th className="border-[1px] p-1 font-semi-bold  border-gray-600">
                        Delete
                      </th>
                      <th className="border-[1px] p-2 font-semi-bold  border-gray-600">
                        Edit
                      </th>
                      <th className="border-[1px] p-2 font-semi-bold  border-gray-600">
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
                            <td className=" p-2 border-gray-600">
                              <button
                                onClick={() => handleShowMore(maintenance)}
                                className=" rounded-lg h-8 w-28 hover:underline text-white flex items-center justify-center space-x-1"
                              >
                                <img
                                  src="/show-all.svg"
                                  alt="Delete Icon"
                                  className="h-8 w-8"
                                />
                                <span></span>
                              </button>
                            </td>
                          </td>
                          <td className="border-[1px] p-2 border-gray-600">
                            <button
                              onClick={() => handleDelete(maintenance.id)}
                              className=" rounded-lg h-8 w-28 hover:underline text-white flex items-center justify-center space-x-1"
                            >
                              <img
                                src="/delete.svg"
                                alt="Delete Icon"
                                className="h-8 w-8"
                              />
                              <span></span>
                            </button>
                          </td>
                          <td className="border-[1px] p-2 border-gray-600">
                            <button
                              onClick={() => handleDetailsClick(maintenance)}
                              className=" rounded-lg h-8 w-28 hover:underline text-white flex items-center justify-center space-x-1"
                            >
                              <img
                                src="/editt.svg"
                                alt="Delete Icon"
                                className="h-10 w-10"
                              />
                              <span></span>
                            </button>
                          </td>
                          <td className="border-[1px] p-2 border-gray-600">
                            <button
                              onClick={() => handleDownloadPDF(maintenance.id)}
                              className=" rounded-lg h-8 w-28 hover:underline text-white flex items-center justify-center space-x-1"
                            >
                              <img
                                src="/download-pdf.svg"
                                alt="Delete Icon"
                                className="h-8 w-8"
                              />
                              <span></span>
                            </button>
                          </td>
                        </tr>
                        {isModalOpen && maintenance && (
                          <Modal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                          >
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
                                  <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                    {maintenance.requestNumber}
                                  </div>
                                </div>

                                <div className="flex flex-row items-center">
                                  <label className="font-semibold flex flex-none text-sm mr-2">
                                    Date:
                                  </label>
                                  <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                    {maintenance.date}
                                  </div>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="flex flex-row items-center">
                                  <label className="font-semibold text-sm flex flex-none mr-2">
                                    Requested By:
                                  </label>
                                  <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                    {maintenance.requestedBy}
                                  </div>
                                </div>

                                <div className="flex flex-row items-center">
                                  <label className="font-semibold text-sm flex flex-none mr-2">
                                    Requester Name:
                                  </label>
                                  <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                    {maintenance.requesterName}
                                  </div>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4 ">
                                <div className="flex flex-row items-center">
                                  <label className="font-semibold text-sm flex flex-none mr-2">
                                    Subject Of Change:
                                  </label>
                                  <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                    {maintenance.subofChange}
                                  </div>
                                </div>

                                <div className="flex flex-row items-center">
                                  <label className="font-semibold text-sm flex flex-none mr-2">
                                    Employee Id:
                                  </label>
                                  <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                    {maintenance.EmployeeId}
                                  </div>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="flex flex-row items-center">
                                  <label className="font-semibold text-sm flex flex-none mr-2">
                                    Department:
                                  </label>
                                  <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                    {maintenance.department}
                                  </div>
                                </div>
                                <div className="flex flex-row items-center">
                                  <label className="font-semibold text-sm flex flex-none mr-2">
                                    Contract No:
                                  </label>
                                  <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                    {maintenance.contractNo}
                                  </div>
                                </div>
                              </div>
                              {/* //////////// */}
                              <div className="grid grid-cols-2 gap-4 ">
                                <div className="flex flex-row items-center">
                                  <label className="font-semibold text-sm flex flex-none">
                                    Maintenance Type:
                                  </label>
                                  <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                    {maintenance.MaintenanceType}
                                  </div>
                                </div>
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
                                <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                  {maintenance.purposeOfActivity}
                                </div>
                              </div>
                              {/* //////////// */}
                              <div className="grid grid-cols-2 ">
                                <div className="flex flex-row items-center">
                                  <label className="font-semibold text-sm flex flex-none mr-2">
                                    Priority:
                                  </label>
                                  <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                    {maintenance.priority}
                                  </div>
                                </div>
                                {/* //////////// */}
                                <div className="flex flex-row items-center">
                                  <label className="font-semibold text-sm flex flex-none mr-2">
                                    Impact Level:
                                  </label>
                                  <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                    {maintenance.impactLevel}
                                  </div>
                                </div>
                              </div>
                              {/* //////////// */}
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="flex flex-row items-center">
                                  <label className="font-semibold text-sm flex flex-none mr-2">
                                    required Downtime:
                                  </label>
                                  <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                    {maintenance.requiredDowntime}
                                  </div>
                                </div>
                                {/* //////////// */}
                                <div className="flex flex-row items-center">
                                  <label className="font-semibold text-sm flex flex-none mr-2">
                                    Mention Downtime:
                                  </label>
                                  <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                    {maintenance.mentionDowntime}
                                  </div>
                                </div>
                              </div>
                              {/* //////////// */}
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="flex flex-row items-center">
                                  <label className="font-semibold text-sm flex flex-none mr-2">
                                    Start Date:
                                  </label>
                                  <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                    {maintenance.startDate}
                                  </div>
                                </div>
                                {/* //////////// */}
                                <div className="flex flex-row items-center">
                                  <label className="font-semibold text-sm flex flex-none mr-2">
                                    start Time:
                                  </label>
                                  <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                    {maintenance.startTime}
                                  </div>
                                </div>
                              </div>
                              {/* //////////// */}
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="flex flex-row items-center">
                                  <label className="font-semibold text-sm flex flex-none mr-2">
                                    End Date:
                                  </label>
                                  <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                    {maintenance.endDate}
                                  </div>
                                </div>
                                {/* //////////// */}
                                <div className="flex flex-row items-center">
                                  <label className="font-semibold text-sm flex flex-none mr-2">
                                    End Time:
                                  </label>
                                  <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                    {maintenance.endTime}
                                  </div>
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
                                <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                  {maintenance.changeLocation}
                                </div>
                              </div>
                              {/* ////////////////// */}
                              <div className="flex flex-row items-center">
                                <label className="font-semibold text-sm flex flex-none mr-2">
                                  Targeted System For:
                                </label>
                                <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                  {maintenance.targetedSystemFor}
                                </div>
                              </div>
                              <div className="flex flex-row items-center">
                                <label className="font-semibold text-sm flex flex-none mr-2">
                                  IP address:
                                </label>
                                <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                  {maintenance.IPaddress}
                                </div>
                              </div>
                              <div className="flex flex-row items-center">
                                <label className="font-semibold text-sm flex flex-none mr-2">
                                  Impacted System For:
                                </label>
                                <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                  {maintenance.ImpactedSystemfor}
                                </div>
                              </div>
                              <div className="flex flex-row items-center">
                                <label className="font-semibold text-sm flex flex-none mr-2">
                                  Detailed Description Of Change / Maintenance:
                                </label>
                                <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                  {maintenance.DetailedDescriptionOfChange}
                                </div>
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
                                  <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                    {maintenance.DetailedWorkedPlanStartTime}
                                  </div>
                                </div>
                                <div className="flex flex-row items-center border border-gray-600 pl-2">
                                  <label className="font-semibold text-sm flex flex-none mr-2"></label>
                                  <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                    {maintenance.DetailedWorkedPlanEndTime}
                                  </div>
                                </div>
                              </div>

                              {/* //////////////////////////////////////////////////////////////// */}
                              <div className="flex flex-row items-center  pl-2">
                                <label className="font-semibold text-sm flex flex-none mr-2">
                                  {" "}
                                  Requirements( Support.Tools )
                                </label>
                                <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                  {maintenance.RequirementTools}
                                </div>
                              </div>
                              <div className="flex flex-row items-center  pl-2">
                                <label className="font-semibold text-sm flex flex-none mr-2">
                                  Implementation Team
                                </label>
                                <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                  {maintenance.Implementationteam}
                                </div>
                              </div>
                              <div className="flex flex-row items-center  pl-2">
                                <label className="font-semibold text-sm flex flex-none mr-2">
                                  Communication( Deoendent Person)
                                </label>
                                <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                  {maintenance.Communication}
                                </div>
                              </div>
                              <div className="flex flex-row items-center  pl-2">
                                <label className="font-semibold text-sm flex flex-none mr-2">
                                  Roll Back Plan( If failure)
                                </label>
                                <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                  {maintenance.RollBackPlan}
                                </div>
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
                                  <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                    {maintenance.checklistStatusOne}
                                  </div>
                                </div>

                                <div className="border p-1 text-center border-gray-600  text-sm flex flex-none ">
                                  Is The Communication maintained ?
                                </div>
                                <div className="flex flex-row  border border-gray-600 pl-2">
                                  <label className="font-none text-sm flex flex-none mr-2"></label>
                                  <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                    {maintenance.checklistStatusTwo}
                                  </div>
                                </div>
                                {/* ////// */}
                                <div className="border p-1 text-center border-gray-600 font-none text-sm flex flex-none">
                                  Is the Back Up Token Of The System?
                                </div>
                                <div className="flex flex-row items-center border border-gray-600 pl-2">
                                  <label className="font-semibold text-sm flex flex-none mr-2"></label>
                                  <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                    {maintenance.checklistStatusThree}
                                  </div>
                                </div>

                                <div className="border p-1 text-center border-gray-600  text-sm flex flex-none ">
                                  Is The Change Identifid Stable ?
                                </div>
                                <div className="flex flex-row  border border-gray-600 pl-2">
                                  <label className="font-none text-sm flex flex-none mr-2"></label>
                                  <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                    {maintenance.checklistStatusFour}
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-row items-center  pl-2">
                                <label className="font-semibold text-sm flex flex-none mr-2">
                                  Impacted System For
                                </label>
                                <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                  {maintenance.ImpactedSystemfor}
                                </div>
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
                                  <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                    {maintenance.ActualPriority}
                                  </div>
                                </div>
                                <div className="flex flex-row items-center  pl-2">
                                  <label className="font-semibold text-sm flex flex-none mr-2">
                                    Actual Impact Level
                                  </label>
                                  <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                    {maintenance.Actualimpactlevel}
                                  </div>
                                </div>
                              </div>
                              <div className="grid grid-cols-4  ">
                                <div className=" flex items-center border border-gray-700">
                                  <label className="font-semibold  flex flex-none text-sm mr-2 mx-[px]">
                                    (TEAM LEADER) :
                                  </label>
                                  <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                    {maintenance.ciso}
                                  </div>
                                </div>
                                <div className=" flex items-center border border-gray-700">
                                  <label className="font-semibold  flex flex-none text-sm mr-2 mx-[px]">
                                    (HEAD 0F IRFA) :
                                  </label>
                                  <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                    {maintenance.superadmin}
                                  </div>
                                </div>
                                <div className=" flex items-center border border-gray-700">
                                  <label className="font-semibold  flex flex-none text-sm mr-2 mx-[px]">
                                    (CISO) :
                                  </label>
                                  <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                    {maintenance.ciso}
                                  </div>
                                </div>
                                <div className=" flex items-center border border-gray-700">
                                  <label className="font-semibold  flex flex-none text-sm mr-2 mx-[px]">
                                    (HEAD) :
                                  </label>
                                  <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                    {maintenance.head}
                                  </div>
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

                                <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                  {maintenance.ExecusionTeamMenbers}
                                </div>
                                <label className="font-semibold text-sm flex flex-none mr-2">
                                  Execusion Team Leaders:
                                </label>

                                <div className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                                  {maintenance.ExecusionTeamleaders}
                                </div>
                              </div>
                              <tr>
                                {/* Service Details in a separate row */}
                                <td
                                  colSpan={2}
                                  className="border-[1px] border-b-1 py-2 px-4 text-center border-gray-600"
                                >
                                  <div className="font-semibold text-sm text-gray-900">
                                    show all approval status
                                    {/* {request.id} */}
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <tr className="flex">
                                  <td
                                    colSpan={1}
                                    className="py-2 px-4"
                                    style={{
                                      borderBottom: "8px solid",
                                      borderColor:
                                        maintenance.supervisorStatus ===
                                        "Released"
                                          ? "#294B29"
                                          : "#D24545",
                                    }}
                                  >
                                    <div className=" text-sm text-gray-900">
                                      <label className="font-semibold mr-10 underline">
                                        Team Lead{" "}
                                      </label>
                                      {maintenance.supervisorStatus}
                                    </div>
                                  </td>

                                  <td
                                    colSpan={1}
                                    className="py-2 px-4"
                                    style={{
                                      borderBottom: "8px solid",
                                      borderColor:
                                        maintenance.approvalStatus === "approve"
                                          ? "#294B29"
                                          : "#D24545",
                                    }}
                                  >
                                    <div className=" text-sm text-gray-900">
                                      <label className="font-semibold mr-10 underline ">
                                        Head of Ifra/App{" "}
                                      </label>

                                      {maintenance.approvalStatus}
                                    </div>
                                  </td>

                                  <td
                                    colSpan={1}
                                    className="py-2 px-4"
                                    style={{
                                      borderBottom: "8px solid",
                                      borderColor:
                                        maintenance.cisoStatus === "approveed"
                                          ? "#294B29"
                                          : "#D24545",
                                    }}
                                  >
                                    <div className=" text-sm text-gray-900">
                                      <label className="font-semibold  mr-10 underline">
                                        CISO
                                      </label>{" "}
                                      {maintenance.cisoStatus}
                                    </div>
                                  </td>

                                  <td
                                    colSpan={1}
                                    className="py-2 px-4 pt-2"
                                    style={{
                                      borderBottom: "8px solid",
                                      borderColor:
                                        maintenance.HeadOfDivisionStatus ===
                                        "confirm"
                                          ? "#294B29"
                                          : "#D24545",
                                    }}
                                  >
                                    <div className=" text-sm text-gray-900">
                                      <label className="font-semibold mr-10  underline">
                                        Head of Division{" "}
                                      </label>{" "}
                                      {maintenance.HeadOfDivisionStatus}
                                    </div>
                                  </td>
                                </tr>
                              </tr>
                              {/* ////////////////////////////////////////////// */}
                            </tbody>

                            {/* Add more fields as needed */}
                          </Modal>
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
