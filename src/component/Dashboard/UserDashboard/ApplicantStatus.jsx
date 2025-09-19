 
import React, { useRef, useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

const ApplicantStatus = () => {
  const loadingRef = useRef();
  const [statusUrl, setStatusUrl] = useState("")
  const loginUser = useSelector(state => state.user.loginUser);
  console.log(loginUser,"userData")
  let items =loginUser.data

  
  

    useEffect(() => {
    if (items?.application_status_text) {
      setStatusUrl(items.application_status_text.split(" ").join("_"));
    }
  }, [items?.application_status_text]); 

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
          <h4 className="text-sm/6 text-black font-semibold whitespace-nowrap">Successfully login :{items?.consumer_name}</h4>
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
                     {items?.application_no}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{items?.consumer_name}</div>
                     
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">{items?.circle}</span>
                    </td>
                    
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{items?.type_of_change}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{items?.lc_type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">{items?.application_status_text}</span>
                    </td>
                    {items?.application_status === 1 ? (
                       <td className="px-6 py-4  text-sm font-medium text-right whitespace-nowrap">
                      <NavLink to={{pathname: `/user-dashboard/${statusUrl}/${items?.id}`,}}state={{ items }}
                      >
                        <button  className="border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700">View Application</button></NavLink>
                    </td>
                    ):items?.application_status === 2 ? (
                       <td className="px-6 py-4  text-sm font-medium text-right whitespace-nowrap">
                      <NavLink to={{pathname: `/user-dashboard/${statusUrl}/${items?.id}`,}}state={{ items }}
                      >
                        <button  className="border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700">View Application</button></NavLink>
                    </td>

                    
                    ):items?.application_status === 9 ? (
                       <td className="px-6 py-4  text-sm font-medium text-right whitespace-nowrap">
                      <NavLink to={{pathname: `/user-dashboard/${statusUrl}/${items?.id}`,}}state={{ items }}
                      >
                        <button  className="border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700">View Application</button></NavLink>
                    </td>

                    ):(
                      <td className="px-6 py-4  text-sm font-medium text-right whitespace-nowrap">
                     
                        <button  className="border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700">View Application</button>
                    </td>

                    )}
                   
                  </tr>
               
              </tbody>
            </table>
          </div>
     
    </main>
  );
};

export default ApplicantStatus;

