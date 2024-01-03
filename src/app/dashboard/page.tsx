import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <h2>
        are you are to create a service request:
        <button>
          <Link href="service_request"> create</Link>
        </button>
      </h2>
    </div>
  );
};

export default page;
