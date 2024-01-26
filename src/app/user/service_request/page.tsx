// src/app/service-request/form.tsx

"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import Navbar from "@/app/components/navigation/page";
import Link from "next/link";

interface RequestServiceFormProps {}

interface ServiceDetails {
  requestNo: string;
  date: string;
  requestedBy: string;
  requestFor: string;
  department: string;
  employeeId: string;
  designation: string;
  reasonOfRequest: string;
  serviceDetails: string;
  user: string;
  submissionDateTime: "";
  [key: string]: string; // Index signature to allow any additional string properties
}

const RequestServiceForm: React.FC<RequestServiceFormProps> = ({}) => {
  const [serviceDetails, setServiceDetails] = useState<ServiceDetails>({
    requestNo: "",
    date: "",
    requestedBy: "",
    requestFor: "",
    department: "",
    employeeId: "",
    designation: "",
    reasonOfRequest: "",
    serviceDetails: "",
    user: "",
    submissionDateTime: "",
  });
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [submittedDetails, setSubmittedDetails] =
    useState<ServiceDetails | null>(null);
  const currentDateTime = new Date().toLocaleString();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // This function will be called by the Navbar component
  const handleMenuToggle = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setServiceDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const autofillRequestNo = () => {
    // Auto-generate requestNo based on date, department, and requestedBy
    const generatedRequestNo = `DBL/${serviceDetails.date}/${serviceDetails.department}/${serviceDetails.requestedBy}`;
    setServiceDetails((prevDetails) => ({
      ...prevDetails,
      requestNo: generatedRequestNo,
    }));
  };

  useEffect(() => {
    autofillRequestNo();
  }, [
    serviceDetails.date,
    serviceDetails.department,
    serviceDetails.requestedBy,
  ]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const requiredFields = [
      "date",
      "requestedBy",
      "requestFor",
      "department",
      "employeeId",
      "designation",
      "reasonOfRequest",
      "serviceDetails",
    ];

    const hasEmptyField = requiredFields.some(
      (field) => !serviceDetails[field] || serviceDetails[field].trim() === ""
    );

    if (hasEmptyField) {
      setErrorMessage("Please fill in all the required fields");
      setSuccessMessage("");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/service-requests/fillup",
        {
          ...serviceDetails,
          userId: localStorage.getItem("Id"),
          user: localStorage.getItem("Id"),
          Userid: localStorage.getItem("Id"),
          submissionDateTime: currentDateTime,
        }
      );
      console.log(currentDateTime);

      setSubmittedDetails(serviceDetails); // Set submitted details
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
        className={`container mx-auto p-20 ${
          isMenuOpen ? "translate-x-[0px]" : ""
        }`}
      >
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl pt-10 uppercase mx-auto mt-8 p-4 border"
        >
          <div className="grid  grid-cols-2 gap-4 mb-1">
            <div className="mb-1 flex flex-row items-center">
              <label className="font-semibold text-sm flex flex-none mr-2">
                request no:
              </label>
              <input
                type="text"
                name="requestNo"
                id="requestNo"
                value={serviceDetails.requestNo} // Display requestNo
                readOnly
                className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </div>

            <div className="mb-2 flex flex-row items-center">
              <label className="font-semibold flex flex-none text-sm mr-2">
                date:
              </label>
              <input
                type="date"
                name="date"
                onChange={handleInputChange}
                value={serviceDetails.date}
                className=" w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="mb-2 flex flex-row items-center">
              <label className=" font-semibold flex text-sm flex-none mr-2">
                request by :{" "}
              </label>
              <input
                type="text"
                name="requestedBy"
                onChange={handleInputChange}
                value={serviceDetails.requestedBy}
                className="block w-full  py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </div>

            <div className="mb-2 flex flex-row items-center">
              <label className="font-semibold flex flex-none text-sm mr-2">
                request For:
              </label>
              <input
                type="text"
                name="requestFor"
                onChange={handleInputChange}
                value={serviceDetails.requestFor}
                className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="mb-1 flex flex-row items-center">
              <label className="font-semibold flex flex-none text-sm mr-2">
                department:
              </label>
              <input
                type="text"
                name="department"
                onChange={handleInputChange}
                value={serviceDetails.department}
                className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </div>

            <div className="mb-1 flex flex-row items-center">
              <label className="font-semibold flex flex-none text-sm mr-2">
                employee Id:
              </label>
              <input
                type="text"
                name="employeeId"
                onChange={handleInputChange}
                value={serviceDetails.employeeId}
                className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </div>
          </div>

          <div className="mb-1 flex flex-row items-center">
            <label className="font-semibold flex flex-none text-sm mr-2">
              designation:
            </label>
            <input
              type="text"
              name="designation"
              onChange={handleInputChange}
              value={serviceDetails.designation}
              className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </div>

          <div className="mb-2 flex flex-row items-center">
            <label className="font-semibold flex flex-none text-sm mr-2">
              reason Of Request:
            </label>
            <input
              type="text"
              name="reasonOfRequest"
              onChange={handleInputChange}
              value={serviceDetails.reasonOfRequest}
              className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </div>

          <div className="mb-2 flex flex-row items-center">
            <label className="font-semibold flex flex-none text-sm mr-2">
              service Details:
            </label>
            <input
              type="text"
              name="serviceDetails"
              onChange={handleInputChange}
              value={serviceDetails.serviceDetails}
              className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-500 text-white p-2 w-20 rounded hover:bg-gray-700"
            >
              <Link href="../dashboard/user-dashboard">Back</Link>
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
                <strong>Request No:</strong> {submittedDetails.requestNo}
              </p>
              <p>
                <strong>Date:</strong> {submittedDetails.date}
              </p>
              <p>
                <strong>Requested By:</strong> {submittedDetails.requestedBy}
              </p>
              <p>
                <strong>Request For:</strong> {submittedDetails.requestFor}
              </p>
              <p>
                <strong>Department:</strong> {submittedDetails.department}
              </p>
              <p>
                <strong>Employee Id:</strong> {submittedDetails.employeeId}
              </p>
              <p>
                <strong>Designation:</strong> {submittedDetails.designation}
              </p>
              <p>
                <strong>Reason Of Request:</strong>{" "}
                {submittedDetails.reasonOfRequest}
              </p>
              <p>
                <strong>Service Details:</strong>{" "}
                {submittedDetails.serviceDetails}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestServiceForm;
