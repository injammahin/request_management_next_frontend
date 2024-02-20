"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/app/components/navigation/page";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Management {
  requestNumber: string;
  subofChange: string;
  requestedBy: string;
  date: string;
  requesterName: string;
  EmployeeId: string;
  department: string;
  contractNo: string;
  MaintenanceType: string;
  purposeOfActivity: string;
  priority: string;
  impactLevel: string;
  requiredDowntime: string;
  mentionDowntime: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  ////////////////////////////////////////////////////////////////
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

  user: string;
  [key: string]: string; // Index signature to allow any additional string properties
}

const RequestDetailsPage = () => {
  const [requestDetails, setRequestDetails] = useState<Management | null>(null);
  const [message, setMessage] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const storedRequestDetails = localStorage.getItem("selectedRequestDetails");
    if (storedRequestDetails) {
      setRequestDetails(JSON.parse(storedRequestDetails));
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRequestDetails((prevDetails) =>
      prevDetails ? { ...prevDetails, [name]: value } : null
    );
  };
  const router = useRouter();

  const handleBackButtonClick = () => {
    router.push("./profile");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (requestDetails) {
      try {
        const response = await axios.put(
          `http://localhost:3001/maintaintance/${requestDetails.id}`,
          requestDetails
        );
        setMessage("Service request updated successfully!");
      } catch (error) {
        console.error("Error updating service request:", error);
        setMessage("Failed to update service request. Please try again.");
      }
    }
  };
  const handleMenuToggle = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  };

  if (!requestDetails) {
    return <div>Loading...</div>;
  }
  return (
    <div
      className={`bg-gray-100 min-h-screen ${isMenuOpen ? "menu-open" : ""}`}
    >
      <Navbar userRole={"supervisor"} onMenuToggle={handleMenuToggle} />
      <div
        className={`container mx-auto p-6 ${
          isMenuOpen ? "translate-x-[120px]" : ""
        }`}
      >
        <form
          onSubmit={handleSubmit}
          className="max-w-[1000px] pt-10  mx-auto mt-8  border"
        >
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
                value={requestDetails.requestNumber} // Display requestNo
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
                readOnly
                value={requestDetails.date}
                className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 ">
            <div className="flex flex-row items-center">
              <label className="font-semibold text-sm flex flex-none mr-2">
                Requested By:
              </label>
              <input
                type="text"
                name="requestedBy"
                // onChange={handleInputChange}
                value={requestDetails.requestedBy}
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
                onChange={handleInputChange}
                value={requestDetails.requesterName}
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
                onChange={handleInputChange}
                value={requestDetails.subofChange}
                className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </div>

            <div className="flex flex-row items-center">
              <label className="font-semibold text-sm flex flex-none mr-2">
                Employee Id:
              </label>
              <input
                type="text"
                name="EmployeeId"
                // onChange={handleInputChange}
                readOnly
                value={requestDetails.EmployeeId}
                className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 ">
            <div className="flex flex-row items-center">
              <label className="font-semibold text-sm flex flex-none mr-2">
                Department:
              </label>
              <input
                type="text"
                name="department"
                // onChange={handleInputChange}
                readOnly
                value={requestDetails.department}
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
                onChange={handleInputChange}
                value={requestDetails.contractNo}
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
                onChange={handleInputChange}
                value={requestDetails.MaintenanceType}
                className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </div>
            <div className="flex flex-row items-center">
              <label className="font-semibold text-sm flex flex-none mr-2">
                Ref. Service Request:
              </label>
              <input
                type="text"
                name="MaintenanceType"
                onChange={handleInputChange}
                value={requestDetails.MaintenanceType}
                className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
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
              onChange={handleInputChange}
              value={requestDetails.purposeOfActivity}
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
                onChange={handleInputChange}
                value={requestDetails.priority}
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
                onChange={handleInputChange}
                value={requestDetails.impactLevel}
                className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </div>
          </div>
          {/* //////////// */}
          <div className="grid grid-cols-2 gap-4 ">
            <div className="flex flex-row items-center">
              <label className="font-semibold text-sm flex flex-none mr-2">
                required Downtime:
              </label>
              <input
                type="text"
                name="requiredDowntime"
                onChange={handleInputChange}
                value={requestDetails.requiredDowntime}
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
                onChange={handleInputChange}
                value={requestDetails.mentionDowntime}
                className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </div>
          </div>
          {/* //////////// */}
          <div className="grid grid-cols-2 gap-4 ">
            <div className="flex flex-row items-center">
              <label className="font-semibold text-sm flex flex-none mr-2">
                Start Date:
              </label>
              <input
                type="text"
                name="startDate"
                onChange={handleInputChange}
                value={requestDetails.startDate}
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
                onChange={handleInputChange}
                value={requestDetails.startTime}
                className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </div>
          </div>
          {/* //////////// */}
          <div className="grid grid-cols-2 gap-4 ">
            <div className="flex flex-row items-center">
              <label className="font-semibold text-sm flex flex-none mr-2">
                End Date:
              </label>
              <input
                type="text"
                name="endDate"
                onChange={handleInputChange}
                value={requestDetails.endDate}
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
                onChange={handleInputChange}
                value={requestDetails.endTime}
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
              onChange={handleInputChange}
              value={requestDetails.changeLocation}
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
              onChange={handleInputChange}
              value={requestDetails.targetedSystemFor}
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
              onChange={handleInputChange}
              value={requestDetails.IPaddress}
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
              onChange={handleInputChange}
              value={requestDetails.ImpactedSystemfor}
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
              onChange={handleInputChange}
              value={requestDetails.DetailedDescriptionOfChange}
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
                onChange={handleInputChange}
                value={requestDetails.DetailedWorkedPlanStartTime}
                className="block w-full  py-1  px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </div>
            <div className="flex flex-row items-center border border-gray-600 pl-2">
              <label className="font-semibold text-sm flex flex-none mr-2"></label>
              <input
                type="text"
                name="DetailedDescriptionOfChange"
                onChange={handleInputChange}
                value={requestDetails.DetailedWorkedPlanEndTime}
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
              onChange={handleInputChange}
              value={requestDetails.RequirementTools}
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
              onChange={handleInputChange}
              value={requestDetails.Implementationteam}
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
              onChange={handleInputChange}
              value={requestDetails.Communication}
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
              onChange={handleInputChange}
              value={requestDetails.RollBackPlan}
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
                // onChange={handleInputChange}
                value={requestDetails.checklistStatusOne}
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
                // onChange={handleInputChange}
                value={requestDetails.checklistStatusTwo}
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
                // onChange={handleInputChange}
                value={requestDetails.checklistStatusThree}
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
                // onChange={handleInputChange}
                value={requestDetails.checklistStatusFour}
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
              onChange={handleInputChange}
              value={requestDetails.ImpactedSystemfor}
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
                onChange={handleInputChange}
                value={requestDetails.ActualPriority}
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
                onChange={handleInputChange}
                value={requestDetails.Actualimpactlevel}
                className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </div>
          </div>
          <div className="grid grid-cols-4  ">
            <label className="font-semibold p-1 text-sm flex flex-none mr-2  border border-gray-600">
              Team Leader
            </label>
            <label className="font-semibold p-1 text-sm flex flex-none mr-2 border border-gray-600">
              Head Of IFRA
            </label>
            <label className="font-semibold p-1 text-sm flex flex-none mr-2 border border-gray-600">
              CISO
            </label>
            <label className="font-semibold p-1 text-sm flex flex-none mr-2 border border-gray-600">
              HEAD
            </label>
          </div>
          <div className="text-center  border border-gray-600 ">
            <div className="bg-gray-300 flex justify-center items-center">
              <h1 className="p-1  font-bold text-sm">PART 5 : Change Review</h1>
            </div>
          </div>
          <div className="flex flex-row items-center  pl-2">
            <label className="font-semibold text-sm flex flex-none mr-2">
              Execusion Team Menbers
            </label>

            <input
              type="text"
              name="ExecusionTeamMenbers"
              onChange={handleInputChange}
              value={requestDetails.ExecusionTeamMenbers}
              className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            <label className="font-semibold text-sm flex flex-none mr-2">
              Execusion Team Leaders
            </label>
            <input
              type="text"
              name="ExecusionTeamleaders"
              onChange={handleInputChange}
              value={requestDetails.ExecusionTeamleaders}
              className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </div>
          {/* ////////////////////////////////////////////// */}

          <div className="flex justify-between p-4">
            <button
              type="button"
              className="bg-gray-500 text-white p-2 w-32 rounded hover:bg-gray-700"
            >
              <Link href="view_maintenance_request_form">Back</Link>
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
          {message && (
            <p className="text-center text-green-500 mt-2">{message}</p>
          )}
        </form>

        {/* {submittedDetails && (
          <div className="max-w-md uppercase mx-auto mt-8 p-4 border">
            <h2 className="text-2xl font-semibold mb-4">Submitted Details</h2>
            <div>
              <p>
                <strong>Request number:</strong>{" "}
                {submittedDetails.requestNumber}
              </p>
              <p>
                <strong>Date:</strong> {submittedDetails.date}
              </p>
              <p>
                <strong>sub of change:</strong> {submittedDetails.subofChange}
              </p>
              <p>
                <strong>Requester Name:</strong>{" "}
                {submittedDetails.requesterName}
              </p>
              <p>
                <strong>Department:</strong> {submittedDetails.department}
              </p>
              <p>
                <strong>Employee Id:</strong> {submittedDetails.employeeId}
              </p>
              <p>
                <strong>contract no:</strong> {submittedDetails.contractNo}
              </p>
              <p>
                <strong>maintenance type:</strong>{" "}
                {submittedDetails.MaintenanceType}
              </p>
              <p>
                <strong>purposeOfActivity:</strong>{" "}
                {submittedDetails.purposeOfActivity}
              </p>
              <p>
                <strong>priority:</strong> {submittedDetails.priority}
              </p>
              <p>
                <strong>impact level:</strong> {submittedDetails.impactLevel}
              </p>
              <p>
                <strong>requiredDowntime:</strong>{" "}
                {submittedDetails.requiredDowntime}
              </p>
              <p>
                <strong>mentionDowntime:</strong>{" "}
                {submittedDetails.mentionDowntime}
              </p>
              <p>
                <strong>start date:</strong> {submittedDetails.startDate}
              </p>
              <p>
                <strong>start time:</strong>
                {submittedDetails.startTime}
              </p>
              <p>
                <strong>end date:</strong>
                {submittedDetails.endDate}
              </p>
              <p>
                <strong>end time:</strong>
                {submittedDetails.endTime}
              </p>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default RequestDetailsPage;
