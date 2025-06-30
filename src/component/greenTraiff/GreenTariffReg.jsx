import React, { useEffect, useState } from 'react'
import Input from '../../component/Input'
import SelectBox from '../../component/SelectBox';
// import Button from '../Button';
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import ApplicantBasicDetails from '../ApplicantBasicDetails'


function GreenTariffReg() {
  const [currentVoltage, setCurrentVoltage] = useState(null)
  const [htConsumers, setHtConsumer] = useState({})
  const [typeChange, setTypeChange] = useState('')
  const [supplyVoltageValue, setSupplyVoltageValue] = useState('')

  const [formData, setFormData] = useState({});
  console.log(formData, "formData")
  const supplyVoltageOption = [
    { label: '11 KV', value: '11 KV' },
    { label: '33 KV', value: '33 KV' },
    { label: '132 KV', value: '132 KV' },
    { label: '220 KV', value: '220 KV' }
  ]
  const [supplyVoltage, setSupplyVoltage] = useState(supplyVoltageOption)
  const [contractDemand, setContractDemand] = useState('')
  const [currentContractDemand, setCurrentContractDemand] = useState("");
  const [contractDemandDiff, setContractDemandDiff] = useState("");
  const [error, setError] = useState({})
  const newErrors = {};


  const dropdownOptions = {
    typeOfChanges: [
      { label: 'Load Enhancement', value: 'Load_Enhancement' },
      { label: 'Load Reduction', value: 'Load_Reduction' }
    ],
    supplyVoltage: [
      { label: '11 KV', value: '11 KV' },
      { label: '33 KV', value: '33 KV' },
      { label: '132 KV', value: '132 KV' },
      { label: '220 KV', value: '220 KV' }
    ]

  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://services.mpcz.in/serviceportal/api/ht/getHtConsumersMasDataByConsumerId?consumerId=H8333333333`);
        const result = await response.json();
        if (result?.list?.length > 0) {
          setFormData((prev) => ({
            ...prev,
            ...result.list[0], // data ko spread karke formData me daal do
          }));
        }
        setHtConsumer(result.list[0]);
        setCurrentVoltage(result.list[0].vos)
        setCurrentContractDemand(result.list[0].sanctionLoad)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleTypeOfChange = (e) => {
    setTypeChange(e.target.value)
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value, }));
    setSupplyVoltageValue('')
    setContractDemand('')
    setContractDemandDiff('')
    const typeOfChangeValue = e.target.value
    if (typeOfChangeValue === "Load_Enhancement") {
      let supplyVoltageChange = dropdownOptions.supplyVoltage.filter(v => {
        const volt = parseInt(v.value);

        return volt >= parseInt(currentVoltage);
      })
      setSupplyVoltage(supplyVoltageChange)
    } else {
      let supplyVoltageChange = dropdownOptions.supplyVoltage.filter(v => {
        const volt = parseInt(v.value);

        return volt <= parseInt(currentVoltage);
      })
      setSupplyVoltage(supplyVoltageChange)

    }


  }
  const handleSupplyVoltage = (e) => {
    setSupplyVoltageValue(e.target.value)
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value, }));
    setContractDemand('')
    setContractDemandDiff('')

  }

  const handleContractDemand = (e) => {
    let value_data = Number(e.target.value)
    const { name, value } = e.target;
    setContractDemand(e.target.value)
    setFormData((prev) => ({ ...prev, [name]: value, }));

    newErrors.contractDemandError = "";

    if (typeChange === "Load_Enhancement" || typeChange === "Load_Reduction") {
      if (supplyVoltageValue === "11 KV" && (value_data < 50 || value_data > 300)) {
        newErrors.contractDemandError = "The value should be 50 to 300 KVA";
        setError(newErrors);
        return;
      }
      if (supplyVoltageValue === "33 KV" && (value_data < 100 || value_data > 10000)) {
        newErrors.contractDemandError = "The value should be 100 to 10000 KVA";
        setError(newErrors);
        return;
      }
      if (supplyVoltageValue === "132 KV" && (value_data <= 4000 || value_data >= 50000)) {
        newErrors.contractDemandError = "The value should be 100 to 10000 KVA";
        setError(newErrors);
        return;
      }

      if (supplyVoltageValue === "220 KV" && (value_data < 40000 || value > 100000)) {
        newErrors.contractDemandError = "The value should be equal and above 40000 KVA";
        setError(newErrors);
        return;
      }
    }
    if (typeChange === "Load_Enhancement") {
      let contractDemand = value_data - Number(currentContractDemand)

      if (value_data < Number(currentContractDemand)) {
        newErrors.contractDemandError = `Contract demand cannot be less than current demand (${currentContractDemand} KVA)`;
        setError(newErrors);
        return;
      }
      setContractDemandDiff(contractDemand)
    } else {
      let contractDemand = value_data - Number(currentContractDemand)
      if (value_data > Number(currentContractDemand)) {
        newErrors.contractDemandError = `Contract demand cannot be less than current demand (${currentContractDemand} KVA)`;
        setError(newErrors);
        return;
      }
      setContractDemandDiff(contractDemand)
    }
    setError(newErrors)



  }
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0], // only first file
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    console.log(formData, "formData")

    for (let key in formData) {
      form.append(key, formData[key]);

    }

  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="space-y-12 container mx-auto border my-5  rounded-md border-gray shadow-md">
          <div className="border-b border-gray-900/10 pb-12">
            <div class="block mb-2 border-b-2 p-2 ">
              <h2 className="text-base/7 font-semibold text-gray-900">HT NSC Green Tariff Application</h2>
              <p className="mt-1 text-sm/6 text-gray-600">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>
            <div className='body p-4'>
              <ApplicantBasicDetails htConsumers={htConsumers}/>
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900">Required Load Details</h2>
                <p className="mt-1 text-sm/6 text-gray-600">
                  This information will be displayed publicly so be careful what you share.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <SelectBox LName="Type of Change" Iname="typeOfChange" optionVal={dropdownOptions.typeOfChanges} value={typeChange} onChange={handleTypeOfChange} />
                  <SelectBox LName="New Supply Voltage" Iname="newSupplyVoltage" optionVal={supplyVoltage} value={supplyVoltageValue} onChange={handleSupplyVoltage} />
                  <Input LName="Total Required Contract Demand(in KVA)" Iname="newContactDemand" type="number" value={contractDemand} onChange={handleContractDemand} placeholder="please Enter New Contact Demand" errorMsg={error.contractDemandError} />
                  <Input LName="Change in Contract Demand (in KVA)" Iname="contract_demand_difference " type="text" value={contractDemandDiff} onChange={() => { }} placeholder="please Enter Contract Demand Difference" />
                  <Input LName="Purpose Of Installation Details" Iname="purposeOfInstallationDetails" type="text" value={formData.purposeOfInstallationDetails} onChange={handleChange} placeholder="Please Enter Purpose Of Installation Details" />

                </div>
              </div>
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900">Bank Details..</h2>
                <p className="mt-1 text-sm/6 text-gray-600">
                  This information will be displayed publicly so be careful what you share.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <Input LName="Account Holder Name" Iname="account_holder_name " type="text" value={formData.account_holder_name} onChange={handleChange} placeholder="please Enter Account Holder Name" />
                  <Input LName="Bank Name" Iname="bank_name* " type="text" value={formData.bank_name} onChange={handleChange} placeholder="please Enter Bank Name" />
                  <Input LName="Bank IFSC Code" Iname="ifsc_code* " type="text" value={formData.ifsc_code} onChange={handleChange} placeholder="please Enter Bank IFSC Code" />
                  <Input LName="Bank Account Number" Iname="account_number " type="text" value={formData.account_number} onChange={handleChange} placeholder="please Enter Bank Account Number" />
                  <Input LName="Upload Bank Passbook/Cheque " Iname="account_number* " type="file" onChange={handleChange} placeholder="Upload Bank Passbook/Cheque" />


                </div>
              </div>
            </div>

          </div>
          

<div class="p-5 flex flex-col justify-center items-center">
   <div class="flex space-x-2 space-y-2 flex-wrap justify-center items-baseline">
      <button class="rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300">Primary</button>
      <button class="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300">Success</button>
     
   </div>
</div>






          
        </div>
      </form>
    </>
  )
}

export default GreenTariffReg