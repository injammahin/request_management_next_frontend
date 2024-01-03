"use client";
import React, { useState } from "react";
import axios from "axios";

interface PaymentFormProps {
  onSuccess: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSuccess }) => {
  const [paymentDetails, setPaymentDetails] = useState({
    paymentway: "",
    reference: "",
    amount: 0,
    due: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      paymentway: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/service-requests/fillup",
        paymentDetails
      );
      console.log("Payment successful:", response.data);
      onSuccess();
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 border">
      <label className="block mb-2">
        Payment Way:
        <select
          name="paymentway"
          onChange={handleSelectChange}
          className="block w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Payment Method</option>
          <option value="bkash">bKash</option>
          <option value="nagad">Nagad</option>
          <option value="card">Card</option>
          <option value="rocket">Rocket</option>
        </select>
      </label>
      <label className="block mb-2">
        Reference:
        <input
          type="text"
          name="reference"
          onChange={handleInputChange}
          className="block w-full p-2 border border-gray-300 rounded"
        />
      </label>
      <label className="block mb-2">
        Amount:
        <input
          type="number"
          name="amount"
          onChange={handleInputChange}
          className="block w-full p-2 border border-gray-300 rounded"
        />
      </label>
      <label className="block mb-2">
        Due:
        <input
          type="text"
          name="due"
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
      <h3>
        want to show all the payment details?
        <button className="bg-green-400 px-3 py-2 rounded-xl hover:bg-green-600">
          <a className="font-bold " href="/payment/showdetails">
            ShowDetails
          </a>
        </button>
      </h3>
    </form>
  );
};

export default PaymentForm;
