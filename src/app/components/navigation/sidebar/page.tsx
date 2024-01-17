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
</div>;
