"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface RequestServiceFormProps {}

interface ServiceDetails {
  user_id: string;

  employee_name: string;

  designation: string;

  department_id: string;
  [key: string]: string; // Index signature to allow any additional string properties
}

const RequestServiceForm: React.FC<RequestServiceFormProps> = ({}) => {
  const [serviceDetails, setServiceDetails] = useState<ServiceDetails>({
    user_id: "",

    employee_name: "",

    designation: "",

    department_id: "",
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
      "user_id",
      "employee_name",
      "designation",
      "department_id",
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
        "http://localhost:3001/employee/fillup",
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
      <label className="block mb-2">
        user id:
        <input
          type="text"
          name="user_id"
          onChange={handleInputChange}
          className="block w-full p-2 border border-gray-300 rounded"
        />
      </label>
      <label className="block mb-2">
        employee name:
        <input
          type="text"
          name="employee_name"
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
        department id:
        <input
          type="text"
          name="department_id"
          onChange={handleInputChange}
          className="block w-full p-2 border border-gray-300 rounded"
        />
      </label>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-700"
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
