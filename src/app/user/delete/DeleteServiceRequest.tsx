import { useState, useEffect } from "react";
import axios from "axios";

interface ServiceRequest {
  id: number;
  requestNo: string;
  // other properties...
}

export default function DeleteServiceRequest() {
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get<ServiceRequest[]>(
          "http://localhost:3001/service-requests"
        );
        setServiceRequests(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  function handleDelete(id: number) {
    try {
      axios.delete(`http://localhost:3001/service-requests/${id}`);
      setServiceRequests((prevServiceRequests) =>
        prevServiceRequests.filter((request) => request.id !== id)
      );
    } catch (error) {
      console.error("Error deleting service request:", error);
    }
  }

  return (
    <div>
      <h2>Service Requests</h2>
      <ul>
        {serviceRequests.map((request) => (
          <li key={request.id}>
            <p>Request No: {request.requestNo}</p>
            {/* Render other properties */}
            <button onClick={() => handleDelete(request.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
