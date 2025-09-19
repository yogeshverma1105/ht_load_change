import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { handleGetApi } from '../../utils/handleGetApi';
import { useNavigate } from 'react-router-dom';
import {HT_NSC_BASE,NGB_UAT_BASE,HT_LOAD_CHANGE_BASE} from "../../api/api.js"

const LoadChangePay = () => {
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const {
    new_supply_voltage,
    connection_category,
    lc_type,
    new_contact_demand,
    contract_demand_difference,
    connection_purpose_id,
    consumer_id,
    consumer_name,
    application_no,
    existing_supply_voltage,
    existing_contract_demand,
    id,
    type_of_change,
    registration_pdf,
  } = useSelector(state => state.user.userData);

  const fppasRateNew = 0.0841;
  const unitPerKva = 190;
  let registrationFeeCharges = 16800;
  const transcoCharges = 1100;
  const discomCharges = 160;
  if(type_of_change==="Load_Reduction"){
    registrationFeeCharges = 25
  }

  const [charges, setCharges] = useState({
    totalTranscoCharges: 0,
    totalDiscomCharges: 0,
    totalSupplyAffording: 0,
    fixedCharge: 0,
    fixedChargeAmount: 0,
    energyCharge: 0,
    energyChargeAmount: 0,
    fppasChargeAmount: 0,
    eDutyCharge: 0,
    eDutyChargeAmount: 0,
    totalChargesAmount: 0,
    sdDays: 0,
    totalSdRequired: 0,
    totalSdDayAmount: 0,
    totalPayAbleAmount: 0,
  });
const supplyVoltageMap = {
  "11 KV": "A",
  "33 KV": "B",
  "132 KV": "C",
  "220 KV": "D"
};
console.log(registration_pdf,"registration_pdf")


  useEffect(() => {
    if(type_of_change!=="Load_Reduction"){
    const demand =
      ["Load_Enhancement_without_Voltage_Change", "Load_Enhancement_with_Downgrade_Voltage_Level"].includes(lc_type)
        ? contract_demand_difference
        : new_contact_demand;

    const totalTranscoCharges = demand * transcoCharges;
    const totalDiscomCharges = demand * discomCharges;
    const totalSupplyAffording = totalTranscoCharges + totalDiscomCharges;
       setCharges(prev => ({ ...prev, totalTranscoCharges, totalDiscomCharges, totalSupplyAffording }));
    }
    else{
      setCharges(prev => ({ ...prev,totalPayAbleAmount:25  }));
    }
  }, [lc_type, contract_demand_difference, new_contact_demand]);
  

  useEffect(() => {
  if (type_of_change !== "Load_Reduction") {
    const demand =
      ["Load_Enhancement_without_Voltage_Change", "Load_Enhancement_with_Downgrade_Voltage_Level"].includes(lc_type)
        ? contract_demand_difference
        : new_contact_demand;

    const totalTranscoCharges = demand * transcoCharges;
    const totalDiscomCharges = demand * discomCharges;
    const totalSupplyAffording = totalTranscoCharges + totalDiscomCharges;

    // Fetch duty and charges in the same block
    const fetchCharges = async () => {
      const supplyVoltageLabel = supplyVoltageMap[new_supply_voltage] || "";
      let new_connection_category = connection_category.slice(0, -1) + supplyVoltageLabel;

      try {
        const dutyRes = await handleGetApi(`${HT_NSC_BASE}/get_duty_percentage_by_purpose_id_ngb/${connection_purpose_id}`);
        const chargeRes = await handleGetApi(`${NGB_UAT_BASE}/api/masters/getHtSdCalculationDetail/${new_connection_category}`);

        const monthlyFixedCharge = chargeRes?.list?.[0]?.monthlyFixedCharge || 0;
        const energyRate = (chargeRes?.list?.[0]?.energyChargeUptoFiftyPer || 0) / 100;
        const dutyPercentage = dutyRes?.duty_percentages?.[0] || 0;

        const fixedAmount = contract_demand_difference * monthlyFixedCharge;
        const energyAmount = contract_demand_difference * unitPerKva * energyRate;
        const fppasAmount = Math.round(energyAmount * fppasRateNew);
        const dutyAmount = Math.round(((energyAmount + fppasAmount) * dutyPercentage) / 100);
        const totalChargesAmount = fixedAmount + energyAmount + fppasAmount + dutyAmount;

        const sdDays = [48, 24, 189, 190].includes(Number(connection_purpose_id)) ? 90 : 45;
        const totalSdDayAmount = Math.ceil(totalChargesAmount * sdDays / 30) ;
        const totalSdRequired = Math.ceil(totalSdDayAmount / 100) * 100;

        const totalPayAbleAmount = totalSdRequired + totalSupplyAffording; // Same block me calculate

        setCharges({
          totalTranscoCharges,
          totalDiscomCharges,
          totalSupplyAffording,
          fixedCharge: monthlyFixedCharge,
          fixedChargeAmount: fixedAmount,
          energyCharge: energyRate,
          energyChargeAmount: energyAmount,
          fppasChargeAmount: fppasAmount,
          eDutyCharge: dutyPercentage,
          eDutyChargeAmount: dutyAmount,
          totalChargesAmount,
          sdDays,
          totalSdDayAmount,
          totalSdRequired,
          totalPayAbleAmount,
        });
      } catch (error) {
        console.error("Charge Calculation Error", error);
      }
    };

    fetchCharges();
  }
}, [lc_type, contract_demand_difference, new_contact_demand, connection_purpose_id, connection_category]);

  const submitHandler = async () => {
    const postData = {
      application: id || '',
      supply_voltage: new_supply_voltage,
      connection_category,
      connection_purpose_id,
      new_contact_demand,
      contract_demand_difference,
      discom_charges: discomCharges,
      total_discom_charges: charges.totalDiscomCharges ||0 ,
      transco_charges: transcoCharges,
      total_transco_charges: charges.totalTranscoCharges,
      total_sac_amount: charges.totalSupplyAffording,
      e_duty_charges: charges.eDutyCharge,
      e_duty_charges_amount: charges.eDutyChargeAmount,
      energy_charges: charges.energyCharge,
      energy_charges_amount: charges.energyChargeAmount,
      fppas_charges: fppasRateNew,
      fppas_charges_amount: charges.fppasChargeAmount,
      monthly_fixed_charges: charges.fixedCharge,
      monthly_fixed_charges_amount: charges.fixedChargeAmount,
      sd_days: charges.sdDays,
      units_per_kva: unitPerKva,
      total_charges_amount: charges.totalChargesAmount,
      registration_fee_charges: registrationFeeCharges,
      total_sd_days_amount: charges.totalSdDayAmount,
      total_sd_required: charges.totalSdRequired,
      total_pay_amount: charges.totalPayAbleAmount,
    };

    try {
      setIsDisabled(true);
      const response = await fetch(`${HT_LOAD_CHANGE_BASE}/tariff-charges/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });

      const result = await response.json();
      console.log('API Response:', result);
      navigate(`/ht-load-change/payment/${id}`,{state:{result}});
    } catch (error) {
      setIsDisabled(false);
      console.error('API Error:', error);
    }

    console.log(postData, "postData");
  };

  return (
    <div className="mt-6 ml-30 mr-30 overflow-x-auto ">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th>S No.</th>
            <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Particular</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {[
            { label: "Application No.", value: application_no },
            { label: "Consumer No.", value: consumer_id },
            { label: "Firm Name", value: consumer_name },
            { label: "Existing Supply Voltage", value: existing_supply_voltage },
            { label: "Existing Contract Demand", value: existing_contract_demand },
            { label: "Supply Voltage", value: new_supply_voltage },
            { label: "Contract Demand", value: new_contact_demand },
            { label: "Contract Demand Difference", value: contract_demand_difference },
            { label: "Type Of Change", value: type_of_change },
          ].map((row, idx) => (
            <tr key={idx} className="transition-all hover:bg-gray-100 hover:shadow-lg">
              <td className="px-6 py-4 whitespace-nowrap">{idx + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">{row.label}</span>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Charges Table */}
      <table className="min-w-full divide-y divide-gray-200 mt-4">
        <thead className="bg-gray-50">
          <tr>
            <th>S No.</th>
            <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Particular</th>
            <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">Account Head</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr className="transition-all hover:bg-gray-100 hover:shadow-lg">
            <td className="px-6 py-4 whitespace-nowrap">1</td>
            <td className="px-6 py-4 whitespace-nowrap">Registration Fee</td>
            <td className="px-6 py-4 whitespace-nowrap">48.48/50.89</td>
            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">{registrationFeeCharges}</td>
          </tr>

          {/* Supply Affording */}
          {type_of_change ==="Load_Enhancement" &&(
            <>
            <tr className="bg-gray-200">
            <td colSpan={4} className="p-3 font-semibold">Supply Affording Charges</td>
          </tr>

          <tr>
            <td className="px-6 py-4 whitespace-nowrap">2</td>
            <td className="px-6 py-4 whitespace-nowrap">Transmission Charge Rs. @{transcoCharges} per KVA</td>
            <td className="px-6 py-4 whitespace-nowrap">48.48/50.89</td>
            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">{charges.totalTranscoCharges}</td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">3</td>
            <td className="px-6 py-4 whitespace-nowrap">Discom Charge Rs. @{discomCharges} per KVA</td>
            <td className="px-6 py-4 whitespace-nowrap">48.48/50.89</td>
            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">{charges.totalDiscomCharges}</td>
          </tr>
          <tr>
            <td colSpan={2}></td>
            <td className="px-6 py-4 whitespace-nowrap font-semibold">Total Supply Affording Charges</td>
            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">{charges.totalSupplyAffording}</td>
          </tr>

          {/* Security Deposit */}
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">4</td>
            <td className="px-6 py-4 whitespace-nowrap">Security Deposit (SD)</td>
            <td className="px-6 py-4 whitespace-nowrap">48.48/50.89</td>
            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">{charges.totalSdRequired}</td>
          </tr>
          </>)}
          <tr>
            <td colSpan={2}></td>
            <td  className="px-6 py-4 whitespace-nowrap font-semibold">Total Pay Amount</td>
            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">{type_of_change === "Load_Reduction" ? 25 : charges.totalPayAbleAmount}</td>
          </tr>

            
                    <tr>
            <td colSpan={4}>
            <div className="border-b border-gray-900/10 pb-12 ">
                <div className="mt-10 flex flex-col justify-center items-center">
                  <div className="flex space-x-2 space-y-2 flex-wrap justify-center items-baseline">
                
                       <button type="submit"  onClick={submitHandler} className={`  text-white px-4 py-2 mt-4 rounded 
                      ${isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-purple-800 text-white"}`}
                     disabled={isDisabled}>
                    {isDisabled ? "Please wait..." : "Submit"}
                      
                    </button>
                   
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LoadChangePay;
