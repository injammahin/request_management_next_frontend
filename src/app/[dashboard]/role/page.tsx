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
        localStorage.setItem("roles", JSON.stringify(response.data));
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
