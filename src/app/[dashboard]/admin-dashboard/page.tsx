// src/pages/admin-dashboard.tsx
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navigation/page";

interface SubmittedForm {
  id: number;
  date: string;
  department: string;
  designation: string;
  employeeId: string;
  reasonOfRequest: string;
  requestFor: string;
  requestNo: string;
  requestedBy: string;
  serviceDetails: string;
}

const AdminDashboard = () => {
  const [submittedForms, setSubmittedForms] = useState<SubmittedForm[]>([]);
  const [selectedForm, setSelectedForm] = useState<SubmittedForm | null>(null);
  const [showAllForms, setShowAllForms] = useState(false);
  const [expandedForms, setExpandedForms] = useState<Record<number, boolean>>(
    {}
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // This function will be called by the Navbar component
  const handleMenuToggle = (isOpen: boolean) => {
    setIsMenuOpen(isOpen);
  };

  useEffect(() => {
    fetchSubmittedForms();
  }, []);

  const fetchSubmittedForms = async () => {
    try {
      const response = await axios.get<SubmittedForm[]>(
        "http://localhost:3001/service-requests"
      );
      setSubmittedForms(response.data);
      setSelectedForm(null);
    } catch (error) {
      console.error("Error fetching submitted forms:", error);
    }
  };

  const handleFormClick = (form: SubmittedForm) => {
    setSelectedForm(form);
  };

  const handleApprove = (form: SubmittedForm) => {
    console.log(`Approve form with ID ${form.id}`);
  };

  const handleDelete = async (form: SubmittedForm) => {
    try {
      const isConfirmed = window.confirm(
        `Are you sure you want to delete the form with ID ${form.id}?`
      );

      if (!isConfirmed) {
        return;
      }

      await axios.delete(`http://localhost:3001/service-requests/${form.id}`);

      setSubmittedForms((prevForms) =>
        prevForms.filter((prevForm) => prevForm.id !== form.id)
      );

      setSelectedForm(null);

      console.log(`Form with ID ${form.id} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting form with ID ${form.id}:`, error);
    }
  };

  const handleRevision = (form: SubmittedForm) => {
    console.log(`Request revision for form with ID ${form.id}`);
  };

  const toggleFormExpansion = (formId: number) => {
    setExpandedForms((prevExpandedForms) => ({
      ...prevExpandedForms,
      [formId]: !prevExpandedForms[formId],
    }));
  };

  return (
    <div
      className={`bg-gray-100 min-h-screen ${isMenuOpen ? "menu-open" : ""}`}
    >
      <Navbar userRole={"supervisor"} onMenuToggle={handleMenuToggle} />
      <div
        className={`container mx-auto p-6 ${
          isMenuOpen ? "translate-x-[300px]" : ""
        }`}
      >
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
          onClick={() => setShowAllForms((prev) => !prev)}
        >
          {showAllForms ? "Hide Forms" : "Show All Submitted Forms"}
        </button>

        <div>
          <h2 className="text-2xl font-bold mb-4">
            {showAllForms ? "All Submitted Forms" : "Selected Form"}
          </h2>
          {showAllForms ? (
            submittedForms.map((form) => (
              <div key={form.id} className="border p-4 mb-4 cursor-pointer">
                <div className="font-semibold text-sm text-gray-900">
                  Request No: {form.requestNo}
                </div>
                <button
                  className="text-white  bg-green-500 rounded-sm w-28 h-8 hover:bg-green-700"
                  onClick={() => toggleFormExpansion(form.id)}
                >
                  Show More
                </button>
                {expandedForms[form.id] && (
                  <div>
                    <div>
                      <table className="w-full  bg-gray-100">
                        <tbody>
                          <tr>
                            {/* Request No and Date in one row */}
                            <td className="border-[1px] border-b-1 py-2 px-4 border-gray-600">
                              <div className="font-semibold text-sm text-gray-900">
                                Request No: {form.requestNo}
                              </div>
                            </td>

                            <td className="border-[1px] border-b-1 py-2 px-4 border-gray-600">
                              <div className="font-semibold text-sm text-gray-900">
                                Date: {form.date}
                              </div>
                            </td>
                          </tr>

                          <tr>
                            {/* Request No and Date in one row */}
                            <td className="border-[1px] border-b-1 py-2 px-4 border-gray-600">
                              <div className="font-semibold text-sm text-gray-900">
                                Requested By: {form.requestedBy}
                              </div>
                            </td>

                            <td className="border-[1px] border-b-1 py-2 px-4 border-gray-600">
                              <div className="font-semibold text-sm text-gray-900">
                                Request For: {form.requestFor}
                              </div>
                            </td>
                          </tr>

                          <tr>
                            {/* Request No and Date in one row */}
                            <td className="border-[1px] border-b-1 py-2 px-4 border-gray-600">
                              <div className="font-semibold text-sm text-gray-900">
                                Department: {form.department}
                              </div>
                            </td>

                            <td className="border-[1px] border-b-1 py-2 px-4 border-gray-600">
                              <div className="font-semibold text-sm text-gray-900">
                                Employee Id: {form.employeeId}
                              </div>
                            </td>
                          </tr>

                          <tr>
                            {/* Designation in a separate row */}
                            <td
                              colSpan={2}
                              className="border-[1px] border-b-1 py-2 px-4 border-gray-600"
                            >
                              <div className="font-semibold text-sm text-gray-900">
                                Designation: {form.designation}
                              </div>
                            </td>
                          </tr>

                          <tr>
                            {/* Reason of Request in a separate row */}
                            <td
                              colSpan={2}
                              className="border-[1px] border-b-1 py-2 px-4 border-gray-600"
                            >
                              <div className="font-semibold text-sm text-gray-900">
                                Reason of Request: {form.reasonOfRequest}
                              </div>
                            </td>
                          </tr>

                          <tr>
                            {/* Service Details in a separate row */}
                            <td
                              colSpan={2}
                              className="border-[1px] border-b-1 py-2 px-4 border-gray-600"
                            >
                              <div className="font-semibold text-sm text-gray-900">
                                Service Details: {form.serviceDetails}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    {/* ... (other details) */}
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
                        Decline
                      </button>
                      <button
                        className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-700"
                        onClick={() => handleRevision(form)}
                      >
                        Revision
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div
              className="border p-4 mb-4 cursor-pointer"
              onClick={() => handleFormClick(selectedForm as SubmittedForm)}
            >
              {/* ... (selected form details) */}
              {/* <div className="flex space-x-2 mt-2">
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
                  Decline
                </button>
                <button
                  className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-700"
                  onClick={() => handleRevision(selectedForm as SubmittedForm)}
                >
                  Revision
                </button>
              </div> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
