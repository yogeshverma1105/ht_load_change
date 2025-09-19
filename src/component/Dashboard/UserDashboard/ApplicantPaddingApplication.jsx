import React from 'react'
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
export default function ApplicantPaddingApplication() {
  const loginUser = useSelector(state => state.user.loginUser);
  let user = loginUser
  return (
    <>
      <h3 className="mt-6 text-xl">Users</h3>
      <div className="mt-6 ml-30 mr-30 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 broder-2">
          {/* <thead className="bg-gray-50">
            <tr>
              <th>S No.</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Particular</th>
              <th>Details</th>
            </tr>

          </thead> */}
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="transition-all hover:bg-gray-100 hover:shadow-lg">
              <th className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">Application No.</span>
              </th>
              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                {user.application_no}
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
                <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">Firm Name.</span>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                {user.consumer_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">Mobile N.</span>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                {user.mobile}
              </td>
            </tr>
            <tr className="transition-all hover:bg-gray-100 hover:shadow-lg">

              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">Exising Supply Voltage</span>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                {user.existing_supply_voltage}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">Existing Contract Demand</span>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                {user.existing_contract_demand}
              </td>
            </tr>
            <tr className="transition-all hover:bg-gray-100 hover:shadow-lg">

              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">New Supply Voltage</span>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                {user.new_supply_voltage}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">New Contract Demand</span>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                {user.new_contact_demand}
              </td>
            </tr>
            <tr className="transition-all hover:bg-gray-100 hover:shadow-lg">


            </tr>
            <tr className="transition-all hover:bg-gray-100 hover:shadow-lg">

              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">Contract Demand Difference.</span>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                {user.contract_demand_difference}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">Type Of Change.</span>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                {user.type_of_change}
              </td>
              {/* {(user.application_status === 1 || user.application_status === 3) && (
                <>
             
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                    Update Application
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                  <button><NavLink to={`/ht-load-change/update/${user.application_no}`}>Update Details</NavLink></button>
                </td>
                </>
              
            )} */}
            </tr>
            <tr className="transition-all hover:bg-gray-100 hover:shadow-lg">

              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">Sub type of Chnage</span>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                {user?.lc_type}
              </td>
            </tr>
              <tr className="transition-all hover:bg-gray-100 hover:shadow-lg">
                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                   {user.application_status === 1 && (
                  <div className="flex flex-wrap gap-4 ">
                    <button
                      type="button"
                      className="flex-1 bg-purple-700 text-white py-2 rounded uppercase text-sm font-semibold hover:bg-purple-800 transition"
                    >
                      Pay Registration
                    </button>
                  </div>
                   )}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                  {(user.application_status === 1 || user.application_status === 3) && (
                  <div className="flex flex-wrap gap-4 ">
                    <button
                      type="button"
                      className="flex-1 bg-purple-700 text-white py-2 rounded uppercase text-sm font-semibold hover:bg-purple-800 transition"
                    >
                      <Link to={`/ht-load-change/update/${user.application_no}`}state={{ data: user }}>
                        Update Application
                      </Link>
                    </button>
                  </div>
                   )}
                </td>
              </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}