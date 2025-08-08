import React, { useEffect, useState } from 'react';
import Input from '../../component/Input';
import SelectBox from '../../component/SelectBox';
import ApplicantBasicDetails from '../ApplicantBasicDetails';
import * as yup from 'yup';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { dropdownOptions, supplyVoltageOption } from '../../utils/supplyVoltage.js';
import { getHtConsumerData } from '../../utils/htConsumerApi.js';
import { validateVoltageRange, validateDemandLogic } from '../../utils/handleContactDemand.js';
import { extractFormValues } from '../../utils/extractFormValues.js';
import {
  submitFormData,
  updateFormData,
  getHtApplicationByApplicationNo,
} from '../../utils/handlePostApi.js';

import { useDispatch } from 'react-redux';
import { setUserData, setLoading, setError } from '../../redux/slices/userSlice.js';
import { transformDataKeys } from '../../utils/transFormDataKey.js';
import AlertModalBox from '../../component/alertModelBox.jsx';

function ApplicantReg() {
  const location = useLocation();
  const data = location.state?.data;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [supplyVoltage, setSupplyVoltage] = useState(supplyVoltageOption);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentVoltage, setCurrentVoltage] = useState(null);
  const [htConsumers, setHtConsumer] = useState({});
  const [typeChange, setTypeChange] = useState('');
  const [supplyVoltageValue, setSupplyVoltageValue] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [mobile, setMobile] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [formData, setFormData] = useState({});
  const [isVerified, setIsVerified] = useState(false); // true after OTP verified
  const [isDisabled, setIsDisabled] = useState(false);
  const [contractDemand, setContractDemand] = useState('');
  const [currentContractDemand, setCurrentContractDemand] = useState('');
  const [contractDemandDiff, setContractDemandDiff] = useState('');
  const [error, setError] = useState({});
  const newErrors = {};
  const [filteredTypeOptions, setFilteredTypeOptions] = useState(dropdownOptions.typeOfChanges);
  const [typesOfChangeValue, setTypesOfChangeValue] = useState('');
  const [isContractDemandDisabled, setIsContractDemandDisabled] = useState(false);

  const { consumerId, application_no } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalAction, setModalAction] = useState(() => () => {});
  const [isButton, setIsButton] = useState(false);

  const showModal = (message, action = () => {}) => {
    setModalMessage(message);
    setModalAction(() => action); // save callback
    setModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transformedData = data;
        setFormData(prev => ({
          ...prev,
          ...transformedData,
        }));

        setHtConsumer(transformedData);
        setCurrentVoltage(transformedData.existing_supply_voltage);
        setCurrentContractDemand(transformedData.existing_contract_demand);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [consumerId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getHtApplicationByApplicationNo(
          `/ht_load_change/get-load-change-applications/?application_no=${application_no}`
        );
        const result = await response.json();
        const transformedData = result.data;
        setFormData(prev => ({
          ...prev,
          ...transformedData,
        }));

        setHtConsumer(transformedData);
        setCurrentVoltage(transformedData.existing_supply_voltage);
        setCurrentContractDemand(transformedData.existing_contract_demand);
        setTypeChange(transformedData.type_of_change);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (application_no) {
      setIsEditMode(true);
      fetchData();
    }
  }, [application_no]);

  const getConditionalOptions = () => {
    if (typeChange === 'Load_Enhancement') return dropdownOptions.enhancementOptions;
    if (typeChange === 'Load_Reduction') return dropdownOptions.reductionOptions;
    return [];
  };

  const checkLoadReductionDate = () => {
    const connectionDate = new Date(htConsumers?.connection_date);
    const lastReductionDate = new Date(htConsumers?.last_reduction_date);
    const currentDate = new Date();
    const totalYearConnDate = (currentDate - connectionDate) / (1000 * 60 * 60 * 24 * 365.25);
    const totalYearLastReduction =
      (currentDate - lastReductionDate) / (1000 * 60 * 60 * 24 * 365.25);
    if (totalYearConnDate > 2) {
      console.log(htConsumers?.last_reduction_date);
      if (!htConsumers?.last_reduction_date) {
        showModal(
          '✅ You are  allowed for load reduction as per the clause 7.12 or 7.13 of supply code  2021.'
        );
      } else if (htConsumers?.last_reduction_date && totalYearLastReduction > 1) {
        showModal(
          '✅ You are  allowed for load reduction as per the clause 7.12 or 7.13 of supply code  2021.'
        );
      } else {
        showModal(
          '❌ You are not allowed for load reduction as per the clause 7.12 or 7.13 of supply code  2021.'
        );
        setIsButton(true);
      }
    } else {
      if (totalYearConnDate < 2 && !htConsumers?.last_reduction_date) {
        showModal(
          '✅ You are  allowed for load reduction as per the clause 7.12 or 7.13 of supply code  2021.'
        );
      } else {
        showModal(
          ' ❌ You are not allowed for load reduction as per the clause 7.12 or 7.13 of supply code 2021.'
        );
        setIsButton(true);
      }
    }
  };

  const handleTypeOfChange = e => {
    const { name, value } = e.target;
    if (value === 'Load_Reduction') {
      checkLoadReductionDate(value);
    }
    setTypeChange(value);
    setTypesOfChangeValue('');
    setSupplyVoltageValue('');
    setContractDemand('');
    setContractDemandDiff('');
    clearFieldError('newContactDemand');
  };
  const handleTypesOfChange = e => {
    const selectedValue = e.target.value;
    setTypesOfChangeValue(selectedValue);
    clearFieldError('newContactDemand');

    const currentVolt = getNumericVoltage(currentVoltage);
    let filteredVoltages = [];

    // ------------------- Enhancement Cases -------------------
    if (selectedValue === 'Load_Enhancement_with_Voltage_Change') {
      filteredVoltages = dropdownOptions.supplyVoltage.filter(
        v => getNumericVoltage(v.value) > currentVolt
      );
      setIsContractDemandDisabled(false);
      setContractDemand('');
      setContractDemandDiff('');
    } else if (selectedValue === 'Load_Enhancement_without_Voltage_Change') {
      filteredVoltages = dropdownOptions.supplyVoltage.filter(
        v => getNumericVoltage(v.value) === currentVolt
      );
      setIsContractDemandDisabled(false);
      setContractDemand('');
      setContractDemandDiff('');
    } else if (selectedValue === 'Only_Voltage_Upgrade') {
      filteredVoltages = dropdownOptions.supplyVoltage.filter(
        v => getNumericVoltage(v.value) > currentVolt
      );
      setIsContractDemandDisabled(true);
      setContractDemand(currentContractDemand);
      setContractDemandDiff(0);
    } else if (selectedValue === 'Load_Enhancement_with_Downgrade_Voltage_Level') {
      filteredVoltages = dropdownOptions.supplyVoltage.filter(
        v => getNumericVoltage(v.value) < currentVolt
      );
      setIsContractDemandDisabled(false);
      setContractDemand('');
      setContractDemandDiff('');
    }

    // ------------------- Reduction Cases -------------------
    else if (selectedValue === 'Load_Reduction_without_Voltage_Change') {
      filteredVoltages = dropdownOptions.supplyVoltage.filter(
        v => getNumericVoltage(v.value) === currentVolt
      );
      setIsContractDemandDisabled(false);
    } else if (selectedValue === 'Load_Reduction_with_Voltage_Change') {
      filteredVoltages = dropdownOptions.supplyVoltage.filter(
        v => getNumericVoltage(v.value) !== currentVolt
      );
      setIsContractDemandDisabled(false);
    } else if (selectedValue === 'Load_Reduction_with_Upgrade_Voltage_Level') {
      filteredVoltages = dropdownOptions.supplyVoltage.filter(
        v => getNumericVoltage(v.value) > currentVolt
      );
      setIsContractDemandDisabled(false);
    } else if (selectedValue === 'Only_Voltage_Downgrade') {
      filteredVoltages = dropdownOptions.supplyVoltage.filter(
        v => getNumericVoltage(v.value) < currentVolt
      );
      setIsContractDemandDisabled(true);
      setContractDemand(currentContractDemand);
    }

    // ------------------- Final Update -------------------
    setSupplyVoltage(filteredVoltages);
    if (filteredVoltages.length > 0) {
      setSupplyVoltageValue(filteredVoltages[0].value);
    } else {
      setSupplyVoltageValue('');
    }
  };

  const handleSupplyVoltage = e => {
    setSupplyVoltageValue(e.target.value);
    clearFieldError('newContactDemand');
    const { name, value } = e.target;
    // setFormData((prev) => ({ ...prev, [name]: value, }));
    setContractDemand('');
    setContractDemandDiff('');
  };
  const handleContractDemand = e => {
    const value = Number(e.target.value);
    // const { name } = e.target;
    const updatedErrors = { ...newErrors };
    setContractDemand(e.target.value);
    if (typeChange === 'Load_Enhancement' || typeChange === 'Load_Reduction') {
      const voltageError = validateVoltageRange(supplyVoltageValue, value);
      if (voltageError) {
        updatedErrors.newContactDemand = voltageError;
        setError(updatedErrors);
        return;
      }
    }
    const demandError = validateDemandLogic(
      typeChange,
      value,
      Number(currentContractDemand),
      typesOfChangeValue
    );
    if (demandError) {
      updatedErrors.newContactDemand = demandError;
      setError(updatedErrors);
      return;
    }

    setContractDemandDiff(value - Number(currentContractDemand));
    setError({}); // clear previous error if all good
  };
  const clearFieldError = fieldName => {
    setError(prev => ({ ...prev, [fieldName]: '' }));
  };

  const schema = yup.object().shape({
    type_of_change: yup.string().required('Type of Change is Required '),
    new_supply_voltage: yup.string().required('New Supply Voltage  is Required'),
    new_contact_demand: yup
      .number()
      .required('New Contract  Demand is Required')
      .integer('Contract  Demand Only Number')
      .typeError('Contract  Demand Only Number'),
    purpose_of_installation_details: yup
      .string()
      .required('New Purpose Of Installation Details is Required'),
    // ac_holder_name: yup.string().required('Account Holder Name is Required'),
    // bank_name: yup.string().required('Bank Name Name is Required'),
    // bank_ifsc_code: yup.string().required('Bank IFSC Code is Required'),
    // bank_ac_no: yup.string().required('Bank Account Number is Required'),
    //   bank_docs: yup
    //     .mixed()
    //     .required('File is required')
    //     .test(
    //       'fileSize',
    //       'File size is too large',
    //       value => value && value.size <= 2 * 1024 * 1024 // 2MB
    //     )
    //     .test(
    //       'fileType',
    //       'Unsupported File Format',
    //       value => value && ['application/pdf'].includes(value.type)
    //     )
  });

  const onSubmithandler = async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const tempObj = extractFormValues(formData);
    if (location.pathname == `/ht-load-change/update/${application_no}`) {
      try {
        await schema.validate(tempObj, { abortEarly: false });
        setError({});
        setIsDisabled(true);
        const response = await updateFormData(
          formData,
          `/ht_load_change/update-load-change-application/?application_no=${application_no}`
        );
        // console.log(response, 'dhsjhfdgfhgdh');
        const result = await response.json();
        // console.log('result', result);
        navigate(`/ht-load-change/Details`);
      } catch (err) {
        handleFormErrors(err);
      }
    } else {
      try {
        await schema.validate(tempObj, { abortEarly: false });
        setError({});
        setIsDisabled(true);
        dispatch(setLoading(true));

        const response = await submitFormData(
          formData,
          '/ht_load_change/submit-load-change-application/'
        );
        const result = await response.json();
        dispatch(setUserData(result.data));
        setHtConsumer(result.data);
        setShowButton(true);
        setIsDisabled(false);
        // console.log(result, 'result');
        navigate(`/ht-load-change/update/${result.application_no}`);
      } catch (err) {
        handleFormErrors(err);
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    }
  };
  const handleFormErrors = err => {
    const newErrors = {};
    if (err.inner && Array.isArray(err.inner)) {
      err.inner.forEach(error => {
        newErrors[error.path] = error.message;
      });
    } else if (err.path && err.message) {
      newErrors[err.path] = err.message;
    } else {
      newErrors.general = 'Something went wrong. Please try again.';
    }
    setError(newErrors);
    setIsDisabled(false);
  };
  const getNumericVoltage = v => parseInt(v.replace(' KV', ''));

  return (
    <>
      <form onSubmit={onSubmithandler}>
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
              <p className="mt-1 text-sm/6 text-gray-600">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>
            <div className="body p-4">
              <ApplicantBasicDetails htConsumers={htConsumers} />
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
                  Required Load Details
                </h2>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <SelectBox
                    LName="Type of Change"
                    Iname="type_of_change"
                    optionVal={filteredTypeOptions}
                    value={typeChange}
                    onChange={handleTypeOfChange}
                    errorMsg={error.typeOfChange}
                    disabled={isDisabled}
                  />

                  {typeChange && (
                    <SelectBox
                      LName="Types of Change"
                      Iname="lc_type"
                      optionVal={getConditionalOptions()}
                      value={typesOfChangeValue}
                      onChange={handleTypesOfChange}
                      errorMsg={error.typesOfChange}
                      disabled={isDisabled}
                    />
                  )}
                  <SelectBox
                    LName="New Supply Voltage"
                    Iname="new_supply_voltage"
                    optionVal={supplyVoltage}
                    value={supplyVoltageValue}
                    onChange={handleSupplyVoltage}
                    errorMsg={error.newSupplyVoltage}
                    disabled={isDisabled}
                  />
                  <Input
                    LName="Total Required Contract Demand(in KVA)"
                    Iname="new_contact_demand"
                    type="number"
                    value={contractDemand}
                    onChange={handleContractDemand}
                    placeholder="Please Enter New Contract Demand"
                    errorMsg={error.newContactDemand}
                    disabled={isDisabled || isContractDemandDisabled} // ← Combined condition
                  />
                  <Input
                    LName="Change in Contract Demand (in KVA)"
                    Iname="contract_demand_difference"
                    type="text"
                    value={contractDemandDiff}
                    onChange={() => {}}
                    placeholder="please Enter Contract Demand Difference"
                    errorMsg={error.contract_demand_difference}
                    disabled={isDisabled}
                  />
                  <Input
                    LName="Purpose Of Installation Details"
                    Iname="purpose_of_installation_details"
                    type="text"
                    value={formData.purposeOfInstallationDetails}
                    placeholder="Please Enter Purpose Of Installation Details"
                    errorMsg={error.purposeOfInstallationDetails}
                    disabled={isDisabled}
                  />
                </div>
              </div>
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
                  Bank Details..
                </h2>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <Input
                    LName="Account Holder Name"
                    Iname="ac_holder_name"
                    type="text"
                    value={formData.account_holder_name}
                    placeholder="please Enter Account Holder Name"
                    errorMsg={error.account_holder_name}
                    disabled={isDisabled}
                  />
                  <Input
                    LName="Bank Name"
                    Iname="bank_name"
                    type="text"
                    value={formData.bank_name}
                    placeholder="please Enter Bank Name"
                    errorMsg={error.bank_name}
                    disabled={isDisabled}
                  />
                  <Input
                    LName="Bank IFSC Code"
                    Iname="bank_ifsc_code"
                    type="text"
                    value={formData.ifsc_code}
                    placeholder="please Enter Bank IFSC Code"
                    errorMsg={error.ifsc_code}
                    disabled={isDisabled}
                  />
                  <Input
                    LName="Bank Account Number"
                    Iname="bank_ac_no"
                    type="text"
                    value={formData.account_number}
                    placeholder="please Enter Bank Account Number"
                    errorMsg={error.account_number}
                    disabled={isDisabled}
                  />
                  <Input
                    LName="Upload Bank Passbook/Cheque "
                    Iname="bank_docs"
                    type="file"
                    placeholder="Upload Bank Passbook/Cheque"
                    errorMsg={error.bank_account_file}
                    disabled={isDisabled}
                  />
                </div>
              </div>
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
                  Bank Details..
                </h2>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <Input
                    LName="Upload Pan No"
                    Iname="pan_card_doc "
                    type="file"
                    placeholder="Upload Pan No. "
                    errorMsg={error.pan_no_file}
                    disabled={isDisabled}
                  />
                  <Input
                    LName="Upload GST No"
                    Iname="gst_doc "
                    type="file"
                    placeholder="Upload GST No. "
                    errorMsg={error.gst_no_file}
                    disabled={isDisabled}
                  />
                  <Input
                    LName="Enter Other Document No "
                    Iname="uploaded_doc_no "
                    type="text"
                    placeholder="Enter Other Document No. "
                    errorMsg={error.gst_no_file}
                    disabled={isDisabled}
                  />
                  <Input
                    LName="Enter Other Document Name "
                    Iname="uploaded_doc_name "
                    type="text"
                    placeholder="Enter Other Document Name. "
                    errorMsg={error.gst_no_file}
                    disabled={isDisabled}
                  />
                  <Input
                    LName="Upload Other Document."
                    Iname="upload_file "
                    type="file"
                    placeholder="Upload Other Document . "
                    errorMsg={error.gst_no_file}
                    disabled={isDisabled}
                  />
                </div>
              </div>
              <div className="border-b border-gray-900/10 pb-12 ">
                <div className="mt-10 flex flex-col justify-center items-center">
                  <div className="flex space-x-2 space-y-2 flex-wrap justify-center items-baseline">
                    <button className="rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-red-600 duration-300">
                      Reset
                    </button>
                    {!showButton ? (
                      <button
                        type="submit"
                        disabled={isButton}
                        className="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300"
                      >
                        Submit
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
    </>
  );
}

export default ApplicantReg;
