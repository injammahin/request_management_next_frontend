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
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      setErrorMessage("Form submission failed");
      setSuccessMessage("");
      console.error("Form submission failed:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto w-1/2 mt-8 p-4 border"
    >
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="requestNo"
          id="requestNo"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          onChange={handleInputChange}
        />
        <label className=" uppercase peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          request no
        </label>
      </div>
      <label className="block mb-2">
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