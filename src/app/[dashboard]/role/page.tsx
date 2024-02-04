"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface Roles {
  [key: string]: string[]; // Define the structure of your roles data
}

const RolesDisplayComponent: React.FC = () => {
  const [roles, setRoles] = useState<Roles>({}); // Use the Roles interface for typing the state

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/users/all-roles"
        );
        setRoles(response.data);
        console.log(response.data);
        if (response.data.superadmin) {
          localStorage.setItem("superadmin", response.data.superadmin);
        }
        if (response.data.subadmin) {
          localStorage.setItem("subadmin", response.data.subadmin);
        }
        if (response.data.ciso) {
          localStorage.setItem("ciso", response.data.ciso);
        }
        if (response.data.head) {
          localStorage.setItem("head", response.data.head);
        }
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      }
    };

    fetchRoles();
  }, []);

  return (
    <div>
      {Object.entries(roles).map(([role, members], index) => (
        <div key={index}>
          <h3>{role}</h3>
          <ul>
            {members.map((member, memberIndex) => (
              <li key={memberIndex}>{member}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default RolesDisplayComponent;
