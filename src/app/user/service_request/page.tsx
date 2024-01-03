"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const requiredFields = [
      "requestNo",
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
        serviceDetails
      );
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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto  mt-8 p-4 border">
      <label className="block  w-1/2 mb-2">
        requestNo:
        <input
          type="text"
          name="requestNo"
          onChange={handleInputChange}
          className="block w-full p-2 border border-gray-300 rounded"
        />
      </label>
      <label className="block w-1/2 mb-2">
        date:
        <input
          type="date"
          name="date"
          onChange={handleInputChange}
          className="block w-full p-2 border border-gray-300 rounded"
        />
      </label>
      <label className="block mb-2">
        requestedBy:
        <input
          type="text"
          name="requestedBy"
          onChange={handleInputChange}
          className="block w-full p-2 border border-gray-300 rounded"
        />
      </label>
      <label className="block mb-2">
        requestFor:
        <input
          type="text"
          name="requestFor"
          onChange={handleInputChange}
          className="block w-full p-2 border border-gray-300 rounded"
        />
      </label>
      <label className="block mb-2">
        department:
        <input
          type="text"
          name="department"
          onChange={handleInputChange}
          className="block w-full p-2 border border-gray-300 rounded"
        />
      </label>
      <label className="block mb-2">
        employeeId:
        <input
          type="text"
          name="employeeId"
          onChange={handleInputChange}
          className="block w-full p-2 border border-gray-300 rounded"
        />
      </label>
      <label className="block mb-2">
        designation:
        <input
          type="text"
          name="designation"
          onChange={handleInputChange}
          className="block w-full p-2 border border-gray-300 rounded"
        />
      </label>
      <label className="block mb-2">
        reasonOfRequest:
        <input
          type="text"
          name="reasonOfRequest"
          onChange={handleInputChange}
          className="block w-full p-2 border border-gray-300 rounded"
        />
      </label>
      <label className="block mb-2">
        serviceDetails:
        <input
          type="text"
          name="serviceDetails"
          onChange={handleInputChange}
          className="block w-full p-2 border border-gray-300 rounded"
        />
      </label>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>

      {successMessage && (
        <p className="text-center text-green-500 mt-2">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="text-center text-red-500 mt-2">{errorMessage}</p>
      )}
    </form>
  );
};

export default RequestServiceForm;
