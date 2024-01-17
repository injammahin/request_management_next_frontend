// src/pages/admin-dashboard.tsx
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navigation/page";

interface SubmittedForm {
  id: number;
  requestNo: string;
  date: string;
  requestedBy: string;
  // Add other properties based on your form structure
}

const AdminDashboard = () => {
  const [submittedForms, setSubmittedForms] = useState<SubmittedForm[]>([]);
  const [selectedForm, setSelectedForm] = useState<SubmittedForm | null>(null);
  const [showAllForms, setShowAllForms] = useState(false);

  useEffect(() => {
    // Fetch submitted forms when the component mounts
    fetchSubmittedForms();
  }, []);

  const fetchSubmittedForms = async () => {
    try {
      const response = await axios.get<SubmittedForm[]>(
        "http://localhost:3001/service-requests"
      );
      setSubmittedForms(response.data);
      // Reset selected form when fetching all forms
      setSelectedForm(null);
    } catch (error) {
      console.error("Error fetching submitted forms:", error);
    }
  };

  const handleFormClick = (form: SubmittedForm) => {
    setSelectedForm(form);
  };

  const handleApprove = (form: SubmittedForm) => {
    // Add logic to handle form approval
    console.log(`Approve form with ID ${form.id}`);
  };

  const handleDelete = (form: SubmittedForm) => {
    // Add logic to handle form deletion
    console.log(`Delete form with ID ${form.id}`);
  };

  const handleRevision = (form: SubmittedForm) => {
    // Add logic to handle form revision
    console.log(`Request revision for form with ID ${form.id}`);
  };

  const handleShowAllForms = () => {
    setShowAllForms((prevShowAllForms) => !prevShowAllForms);
  };

  return (
    <div>
      <Navbar userRole={"admin"} />

      <div className="container mx-auto p-8 pt text-center">
        <div className="mb-8 relative group">
          <h2 className="text-3xl uppercase font-bold mb-2 pt-16 group-hover:text-blue-500">
            Welcome to your admin dashboard
          </h2>
          <h2 className="text-xl uppercase font-bold mb-2 pt-16 group-hover:text-gray-900">
            Click the menu button to show more
          </h2>
        </div>

        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 mt-4"
          onClick={handleShowAllForms}
        >
          {showAllForms ? "Hide Forms" : "Show All Submitted Forms"}
        </button>

        <div>
          <h2 className="text-2xl font-bold mb-4">
            {showAllForms ? "All Submitted Forms" : "Selected Form"}
          </h2>
          {showAllForms ? (
            submittedForms.map((form) => (
              <div
                key={form.id}
                className="border p-4 mb-4 cursor-pointer"
                onClick={() => handleFormClick(form)}
              >
                <p>
                  <strong>Request No:</strong> {form.requestNo}
                </p>
                <p>
                  <strong>Date:</strong> {form.date}
                </p>
                <p>
                  <strong>Requested By:</strong> {form.requestedBy}
                </p>
                {/* ... (other details) */}
                {/* Buttons for actions */}
                <div className="flex space-x-2 mt-2">
                  <button
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-700"
                    onClick={() => handleApprove(form)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
                    onClick={() => handleDelete(form)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-700"
                    onClick={() => handleRevision(form)}
                  >
                    Request Revision
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div
              className="border p-4 mb-4 cursor-pointer"
              onClick={() => handleFormClick(selectedForm as SubmittedForm)}
            >
              {/* ... (selected form details) */}
              {/* Buttons for actions */}
              <div className="flex space-x-2 mt-2">
                <button
                  className="bg-green-500 text-white p-2 rounded hover:bg-green-700"
                  onClick={() => handleApprove(selectedForm as SubmittedForm)}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
                  onClick={() => handleDelete(selectedForm as SubmittedForm)}
                >
                  Delete
                </button>
                <button
                  className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-700"
                  onClick={() => handleRevision(selectedForm as SubmittedForm)}
                >
                  Request Revision
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
