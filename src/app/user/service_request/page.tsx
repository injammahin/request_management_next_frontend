"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import Navbar from "@/app/components/navigation/page";
import Sidebar from "@/app/components/navigation/sidebar/page";
import Link from "next/link";
import router from "next/router";

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
  userId: string;
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
    userId: "",
  });
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

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
    const generatedRequestNo = `DBA|${serviceDetails.date}|${serviceDetails.department}|${serviceDetails.requestedBy}`;
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
          userId: localStorage.getItem("userId"),
        }
      );
      setSuccessMessage("Form submitted successfully");
      setErrorMessage("");
      console.log("Form submitted successfully:", response.data);
      // setTimeout(() => {
      //   router.push("/dashboard"); // Use router.push for client-side navigation
      // }, 3000);
    } catch (error) {
      setErrorMessage("Form submission failed");
      setSuccessMessage("");
      console.error("Form submission failed:", error);
    }
  };

  return (
    <div>
      <Navbar />

      <form
        onSubmit={handleSubmit}
        className="max-w-md uppercase mx-auto mt-8 p-4 border"
      >
        <div className="grid  grid-cols-2 gap-4 mb-4">
          {/* <div className="relative z-0 mb-2">
            <label className="block">
              request no:
              <input
                type="text"
                name="requestNo"
                id="requestNo"
                onChange={handleInputChange}
                className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </label>
          </div> */}

          <div className="relative z-0 mb-2">
            <label className="block">
              date:
              <input
                type="date"
                name="date"
                onChange={handleInputChange}
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
                className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </label>
          </div>

          <div className="mb-2">
            <label className="block">
              request For:
              <input
                type="text"
                name="requestFor"
                onChange={handleInputChange}
                className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="mb-2">
            <label className="block">
              department:
              <input
                type="text"
                name="department"
                onChange={handleInputChange}
                className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </label>
          </div>

          <div className="mb-2">
            <label className="block">
              employee Id:
              <input
                type="text"
                name="employeeId"
                onChange={handleInputChange}
                className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
            </label>
          </div>
        </div>

        <div className="mb-2">
          <label className="block">
            designation:
            <input
              type="text"
              name="designation"
              onChange={handleInputChange}
              className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </label>
        </div>

        <div className="mb-2">
          <label className="block">
            reason Of Request:
            <input
              type="text"
              name="reasonOfRequest"
              onChange={handleInputChange}
              className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </label>
        </div>

        <div className="mb-2">
          <label className="block">
            service Details:
            <input
              type="text"
              name="serviceDetails"
              onChange={handleInputChange}
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
    </div>
  );
};

export default RequestServiceForm;
