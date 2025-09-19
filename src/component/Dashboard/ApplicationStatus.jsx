 
import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

const ApplicationStatus = () => {
  const loadingRef = useRef();
  const officerData = useSelector(state => state.user.officerData);
  // const userData = useSelector(state => state.user.userData);
  // const loginUser = useSelector(state => state.user.loginUser);
  console.log(officerData,"officerData")
  // console.log(userData,"userData")
  // console.log(loginUser,"loginUser")
  

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
          <h4 className="text-sm/6 text-black font-semibold whitespace-nowrap">Successfully login :{officerData?.employee_detail?.employee_name}</h4>
      </div>
       <div className="grid grid-cols-1 mt-6 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {officerData?.flags?.map((items,index) => (
              <div key={index} className="p-4 border rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    {items.application_status ==="pending for agreement finalization" ?(
                      <span className="text-gray-400">Proceed after providing E-stamp by Applicant</span>

                    ):items.application_status ==="connection served" ?(
                   
                      <span className="text-gray-400"> Load Released</span>

                    
                  ):(
                      <span className="text-gray-400">{items.application_status}</span>
                    )}
                    
                    <div className="text-lg font-semibold">{items.designation}</div>
                  </div>
                  {/* <div className="w-10 h-10 bg-gray-200 rounded">{items.designation}</div> */}
                </div>
                <div className="mt-2">
                  <span className="px-2 py-1 text-sm text-white bg-green-300 rounded"> <NavLink to="/dashboard/padding_Application" state={{ emp_id: officerData.employee_detail.employee_login_id, flag_id: items.id }}>{items.count}</NavLink></span>
                  {/* <span>from 2019</span> */}
                </div>
              </div>
            ))}
          </div>
    </main>
  );
};

export default ApplicationStatus;

