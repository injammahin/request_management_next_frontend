"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/app/components/navigation/page";
import LoadingSpinner from "@/app/components/loading/page";
import Modal from "@/app/components/modal/Modal"; // Make sure you have a Modal component

// UserDetails and Maintenance interfaces remain the same...

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [maintenance, setmaintenance] = useState<Maintenance | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth/profile", {
          headers: {
            id: `${localStorage.getItem("userId")}`,
          },
        });
        setUserData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const handleShowMore = (maintenance: Maintenance) => {
    setmaintenance(maintenance);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <LoadingSpinner loading={true} />;
  }

  return (
    <div>
      <Navbar userRole={"user"} onMenuToggle={() => {}} />
      <div className="container mx-auto p-6">
        <div className="w-full pt-20 bg-white p-8 rounded-lg shadow-md space-y-8">
          {userData?.maintenances?.map((maintenance) => (
            <div key={maintenance.id} className="mb-4">
              <div>Request Number: {maintenance.requestNumber}</div>
              <button
                onClick={() => handleShowMore(maintenance)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px- rounded"
              >
                Show More
              </button>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && maintenance && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
                Detailed Description Of Change / Maintenance:
              </label>
              <input
                type="text"
                name="DetailedDescriptionOfChange"
                value={maintenance.DetailedDescriptionOfChange}
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
                  value={maintenance.DetailedWorkedPlanStartTime}
                  className="block w-full  py-1  px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
              </div>
              <div className="flex flex-row items-center border border-gray-600 pl-2">
                <label className="font-semibold text-sm flex flex-none mr-2"></label>
                <input
                  type="text"
                  name="DetailedDescriptionOfChange"
                  value={maintenance.DetailedWorkedPlanEndTime}
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
                <h1 className="p-1  font-bold text-sm">Change Checklist</h1>
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

          {/* Add more fields as needed */}
        </Modal>
      )}
    </div>
  );
};

export default ProfilePage;
