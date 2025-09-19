import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData, setLoading, setError } from '../../redux/slices/userSlice.js';
import {HT_LOAD_CHANGE_BASE} from '../../api/api.js'

// import AlertModalBox from '../../component/alertModelBox.jsx';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import {
  InputTag,
  SelectTag,
  ApplicantBasicDetails,
  AlertModalBox,
  toFormData,
} from '../importComponents.js';
import { TypeOfValue } from '../newComponents/commonOption.js';
import {
  handleSupplyVoltage,
  contractDemandRange,
  checkLoadReductionDate,
  validateContractDemand,
} from '../../utils/handleLogicLoad.js';

function ApplicantReg() {
  const { consumerId, application_no } = useParams();
  const [isLocked, setIsLocked] = useState(false);
  const [showButton,setShowButton] =useState(false)
  const location = useLocation();
  const [htConsumers, setHtConsumer] = useState("");
  const data = location.state?.data;
  const [subTypeOfChange, setSubTypeOfChange] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [supplyVoltage, setSupplyVoltage] = useState([]);
  const [totalYearConn,setTotalYearConn] = useState('')
  const [loadReductionApply,setLoadReductionApply] = useState('')

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalAction, setModalAction] = useState(() => () => { });
  const [isButton, setIsButton] = useState(false);
  const showModal = (message, action = () => { }) => {
    setModalMessage(message);
    setModalAction(() => action); // save callback
    setModalOpen(true);
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    setError,
    clearErrors,
    formState: { errors,isSubmitting  },
  } = useForm(
    {
      defaultValues: data || {},

    }
  );
  const typeOfChange = watch('type_of_change');
  const SubTypeOfChange = watch('lc_type');
  const SupplyVoltage = watch('new_supply_voltage');
  const ContractDemand = watch('new_contact_demand');
 
  useEffect(() => {
  if (Object.keys(data).length) {
    setHtConsumer(data);
    if(data?.meter_type !=="HT Net Meter"){
      setValue("net_meter_install_date","NA")
    }

  } else {
    navigate(`/ht-load-change/`);
  }
}, [data]);
  useEffect(() => {
  setTimeout(() => {
    setValue("lc_type",data?.lc_type)
    setValue("new_supply_voltage",data?.new_supply_voltage)
    setValue('contract_demand_difference',data?.contract_demand_difference)
    
  }, 1000);
}, [application_no]);

  useEffect(() => {
    if (typeOfChange === 'Load_Enhancement') {
      setSubTypeOfChange(TypeOfValue.enhancementOptions);
    } else if (typeOfChange === 'Load_Reduction') {
      setSubTypeOfChange(TypeOfValue.reductionOptions);
      let Load_Reduction_apply = checkLoadReductionDate(htConsumers);
      console.log(Load_Reduction_apply,"Load_Reduction_apply")
      if(Load_Reduction_apply?.Load_Reduction){
        setLoadReductionApply(Load_Reduction_apply)

      }else{
        showModal(
          ' You are not allowed for load reduction as per the clause 7.12 or 7.13 of supply code  2021.'
        );
      }
    } else {
      setSubTypeOfChange([]);
    }
  }, [typeOfChange]);

  useEffect(()=>{
    if(SupplyVoltage){
  if(SubTypeOfChange ==="Only_Voltage_Upgrade"  ){
      setValue("contract_demand_difference", 0);
      setValue("new_contact_demand",htConsumers?.existing_contract_demand);
      setIsLocked(true)
      const contract_demand = contractDemandRange(SupplyVoltage, htConsumers?.existing_contract_demand);
       if (contract_demand) {
        setError("new_contact_demand", {
          type: "manual",
          message: contract_demand,
        });
      }

    }else{
        setIsLocked(false)
        setValue("new_contact_demand", "");
        setValue("contract_demand_difference", "");
        clearErrors("new_contact_demand");
    }
    }

  },[SupplyVoltage])


useEffect(() => {
  let timer;
  if (typeOfChange && SubTypeOfChange && htConsumers?.existing_supply_voltage) {
    timer = setTimeout(() => {
      
      let supply_voltage = handleSupplyVoltage(
        htConsumers?.existing_supply_voltage,
        SubTypeOfChange
      );
      setSupplyVoltage(supply_voltage);
    

    }, 500); 
  }

  return () => clearTimeout(timer);
}, [SubTypeOfChange, htConsumers?.existing_supply_voltage]);


 

