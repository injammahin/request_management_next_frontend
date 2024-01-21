"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Navbar from "@/app/components/navigation/page";
import Link from "next/link";

interface RequestServiceFormProps {}

interface ServiceDetails {
  department_id: string;

  department_name: string;

  department_supervisor: string;
  [key: string]: string; // Index signature to allow any additional string properties
}

const RequestServiceForm: React.FC<RequestServiceFormProps> = ({}) => {
  const [serviceDetails, setServiceDetails] = useState<ServiceDetails>({
    department_id: "",

    department_name: "",

    department_supervisor: "",
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
      "department_id",
      "department_name",
      "department_supervisor",
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
        "http://localhost:3001/department_information/fillup",
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
    <div>
      <Navbar
        userRole={""}
        onMenuToggle={function (isOpen: boolean): void {
          throw new Error("Function not implemented.");
        }}
      />
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto w-1/2 mt-8 p-4 border"
      >
        <label className="block mb-2">
          department id:
          <input
            type="text"
            name="department_id"
            onChange={handleInputChange}
            className="block w-full p-2 border border-gray-300 rounded"
          />
        </label>
        <label className="block mb-2">
          department name:
          <input
            type="text"
            name="department_name"
            onChange={handleInputChange}
            className="block w-full p-2 border border-gray-300 rounded"
          />
        </label>
        <label className="block mb-2">
          department supervisor:
          <input
            type="text"
            name="department_supervisor"
            onChange={handleInputChange}
            className="block w-full p-2 border border-gray-300 rounded"
          />
        </label>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-gray-500 text-white p-2 w-32 rounded hover:bg-gray-700"
          >
            <Link href="/dashboard">back</Link>
          </button>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-700"
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
