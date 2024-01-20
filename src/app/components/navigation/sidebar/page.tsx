<div>
  <div>
    <table className="w-full  bg-gray-100">
      <tbody>
        <tr>
          {/* Request No and Date in one row */}
          <td className="border-[1px] border-b-1 py-2 px-4 border-gray-600">
            <div className="font-semibold text-sm text-gray-900">
              Request No: {request.requestNo}
            </div>
          </td>

          <td className="border-[1px] border-b-1 py-2 px-4 border-gray-600">
            <div className="font-semibold text-sm text-gray-900">
              Date: {request.date}
            </div>
          </td>
        </tr>

        <tr>
          {/* Request No and Date in one row */}
          <td className="border-[1px] border-b-1 py-2 px-4 border-gray-600">
            <div className="font-semibold text-sm text-gray-900">
              Requested By: {request.requestedBy}
            </div>
          </td>

          <td className="border-[1px] border-b-1 py-2 px-4 border-gray-600">
            <div className="font-semibold text-sm text-gray-900">
              Request For: {request.requestFor}
            </div>
          </td>
        </tr>

        <tr>
          {/* Request No and Date in one row */}
          <td className="border-[1px] border-b-1 py-2 px-4 border-gray-600">
            <div className="font-semibold text-sm text-gray-900">
              Department: {request.department}
            </div>
          </td>

          <td className="border-[1px] border-b-1 py-2 px-4 border-gray-600">
            <div className="font-semibold text-sm text-gray-900">
              Employee Id: {request.employeeId}
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
              Designation: {request.designation}
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
              Reason of Request: {request.reasonOfRequest}
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
              Service Details: {request.serviceDetails}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  {/* ... (other details) */}
  <div className="flex space-x-2 mt-2">
    {/* <button
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
</button> */}
  </div>
</div>;
