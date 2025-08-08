import React from 'react'

function PaddingDetailsTable() {
  return (
    <div className="mt-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Application No</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Firm Name</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Circle Name</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Division</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Type of change</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Load Change type</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pendingApplication.map((items, index) => (
              <tr key={index} className="transition-all hover:bg-gray-100 hover:shadow-lg">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{items.application_no}</div>
                      {/* <div className="text-sm text-gray-500">ahmed.kamel@example.com</div> */}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{items.consumer_name}</div>
                  {/* <div className="text-sm text-gray-500">Optimization</div> */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">{items.circle}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{items.division}</td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{items.type_of_change}</td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{items.lc_type}</td>
                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                  <NavLink to={`/dashboard/${statusUrl}/${items.id}`} className="text-indigo-600 hover:text-indigo-900">Edit</NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  )
}

export default PaddingDetailsTable