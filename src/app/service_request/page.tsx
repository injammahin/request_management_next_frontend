"use client";
import React, { useState } from "react";
import axios from "axios";

interface PaymentFormProps {}

const RequestServiceForm: React.FC<PaymentFormProps> = ({}) => {
  const [serviceDetails, setServiceDetails] = useState({
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setServiceDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setServiceDetails((prevDetails) => ({
  //     ...prevDetails,
  //     paymentway: e.target.value,
  //   }));
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/service-requests/fillup",
        serviceDetails
      );
      console.log("form submit successful:", response.data);
    } catch (error) {
      console.error("Request  failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 border">
      <label className="block mb-2">
        requestNo:
        <input
          type="text"
          name="requestNo"
          onChange={handleInputChange}
          className="block w-full p-2 border border-gray-300 rounded"
        />
      </label>
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
        Submit Payment
      </button>
    </form>
  );
};

export default RequestServiceForm;
