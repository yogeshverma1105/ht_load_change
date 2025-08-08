import React, { useState,useEffect } from 'react';
import Input from '../Input';
import { useParams,Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import{handleGetApi} from '../../utils/handleGetApi'


const LoadChangePay = () => {
  const userData = useSelector(state => state.user.userData);
  console.log(userData,"userData")
  const [registrationFeeCharges,setRegistrationFeeCharges]= useState(1100)
  const [transmissionCharges,setTransmissionCharges]= useState(1100)
  const [discomCharges,setDiscomCharges]= useState(160)
  const [totalSupplyAffording,setTotalSupplyAffording]= useState('')
  const {new_supply_voltage,connection_category,lc_type,new_contact_demand,contract_demand_difference,existing_supply_voltage,existing_contract_demand,connection_purpose_id}= userData
//  console.log(new_supply_voltage,connection_category,lc_type,new_contact_demand,contract_demand_difference,existing_supply_voltage,existing_contract_demand,connection_purpose_id,"dfdhjfd")


useEffect(() => {
  if (lc_type === "Load_Enhancement_without_Voltage_Change" || lc_type === "Load_Enhancement_with_Downgrade_Voltage_Level") {
    setTransmissionCharges(contract_demand_difference * 1100);
    setDiscomCharges(contract_demand_difference *160);
    setTotalSupplyAffording(transmissionCharges+discomCharges)
  }else if(lc_type ==="Load_Enhancement_with_Voltage_Change" || lc_type==="Only_Voltage_Upgrade"){
    setTransmissionCharges(new_contact_demand * 1100);
    setDiscomCharges(new_contact_demand * 160);
    setTotalSupplyAffording(transmissionCharges + discomCharges)
  }
}, [lc_type, contract_demand_difference]);
useEffect(()=>{
  
  const data = async ()=>{
    let dutyPercentage = await handleGetApi(`/api/get_duty_percentage_by_purpose_id_ngb/${purposeInstId}`)
    let response = await handleGetApi(`/htngb_backend/api/masters/getHtSdCalculationDetail/${connection_category}`)
   const {list: [{ monthlyFixedCharge,energyChargeUptoFiftyPer,fppasRateNew }] } = response
   console.log(monthlyFixedCharge,energyChargeUptoFiftyPer,fppasRateNew)
  }
data()

},[lc_type, contract_demand_difference])

  return (
    <>
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
                {userData.consumer_id}
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
                {userData.consumer_name}
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
                {userData.new_supply_voltage}
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
                {userData.new_contact_demand}
              </td>
            </tr>    
          </tbody>
        </table>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th>S No.</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Particular</th>
              <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Account Head </th>
              <th>Amount</th>
            </tr>

          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="transition-all hover:bg-gray-100 hover:shadow-lg">
              <td className="px-6 py-4 whitespace-nowrap">
                1
              </td>
              
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">Registration Fee</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">48.48/50.89</span>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
              {registrationFeeCharges}
              </td>
            </tr>
            
             <tr className="transition-all hover:bg-gray-100 hover:shadow-lg">
              <td colSpan={4}>
                 <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
                Supply Affording Charges 
              </h2>

              </td>
            </tr>
            <tr className="transition-all hover:bg-gray-100 hover:shadow-lg">
              <td className="px-6 py-4 whitespace-nowrap">
                2
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">Transmission Charge Rs. @1100 per KVA </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">48.48/50.89</span>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
              {transmissionCharges}
              </td>
            </tr>
            <tr className="transition-all hover:bg-gray-100 hover:shadow-lg">
              <td className="px-6 py-4 whitespace-nowrap">
                3
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">Discom Charge Rs. @160 per KVA</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">48.48/50.89</span>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
              {discomCharges}
              </td>
            </tr>
            <tr className="transition-all hover:bg-gray-100 hover:shadow-lg">
             
              <td colSpan={2}  className="px-6 py-4 whitespace-nowrap">
                
              </td>
              <td className="px-6 py-4 whitespace-nowrap" >
                <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">Total Supply Affording Charges </span>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
              {totalSupplyAffording}
              </td>
            </tr>
            <tr className="transition-all hover:bg-gray-100 hover:shadow-lg">
              <td className="px-6 py-4 whitespace-nowrap">
                4
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">Security Deposit (SD)</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">48.48/50.89</span>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
              
              </td>
            </tr>
           
          </tbody>
        </table>
      </div>
      {/* <form>
        <div className="space-y-12 container mx-auto border my-5  rounded-md border-gray shadow-md">
          <div className="border-b border-gray-900/10 pb-12">
            <div class="block mb-2 border-b-2 p-2 ">
              <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
                HT NSC Load Change Application
              </h2>
              <p className="mt-1 text-sm/6 text-gray-600">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>
            <div className="body p-4">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
                  Consumer Details
                </h2>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <Input
                    LName="Application No."
                    Iname="application_no"
                    type="text"
                    placeholder=""
                    value={userDataData.application_no}
                  />
                  <Input LName="Consumer No." value={userData.consumer_id} Iname="Consumer_no" type="text" placeholder="" />
                  <Input LName="Consumer Name."value={userData.consumer_name} Iname="Consumer_name" type="text" placeholder="" />
                  <Input LName="Mobile No." value={userData.mobile} Iname="mobile_no" type="text" placeholder="" />
                  <Input LName="Email."value={userData.email} Iname="email" type="text" placeholder="" />
                  <Input LName="Connection Date."value={userData.connection_date} Iname="connection_date" type="text" placeholder="" />
                  <Input LName="Connection Category."value={userData.connection_category} Iname="connection_category" type="text" placeholder="" />
                  <Input LName="Connection Sub Category."value={userData.connection_sub_category} Iname="connection_sub_category" type="text" placeholder="" />
                  <Input LName="Connection Purpose."value={userData.connection_purpose} Iname="connection_purpose" type="text" placeholder="" />
                  <Input LName="Existing Supply Voltage."value={userData.existing_supply_voltage} Iname="existing_supply_voltage" type="text" placeholder="" />
                  <Input LName="Existing Contract Demand."value={userData.existing_contract_demand} Iname="existing_contract_demand" type="text" placeholder="" />
                </div>
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
                  Required Load Details
                </h2>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <Input
                    LName="Type of change "
                    Iname="type_of_change"
                    type="text"
                    placeholder=""
                    value={userData.type_of_change}
                  />
                  <Input
                    LName="new Supply Voltage"
                    Iname="new_supply_voltage"
                    type="text"
                    placeholder=""
                    value={userData.new_supply_voltage}
                  />
                  <Input
                    LName="Total Required Contract Demand(in KVA)"
                    Iname="new_contract_demand"
                    type="text"
                    placeholder=""
                    value={userData.new_contact_demand}
                  />
                </div>
              </div>
              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-4">
                  <button
                    type="button"
                    class="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300"
                  >
                    Any Update For Application
                  </button>
                  <button
                    type="button"
                    class="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300"
                  >
                    View Application PDF
                  </button>
                 <Link
  type="button"
  className="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300"
  to={{
    pathname: `/ht-load-change/pay-by-online/${userData.application_no}`
  }}
>
  Pay By Online
</Link>
                  <Link
                    type="button"
                    class="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300"
                    
                  >
                    Pay By Challen
                  </Link>
                </div>
              </div>

              <div className="border-b border-gray-900/10 pb-12 ">
                <div className="mt-10 flex flex-col justify-center items-center">
                  <div className="flex space-x-2 space-y-2 flex-wrap justify-center items-baseline"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form> */}
    </>
  );
};
export default LoadChangePay;
