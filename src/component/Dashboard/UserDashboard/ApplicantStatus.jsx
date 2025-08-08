 
import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

const ApplicantStatus = () => {
  const loadingRef = useRef();
  // const officerData = useSelector(state => state.user.officerData);
  // const userData = useSelector(state => state.user.userData);
  const loginUser = useSelector(state => state.user.loginUser);
  // console.log(officerData,"officerData")
  // console.log(userData,"userData")
  console.log(loginUser,"loginUser")
  let user =loginUser.data
  

  useEffect(() => {
    if (loadingRef.current) {
      loadingRef.current.classList.add('hidden');
    }
  }, []);

  return (
    <main className="flex-1 max-h-full p-5 overflow-y-auto">
      <div
        ref={loadingRef}
        className="fixed inset-0 z-50 flex items-center justify-center text-white bg-black bg-opacity-50"
        style={{ backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}
      >
        Loading.....
      </div>
    
      <div className="h-8 bg-linear-to-r from-cyan-500 to-blue-500">
          <h4 className="text-sm/6 text-black font-semibold whitespace-nowrap">Successfully login :{user.consumer_name}</h4>
      </div>
      <div className="mt-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Application No</th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">frim Name</th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Circle Name</th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Type of change</th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Load Change type</th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
               
                  <tr  className="transition-all hover:bg-gray-100 hover:shadow-lg">
                    <td className="px-6 py-4 whitespace-nowrap">
                     {user.application_no}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.consumer_name}</div>
                     
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">{user.circle}</span>
                    </td>
                    
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{user.type_of_change}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{user.lc_type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">{user.application_status}</span>
                    </td>
                    <td className="px-6 py-4  text-sm font-medium text-right whitespace-nowrap">
                      <button className="bg-blue-500 text-indigo-600 hover:text-indigo-900 "> <NavLink to='/user-dashboard/applicant-padding-application' >View Application</NavLink></button>
                    </td>
                  </tr>
               
              </tbody>
            </table>
          </div>
     
    </main>
  );
};

export default ApplicantStatus;

