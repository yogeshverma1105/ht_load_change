import React, { use, useEffect, useState } from 'react'
import { useLocation, NavLink, useParams } from "react-router-dom";
import { getDataForPostApi } from '../../utils/handlePostApi.js'
export default function PaddingApplication() {
  const [pendingApplication, setPendingApplication] = useState([])
  const [applicationStatusName, setApplicationStatusName] = useState([])
  const [statusUrl, setStatusUrl] = useState()
  const [currentPage,setCurrantPage] =useState(0)


  const location = useLocation();
  const { application_no } = useParams();
  const { emp_id, flag_id } = location.state || {};
  useEffect(() => {
    let fetchData = async () => {

      let formData = {
        employee_id: emp_id,
        flag_id: flag_id
      }
      let response = await getDataForPostApi(formData, '/ht_load_change/get-applications-by-flag/')
      let result = await response.json();
      setPendingApplication(result.applications)

      setApplicationStatusName(result.flag)
      setStatusUrl(result.flag.name.split(" ").join('_'))
      console.log(statusUrl,"status_url")


    }
    fetchData()


  }, [])

let PageSize = 10;
let itemsLength=pendingApplication.length
let numOfPages = Math.ceil(itemsLength / PageSize)
console.log(pendingApplication.length)
let Start = currentPage * PageSize
let End = Start + PageSize

function handlePageChange (n){
  setCurrantPage(n)
}
const goToPrevPage = () => {
  setCurrantPage(prev => prev - 1);
};

const goToNextPage = () => {
  setCurrantPage(prev => prev + 1);
};
  return (
    <>

     
       <h3 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
             {applicationStatusName.name}
            </h3>
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
            {pendingApplication.slice(Start , End).map((items, index) => (
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
      <div>
        


<nav aria-label="Page navigation example">
  <ul class="inline-flex -space-x-px text-base h-10">
    <li>
      <button disabled={currentPage === 0} onClick={()=>goToPrevPage()} class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</button>
    </li>
    {[...Array(numOfPages).keys()].map(n=>(
    <li key={n}>
      <button  onClick={() => handlePageChange(n)}
  className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 
    ${n === currentPage ? 'bg-blue-500 text-white' : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700'}
    dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
  {n + 1}</button>
    </li>
    ))}
     <li>
      <button disabled={currentPage === numOfPages - 1} onClick={()=>goToNextPage()} className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</button>
    </li>
    
   
  </ul>
</nav>

       
      </div>
    </>
  )
}
