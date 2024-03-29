// src/app/service-request/form.tsx

"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import Navbar from "@/app/components/navigation/page";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ManagementFormProps {}
interface Roles {
  [key: string]: string[]; // Define the structure of your roles data
}

interface Management {
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
  /////////////////////////////////////

  user: string;
  [key: string]: string; // Index signature to allow any additional string properties
}

const ManagementForm: React.FC<ManagementFormProps> = ({}) => {
  const [Management, setManagement] = useState<Management>({
    requestNumber: "",

    subofChange: "",

    date: "",

    requestedBy: localStorage.getItem("userName") || "",

    requesterName: "",

    EmployeeId: localStorage.getItem("employeeId") || "",

    department: localStorage.getItem("network") || "",

    contractNo: "",

    MaintenanceType: "",

    purposeOfActivity: "",

    referenceServiceRequest: "",

    priority: "",

    impactLevel: "",

    requiredDowntime: "",

    mentionDowntime: "",

    startDate: "",

    startTime: "",

    endDate: "",

    endTime: "",

    ////////////////////////////////* part -2 *////////////////////////////////
    changeLocation: "",

    targetedSystemFor: "",

    IPaddress: "",

    ImpactedSystemform: "",

    DetailedDescriptionOfChange: "",

    DetailedWorkedPlanTask: "",

    DetailedWorkedPlanStartTime: "",

    DetailedWorkedPlanEndTime: "",

    RequirementTools: "",

    Implementationteam: "",

    Communication: "",

    RollBackPlan: "",

    checklistStatusOne: "",

    checklistStatusTwo: "",

    checklistStatusThree: "",

    checklistStatusFour: "",

    ////////////////////////////////* part -3 *////////////////////////////////
    ImpactedSystemfor: "",

    ActualPriority: "",

    Actualimpactlevel: "",

    ////////////////////////////////* part -4 *////////////////////////////////
    ExecusionTeamMenbers: "",

    ExecusionTeamleaders: "",

    ////////////////////////////////* part -5 *////////////////////////////////
    ChangeReviewForperformed: "",

    ChangeReviewForSuccess: "",

    ActualDowntime: "",

    WorkExecutionStatus: "",
    superadmin: localStorage.getItem("superadmin") || "",
    subadmin: localStorage.getItem("subadmin") || "",
    ciso: localStorage.getItem("ciso") || "",
    head: localStorage.getItem("head") || "",
    user: "",
  });
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [roles, setRoles] = useState<Roles>({}); // Use the Roles interface for typing the state
  const router = useRouter();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [submissionTime, setSubmissionTime] = useState("");
  const [submittedDetails, setSubmittedDetails] = useState<Management | null>(
    null
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // This function will be called by the Navbar component
  const handleMenuToggle = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;
    setManagement((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const handleBackButtonClick = () => {
    router.push("../dashboard/user-dashboard");
  };
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/users/all-roles"
        );
        setRoles(response.data);
        console.log(response.data);
        if (response.data.superadmin) {
          localStorage.setItem("superadmin", response.data.superadmin);
        }
        if (response.data.subadmin) {
          localStorage.setItem("subadmin", response.data.subadmin);
        }
        if (response.data.ciso) {
          localStorage.setItem("ciso", response.data.ciso);
        }
        if (response.data.head) {
          localStorage.setItem("head", response.data.head);
        }
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      }
    };

    fetchRoles();
  }, []);

  const autofillRequestNo = () => {
    // Auto-generate requestNo based on date, department, and requestedBy
    const generatedRequestNo = `DBL/${Management.date}/${Management.department}/${Management.requestedBy}`;
    setManagement((prevDetails) => ({
      ...prevDetails,
      requestNumber: generatedRequestNo,
    }));
  };

  useEffect(() => {
    autofillRequestNo();
  }, [Management.date, Management.department, Management.requestedBy]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    setSubmissionTime(new Date().toLocaleTimeString());

    // Automatically hide the pop-up after 3 seconds
    setTimeout(() => {
      setIsFormSubmitted(false);
      // Redirect to home page after 3 seconds
      router.push("./view_maintenance_request_form");
    }, 3000);

    const requiredFields = [
      "requestNumber",
      "subofChange",
      "requestedBy",
      "date",
      "requesterName",
      "EmployeeId",
      "department",
      "contractNo",
      "MaintenanceType",
      "purposeOfActivity",
      "priority",
      "impactLevel",
      "requiredDowntime",
      "mentionDowntime",
      "startDate",
      "startTime",
      "endDate",
      "endTime",
    ];

    const hasEmptyField = requiredFields.some(
      (field) => !Management[field] || Management[field].trim() === ""
    );

    if (hasEmptyField) {
      setErrorMessage("Please fill in all the required fields");
      setSuccessMessage("");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/maintaintance/fillup",
        {
          ...Management,
          user: localStorage.getItem("Id"),
        }
      );

      setSubmittedDetails(Management); // Set submitted details
      setSuccessMessage("Form submitted successfully");
      setErrorMessage("");
      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      setErrorMessage("Form submission failed");
      setSuccessMessage("");
      console.error("Form submission failed:", error);
    }
  };
  const [requestNumbers, setRequestNumbers] = useState<{ requestNo: string }[]>(
    []
  );
  useEffect(() => {
    const fetchRequestNumbers = async () => {
      const userId = localStorage.getItem("userName");
      try {
        const response = await axios.get(
          `http://localhost:3001/service-requests/by-user/${userId}`
        );
        setRequestNumbers(response.data); // Assuming the response is an array of objects with a requestNo property
      } catch (error) {
        console.error("Failed to fetch request numbers:", error);
      }
    };

    fetchRequestNumbers();
  }, []);

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
                value={Management.requestNumber} // Display requestNo
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
                onChange={handleInputChange}
                value={Management.date}
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
                value={Management.requestedBy}
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
                value={Management.requesterName}
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
                value={Management.subofChange}
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
                value={Management.EmployeeId}
                className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-row items-center">
              <label className="font-semibold text-sm flex flex-none mr-2">
                Department:
              </label>
              <input
                type="text"
                name="department"
                // onChange={handleInputChange}
                readOnly
                value={Management.department}
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
                value={Management.contractNo}
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
                value={Management.MaintenanceType}
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
              <select
                name="referenceServiceRequest"
                value={Management.referenceServiceRequest}
                onChange={handleInputChange}
                className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              >
                <option value="">( Select Request No )</option>
                {requestNumbers.map((request, index) => (
                  <option key={index} value={request.requestNo}>
                    {request.requestNo}
                  </option>
                ))}
              </select>
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
              value={Management.purposeOfActivity}
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
                value={Management.priority}
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
                value={Management.impactLevel}
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
                value={Management.requiredDowntime}
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
                value={Management.mentionDowntime}
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
                value={Management.startDate}
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
                value={Management.startTime}
                className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </div>
          </div>
          {/* //////////// */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-row items-center">
              <label className="font-semibold text-sm flex flex-none mr-2">
                End Date:
              </label>
              <input
                type="text"
                name="endDate"
                onChange={handleInputChange}
                value={Management.endDate}
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
                value={Management.endTime}
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
              value={Management.changeLocation}
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
              value={Management.targetedSystemFor}
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
              value={Management.IPaddress}
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
              value={Management.ImpactedSystemfor}
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
              value={Management.DetailedDescriptionOfChange}
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
                value={Management.DetailedWorkedPlanStartTime}
                className="block w-full  py-1  px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </div>
            <div className="flex flex-row items-center border border-gray-600 pl-2">
              <label className="font-semibold text-sm flex flex-none mr-2"></label>
              <input
                type="text"
                name="DetailedDescriptionOfChange"
                onChange={handleInputChange}
                value={Management.DetailedWorkedPlanEndTime}
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
              value={Management.RequirementTools}
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
              value={Management.Implementationteam}
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
              value={Management.Communication}
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
              value={Management.RollBackPlan}
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
                onChange={handleInputChange}
                value={Management.checklistStatusOne}
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
                onChange={handleInputChange}
                value={Management.checklistStatusTwo}
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
                onChange={handleInputChange}
                value={Management.checklistStatusThree}
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
                onChange={handleInputChange}
                value={Management.checklistStatusFour}
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
              value={Management.ImpactedSystemfor}
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
                value={Management.ActualPriority}
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
                value={Management.Actualimpactlevel}
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
                value={Management.ciso}
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
                value={Management.superadmin}
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
                value={Management.ciso}
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
                value={Management.head}
                className="block w-full py-2.5 px-0 text-sm   underline-offset-4 text-gray-900 bg-transparent text-center border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer "
              />
            </div>
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
              value={Management.ExecusionTeamMenbers}
              className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            <label className="font-semibold text-sm flex flex-none mr-2">
              Execusion Team Leaders
            </label>
            <input
              type="text"
              name="ExecusionTeamleaders"
              onChange={handleInputChange}
              value={Management.ExecusionTeamleaders}
              className="block w-full py-1 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </div>
          {/* ////////////////////////////////////////////// */}

          <div className="flex justify-between p-4">
            <div className="flex justify-between items-center">
              <button
                type="button"
                className="bg-gray-800 text-white p-2 w-28 h-9 rounded hover:bg-gray-700 flex items-center"
                onClick={handleBackButtonClick}
              >
                <img
                  src="/back.svg"
                  alt="Delete Icon"
                  className="h-8 w-8 mr-2"
                />
                <span>back</span>
              </button>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
          {successMessage && (
            <p className="text-center text-green-500 mt-2">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-center text-red-500 mt-2">{errorMessage}</p>
          )}
        </form>

        {isFormSubmitted && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg">
              <p>Form submitted successfully at: {submissionTime}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagementForm;
