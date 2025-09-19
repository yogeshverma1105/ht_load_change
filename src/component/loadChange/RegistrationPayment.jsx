import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { handleGetApi } from '../../utils/handleGetApi';
import { useNavigate,useLocation, Link } from 'react-router-dom';
import{Button} from'../importComponents'

const LoadChangePay = () => {
  const navigate = useNavigate();
  const location  = useLocation()
    const {result} =location.state||{}
    console.log(result,"items")


  return (
    <div className="mt-6 ml-30 mr-30 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 mt-4">
        <thead className="bg-gray-50">
          <tr>
            <th>S No.</th>
            <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Particular</th>
            <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Account Head</th>
            <th>Amount</th>
            <th>Action</th>
            

          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr className="transition-all hover:bg-gray-100 hover:shadow-lg">
            <td className="px-6 py-4 whitespace-nowrap">1</td>
            <td className="px-6 py-4 whitespace-nowrap">Registration Fee</td>
            <td className="px-6 py-4 whitespace-nowrap">48.48/50.89</td>
            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">{result?.data?.total_pay_amount}</td>
            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap"> <Link to={`https://htsanyojanuat.mpcz.in:8088/ht-load-change-api/call_lc_regfee/${result?.data?.application}`}><Button label=' Pay Registration Fee'></Button></Link></td>
          </tr>

        </tbody>
      </table>
    </div>
  );
};

export default LoadChangePay;
