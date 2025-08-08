import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
export default function ApplicantPaddingApplication() {
  const loginUser = useSelector(state => state.user.loginUser);
  let user = loginUser.data
  console.log(loginUser, "loginUser")
  return (
    <>
      <h3 className="mt-6 text-xl">Users</h3>
      <div className="mt-6 ml-30 mr-30 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th>S No.</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Particular</th>
              <th>Details</th>
            </tr>

          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="transition-all hover:bg-gray-100 hover:shadow-lg">
              <td className="px-6 py-4 whitespace-nowrap">
                1
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">Application No.</span>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                {user.application_no}
              </td>
            </tr>
            <tr className="transition-all hover:bg-gray-100 hover:shadow-lg">
              <td className="px-6 py-4 whitespace-nowrap">
                2
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">Consumer No.</span>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                {user.consumer_id}
              </td>
            </tr>
            <tr className="transition-all hover:bg-gray-100 hover:shadow-lg">
              <td className="px-6 py-4 whitespace-nowrap">
                3
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">Firm Name.</span>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                {user.consumer_name}
              </td>
            </tr>
            <tr className="transition-all hover:bg-gray-100 hover:shadow-lg">
              <td className="px-6 py-4 whitespace-nowrap">
                4
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">Supply Voltage</span>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                {user.new_supply_voltage}
              </td>
            </tr>
            <tr className="transition-all hover:bg-gray-100 hover:shadow-lg">
              <td className="px-6 py-4 whitespace-nowrap">
                5
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">Contract Demand.</span>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                {user.new_contact_demand}
              </td>
            </tr>
            {(user.application_status === 1 || user.application_status === 3) && (
              <tr className="transition-all hover:bg-gray-100 hover:shadow-lg">
                <td className="px-6 py-4 whitespace-nowrap">
                  6
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                    Update Application
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                  <button><NavLink to={`/ht-load-change/update/${user.application_no}`}>Update Details</NavLink></button>
                </td>
              </tr>
            )}

            {user.application_status === 1 && (
              <tr className="transition-all hover:bg-gray-100 hover:shadow-lg">
                <td className="px-6 py-4 whitespace-nowrap">
                  7
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full"> Pay Registration</span>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                  <button class="bg-cyan-500 ...">pay</button>

                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}