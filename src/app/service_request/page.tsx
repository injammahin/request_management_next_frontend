"use client";
import React, { useState } from "react";

const ServiceRequestForm: React.FC = () => {
  const [formData, setFormData] = useState({
    requestNo: "",
    requestedBy: "",
    department: "",
    designation: "",
    date: "",
    requestFor: "",
    employeeId: "",
    reason: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="requestNo">Request No:</label>
        <input
          type="text"
          id="requestNo"
          name="requestNo"
          value={formData.requestNo}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="requestedBy">Requested By:</label>
        <input
          type="text"
          id="requestedBy"
          name="requestedBy"
          value={formData.requestedBy}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="department">Department:</label>
        <input
          type="text"
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="designation">Designation:</label>
        <input
          type="text"
          id="designation"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="requestFor">Request For:</label>
        <input
          type="text"
          id="requestFor"
          name="requestFor"
          value={formData.requestFor}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="employeeId">Employee ID:</label>
        <input
          type="text"
          id="employeeId"
          name="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="reason">Reason of Request:</label>
        <textarea
          id="reason"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
        ></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ServiceRequestForm;
