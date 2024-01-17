"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navigation/page";

interface SubmittedForm {
  id: number;
  requestNo: string;

  // Add other properties based on your form structure
}

const AdminDashboard = () => {
  const [submittedForms, setSubmittedForms] = useState<SubmittedForm[]>([]);

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
    } catch (error) {
      console.error("Error fetching submitted forms:", error);
    }
  };
  console.log("0sjdio");
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

        <div>
          <h2 className="text-2xl font-bold mb-4">All Submitted Forms</h2>
          {submittedForms.map((form) => (
            <div key={form.id} className="border p-4 mb-4">
              <p>
                <strong>Request No:</strong> {form.id}
              </p>
              <p>
                <strong>Request No:</strong> {form.requestNo}
              </p>
              {/* Add more details based on your form structure */}
              {/* Example: */}
              {/* <p><strong>Date:</strong> {form.date}</p> */}
              {/* <p><strong>Requested By:</strong> {form.requestedBy}</p> */}
              {/* ... */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
