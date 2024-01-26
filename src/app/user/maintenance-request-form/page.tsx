// src/app/service-request/form.tsx

"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import Navbar from "@/app/components/navigation/page";
import Link from "next/link";

interface ManagementFormProps {}

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
  user: string;
  [key: string]: string; // Index signature to allow any additional string properties
}

const ManagementForm: React.FC<ManagementFormProps> = ({}) => {
  const [Management, setManagement] = useState<Management>({
    requestNumber: "",
    subofChange: "",
    requestedBy: "",
    date: "",
    requesterName: "",
    EmployeeId: "",
    department: "",
    contractNo: "",
    MaintenanceType: "",
    purposeOfActivity: "",
    priority: "",
    impactLevel: "",
    requiredDowntime: "",
    mentionDowntime: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    user: "",
  });
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [submittedDetails, setSubmittedDetails] = useState<Management | null>(
    null
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // This function will be called by the Navbar component
  const handleMenuToggle = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setManagement((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

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

  return (
    <div
      className={`bg-gray-100 min-h-screen ${isMenuOpen ? "menu-open" : ""}`}
    >
      <Navbar userRole={"supervisor"} onMenuToggle={handleMenuToggle} />
      <div
        className={`container mx-auto p-6 ${
          isMenuOpen ? "translate-x-[0px]" : ""
        }`}
      >
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl pt-10 uppercase mx-auto mt-8 p-4 border"
        >
          <div className="grid  grid-cols-2 gap-4 mb-4">
            <div className="relative z-0 mb-2">
              <label className="block">
                request number:
                <input
                  type="text"
                  name="requestNumber"
                  id="requestNumber"
                  value={Management.requestNumber} // Display requestNo
                  readOnly
                  className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
              </label>
            </div>

            <div className="relative z-0 mb-2">
              <label className="block">
                date:
                <input
                  type="date"
                  name="date"
                  onChange={handleInputChange}
                  value={Management.date}
                  className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="mb-2">
              <label className="block">
                requested By:
                <input
                  type="text"
                  name="requestedBy"
                  onChange={handleInputChange}
                  value={Management.requestedBy}
                  className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
              </label>
            </div>

            <div className="mb-2">
              <label className="block">
                requester Name:
                <input
                  type="text"
                  name="requesterName"
                  onChange={handleInputChange}
                  value={Management.requesterName}
                  className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="mb-2">
              <label className="block">
                subject of change:
                <input
                  type="text"
                  name="subofChange"
                  onChange={handleInputChange}
                  value={Management.subofChange}
                  className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
              </label>
            </div>

            <div className="mb-2">
              <label className="block">
                employee Id:
                <input
                  type="text"
                  name="EmployeeId"
                  onChange={handleInputChange}
                  value={Management.EmployeeId}
                  className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                />
              </label>
            </div>
          </div>
          <div className="mb-2">
            <label className="block">
              department:
              <input
                type="text"
                name="department"
                onChange={handleInputChange}
                value={Management.department}
                className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </label>
          </div>
          <div className="mb-2">
            <label className="block">
              contractNo:
              <input
                type="text"
                name="contractNo"
                onChange={handleInputChange}
                value={Management.contractNo}
                className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </label>
          </div>
          {/* //////////// */}
          <div className="mb-2">
            <label className="block">
              MaintenanceType:
              <input
                type="text"
                name="MaintenanceType"
                onChange={handleInputChange}
                value={Management.MaintenanceType}
                className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </label>
          </div>
          {/* //////////// */}
          <div className="mb-2">
            <label className="block">
              purposeOfActivity:
              <input
                type="text"
                name="purposeOfActivity"
                onChange={handleInputChange}
                value={Management.purposeOfActivity}
                className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </label>
          </div>
          {/* //////////// */}
          <div className="mb-2">
            <label className="block">
              priority:
              <input
                type="text"
                name="priority"
                onChange={handleInputChange}
                value={Management.priority}
                className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </label>
          </div>
          {/* //////////// */}
          <div className="mb-2">
            <label className="block">
              impactLevel:
              <input
                type="text"
                name="impactLevel"
                onChange={handleInputChange}
                value={Management.impactLevel}
                className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </label>
          </div>
          {/* //////////// */}
          <div className="mb-2">
            <label className="block">
              requiredDowntime:
              <input
                type="text"
                name="requiredDowntime"
                onChange={handleInputChange}
                value={Management.requiredDowntime}
                className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </label>
          </div>
          {/* //////////// */}
          <div className="mb-2">
            <label className="block">
              mentionDowntime:
              <input
                type="text"
                name="mentionDowntime"
                onChange={handleInputChange}
                value={Management.mentionDowntime}
                className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </label>
          </div>
          {/* //////////// */}
          <div className="mb-2">
            <label className="block">
              startDate:
              <input
                type="text"
                name="startDate"
                onChange={handleInputChange}
                value={Management.startDate}
                className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </label>
          </div>
          {/* //////////// */}
          <div className="mb-2">
            <label className="block">
              startTime:
              <input
                type="text"
                name="startTime"
                onChange={handleInputChange}
                value={Management.startTime}
                className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </label>
          </div>
          {/* //////////// */}
          <div className="mb-2">
            <label className="block">
              endDate:
              <input
                type="text"
                name="endDate"
                onChange={handleInputChange}
                value={Management.endDate}
                className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </label>
          </div>
          {/* //////////// */}
          <div className="mb-2">
            <label className="block">
              endTime:
              <input
                type="text"
                name="endTime"
                onChange={handleInputChange}
                value={Management.endTime}
                className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </label>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-500 text-white p-2 w-32 rounded hover:bg-gray-700"
            >
              <Link href="/dashboard">Back</Link>
            </button>
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

        {submittedDetails && (
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
        )}
      </div>
    </div>
  );
};

export default ManagementForm;