useEffect(() => {
  if (ContractDemand && typeOfChange && SubTypeOfChange && SupplyVoltage) {
    const handler = setTimeout(() => {
      const contract_demand = contractDemandRange(SupplyVoltage, ContractDemand);
      const demandError = validateContractDemand(
        typeOfChange,
        ContractDemand,
        SubTypeOfChange,
        htConsumers,
        totalYearConn,
        loadReductionApply
      );
      let contractDeffres = Math.abs(
        ContractDemand - Number(htConsumers.existing_contract_demand)
      );
      setValue("contract_demand_difference", contractDeffres);

      if (contract_demand) {
        setError("new_contact_demand", {
          type: "manual",
          message: contract_demand,
        });
        setValue("contract_demand_difference", "");
        setValue("new_contact_demand", "");
      } else if (demandError) {
        setError("new_contact_demand", {
          type: "manual",
          message: demandError,
        });
        setValue("contract_demand_difference", "");
        setValue("new_contact_demand", "");
      } else {
        clearErrors("new_contact_demand");
      }
    }, 600); 

    return () => clearTimeout(handler); 
  }else{
    setValue("new_contact_demand", "");

  }
}, [ContractDemand]);


const onSubmithandler = async (data) => {
  try {
    dispatch(setLoading(true));
    setIsDisabled(true);
    const formData = toFormData(data);
    const isUpdatePage = location.pathname === `/ht-load-change/update/${application_no}`;
    const apiUrl = isUpdatePage
      ? `${HT_LOAD_CHANGE_BASE}/update-load-change-application/?application_no=${application_no}`
      : `${HT_LOAD_CHANGE_BASE}/submit-load-change-application/`;

    const response = await axios.post(apiUrl, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const result = response?.data;

    if (!result) throw new Error("No response from server");


    if (result.data) dispatch(setUserData(result.data));

   
    if (isUpdatePage && result.application_no) {
      setShowButton(true);
      navigate(`/ht-load-change/update/${result.application_no}`);
    } else if (!isUpdatePage && result.application_no) {
      navigate(`/ht-load-change/Details`);
    }
  } catch (err) {
    console.error("Submit Error:", err);
    setIsDisabled(false);

    const errorMsg = err?.response?.data?.message || "Something went wrong!";
    alert(errorMsg); 
  } finally {
    dispatch(setLoading(false));
    setIsDisabled(false);
  }
};

  return (
    
    <>
     <div className='flex '>
      <div className='w-1/5  p-4'></div>
      <div className='w-4/5'>
       <form onSubmit={handleSubmit(onSubmithandler)}>
        <AlertModalBox
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          message={modalMessage}
          onConfirm={modalAction}
        />

        <div className="space-y-12 container mx-auto border my-5  rounded-md border-gray shadow-md">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="block mb-2 border-b-2 p-2 ">
              <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
                HT NSC Load Change Application
              </h2>
            </div>
            <div className="body p-4">
              <ApplicantBasicDetails htConsumers={htConsumers}  register={register} errors ={errors}/>
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
                  Required Load Details
                </h2>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">
                  <SelectTag
                    LName="Type of Change"
                    options={TypeOfValue.typeOfChanges}
                    {...register('type_of_change', {
                      required: 'Please Select Type of Changes is required',
                    })}
                    errorMsg={errors.type_of_change?.message}
                    labelKey="label"
                    valueKey="value"
                    disabled={isDisabled}
                  />
                  <SelectTag
                    LName="Sub Type of Change"
                    options={subTypeOfChange}
                    {...register('lc_type', {
                      required: 'Please Select Sub Type of Changes is required',
                    })}
                    errorMsg={errors.lc_type?.message}
                    labelKey="label"
                    valueKey="value"
                    disabled={isDisabled}
                  />
                  <SelectTag
                    LName="New Supply Voltage"
                    options={supplyVoltage}
                    {...register('new_supply_voltage', {
                      required: 'Please Select New Supply Voltage is required',
                    })}
                    errorMsg={errors.new_supply_voltage?.message}
                    labelKey="label"
                    valueKey="value"
                    disabled={isDisabled}
                  />
                  <InputTag
                    LName="Total Required Contract Demand(in KVA)"
                    type={'number'}
                    placeholder="Please Enter New Contract Demand "
                    {...register('new_contact_demand', {
                      required: 'New Contract Demand is required',
                    })}
                    errorMsg={errors.new_contact_demand?.message}
                    disabled={isDisabled}
                    readOnly={isLocked}
                  />
                  <InputTag
                    LName="Contract Demand Difference"
                    type={'number'}
                    {...register('contract_demand_difference', {
                      required: true,
                    })}
                    errorMsg={errors.contract_demand_difference?.message}
                    disabled={isDisabled}
                    readOnly={isLocked}
                  />
                  <InputTag
                    LName="Purpose Of Installation Details"
                    {...register('purpose_of_installation_details', {
                      required: "Please Enter Purpose Of Installation Details",
                    })}
                    placeholder="Please Enter Purpose Of Installation Details"
                    errorMsg={errors.purpose_of_installation_details?.message}
                    disabled={isDisabled}
                    
                  />

                </div>
              </div>
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
                  Bank Details..
                </h2>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">

                    <InputTag
                    LName="Account Holder Name"
                    {...register('ac_holder_name')}
                    placeholder="Please Enter Purpose Of Installation Details"
                    errorMsg={errors.ac_holder_name?.message}
                    disabled={isDisabled}
                    
                  />
                    <InputTag
                    LName="Bank Name"
                    {...register('bank_name')}
                    placeholder="Please Enter Bank Name"
                    errorMsg={errors.bank_name?.message}
                    disabled={isDisabled}
                    
                  />
                    <InputTag
                    LName="Bank IFSC Code"
                    {...register('bank_ifsc_code')}
                    placeholder="Please Enter Bank IFSC Code"
                    errorMsg={errors.bank_ifsc_code?.message}
                    disabled={isDisabled}
                    
                  />
                    <InputTag
                    LName="Bank Account Number"
                    {...register('bank_ac_no')}
                    placeholder="Please Enter Bank Account Number"
                    errorMsg={errors.bank_ac_no?.message}
                    disabled={isDisabled}
                    
                  />
                    <InputTag
                    LName="Upload Bank Passbook/Cheque "
                    {...register('bank_docs')}
                   type="file"
                    errorMsg={errors.bank_docs?.message}
                    disabled={isDisabled}
                    
                  />
                
                </div>
              </div>
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
                  Firm Document Details..
                </h2>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">
                  {htConsumers.pan_card_no ==="" || htConsumers.pan_card_no =="NA" &&(
                    <>
                     <InputTag
                    LName="Pan No"
                    {...register('pan_no',{
                      required:"Please Enter Pan No."
                    })}
                    errorMsg={errors.pan_no?.message}
                    placeholder="Enter Pan No.  "

                    disabled={isDisabled}
                    
                  />

                 <InputTag
                    LName="Upload Pan No"
                    {...register('pan_card_doc')}
                   type="file"
                    errorMsg={errors.pan_card_doc?.message}
                    disabled={isDisabled}
                    
                  />
                    </>
                  )}
                
                 <InputTag
                    LName="Upload GST Document"
                    {...register('gst_doc')}
                   type="file"
                    errorMsg={errors.gst_doc?.message}
                    disabled={isDisabled}
                    
                  />
                 <InputTag
                    LName="Enter Other Document No"
                    {...register('uploaded_doc_no')}
                   
                    placeholder="Enter Other Document No. "
                    errorMsg={errors.uploaded_doc_no?.message}
                    disabled={isDisabled}
                    
                  />
                 <InputTag
                    LName="Enter Other Document Name"
                    {...register('uploaded_doc_no')}
                   
                    placeholder="Enter Other Document Name "
                    errorMsg={errors.uploaded_doc_no?.message}
                    disabled={isDisabled}
                    
                  />
                 <InputTag
                    LName="Upload Other Document."
                    {...register('upload_file')}
                    type="file"
                   
                    errorMsg={errors.upload_file?.message}
                    disabled={isDisabled}
                    
                  />

                </div> 
              </div>
              <div className="border-b border-gray-900/10 pb-12 ">
            
                 <div className="mt-10 flex flex-col justify-center items-center">
                  <div className="flex space-x-2 space-y-2 flex-wrap justify-center items-baseline">
                    <button type='reset' className="rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-red-600 duration-300" onClick={() => reset()}>
                      Reset
                    </button>
                    {!showButton ? (
                     <button type="submit" className={`  text-white px-4 py-2 mt-4 rounded 
                      ${isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-purple-800 text-white"}`}
                     disabled={isDisabled}>
                    {isDisabled ? "Please wait..." : "Submit"}
                      
                    </button>
                    ) : (
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
                      >
                        Update Details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      </div>
      <div className='w-1/5  p-4'></div>
      </div>

    
    
     
    </>
  );
}

export default ApplicantReg;
