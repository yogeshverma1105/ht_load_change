import React, { useEffect, useState } from 'react';
import Input from '../../component/Input';
import SelectBox from '../../component/SelectBox';
import ApplicantBasicDetails from '../ApplicantBasicDetails';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { dropdownOptions, supplyVoltageOption } from '../../utils/supplyVoltage.js';

import { validateVoltageRange, validateDemandLogic } from '../../utils/handleContactDemand.js';
import { extractFormValues } from '../../utils/extractFormValues.js';
import { submitFormData } from '../../utils/handlePostApi.js';
import { handleGetApi } from '../../utils/handleGetApi.js';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ShowAndUpdateDetails() {
  const navigate = useNavigate();
  const userData = useSelector(state => state.user.userData);
  const [supplyVoltage, setSupplyVoltage] = useState(supplyVoltageOption);

  const [currentVoltage, setCurrentVoltage] = useState(null);
  const [formData, setFormData] = useState({});
  const [typeChange, setTypeChange] = useState('');
  const [supplyVoltageValue, setSupplyVoltageValue] = useState('');
  const [showButton, setShowButton] = useState(false);

  const [isDisabled, setIsDisabled] = useState(false);
  const [contractDemand, setContractDemand] = useState('');
  const [currentContractDemand, setCurrentContractDemand] = useState('');
  const [contractDemandDiff, setContractDemandDiff] = useState('');
  const [error, setError] = useState({});
  const newErrors = {};

  const { consumerId } = useParams();
  console.log(consumerId, 'consumerId');

  const handleTypeOfChange = e => {
    setTypeChange(e.target.value);
    const { name, value } = e.target;
    setSupplyVoltageValue('');
    setContractDemand('');
    setContractDemandDiff('');
    const typeOfChangeValue = e.target.value;
    if (typeOfChangeValue === 'Load_Enhancement') {
      let supplyVoltageChange = dropdownOptions.supplyVoltage.filter(v => {
        const volt = parseInt(v.value);

        return volt >= parseInt(currentVoltage);
      });
      setSupplyVoltage(supplyVoltageChange);
    } else {
      let supplyVoltageChange = dropdownOptions.supplyVoltage.filter(v => {
        const volt = parseInt(v.value);

        return volt <= parseInt(currentVoltage);
      });
      setSupplyVoltage(supplyVoltageChange);
    }
  };
  const handleSupplyVoltage = e => {
    setSupplyVoltageValue(e.target.value);
    const { name, value } = e.target;
    // setFormData((prev) => ({ ...prev, [name]: value, }));
    setContractDemand('');
    setContractDemandDiff('');
  };

  const handleContractDemand = e => {
    const value = Number(e.target.value);
    const { name } = e.target;
    const updatedErrors = { ...newErrors };
    setContractDemand(e.target.value);

    // Step 1: Voltage Range Validation
    if (typeChange === 'Load_Enhancement' || typeChange === 'Load_Reduction') {
      const voltageError = validateVoltageRange(supplyVoltageValue, value);
      if (voltageError) {
        updatedErrors.newContactDemand = voltageError;
        setError(updatedErrors);
        return;
      }
    }

    // Step 2: Business Logic Validation
    const demandError = validateDemandLogic(typeChange, value, Number(currentContractDemand));
    if (demandError) {
      updatedErrors.newContactDemand = demandError;
      setError(updatedErrors);
      return;
    }

    // Step 3: Set Contract Demand Diff
    setContractDemandDiff(value - Number(currentContractDemand));
    setError({}); // clear previous error if all good
  };

  const schema = yup.object().shape({
    type_of_change: yup.string().required('Type of Change is Required '),
    newSupplyVoltage: yup.string().required('New Supply Voltage  is Required'),
    newContactDemand: yup
      .number()
      .required('New Contact Demand is Required')
      .integer('Contact Demand Only Number')
      .typeError('Contact Demand Only Number'),
    purposeOfInstallationDetails: yup
      .string()
      .required('New Purpose Of Installation Details is Required'),
    ac_holder_name: yup.string().required('Account Holder Name is Required'),
    bank_name: yup.string().required('Bank Name Name is Required'),
    bank_ifsc_code: yup.string().required('Bank IFSC Code is Required'),
    bank_ac_no: yup.string().required('Bank Account Number is Required'),
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

    // Step 1: Extract Form Data
    const formData = new FormData(e.target);
    const tempObj = extractFormValues(formData);

    try {
      // Step 2: Validate form data
      await schema.validate(tempObj, { abortEarly: false });

      // Step 3: Reset errors and disable submit
      setError({});
      setIsDisabled(true);

      // Step 4: Submit Form
      const response = await submitFormData(
        formData,
        '/ht_load_change/submit-load-change-application/'
      );

      // Step 5: Handle Response
      const result = await response.json();
      navigate(`/ht-load-change/edit/H9707022000`);

      setShowButton(true);
      setIsDisabled(true);
      console.log(result, 'result');
    } catch (err) {
      // Step 6: Handle Validation or Fetch Error
      handleFormErrors(err);
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

  useEffect(() => {
    console.log(userData, '');
    if (userData && Object.keys(formData).length === 0) {
      setFormData({ ...userData });
      console.log(userData.new_supply_voltage, 'fgjifguhfdhghjdfgdfgfg');
      setTypeChange(userData.type_of_change);
      setSupplyVoltageValue(userData.new_supply_voltage);
      setContractDemand(userData.newContactDemand || '');
      setContractDemandDiff(userData.contract_demand_difference || '');
    }
  }, [userData]);

  return (
    <>
      <form onSubmit={onSubmithandler}>
        <div className="space-y-12 container mx-auto border my-5 rounded-md border-gray shadow-md">
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
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <Input
                  LName="Consumer Id"
                  Iname="consumer_id"
                  type="text"
                  value={formData.consumer_id}
                  placeholder="please Enter Consumer Id "
                />
                <Input
                  LName="Consumer Name"
                  Iname="consumer_name"
                  type="text"
                  value={formData.consumer_name}
                  placeholder="please Enter Consumer Name "
                />
                <Input
                  LName="Mobile"
                  Iname="mobile"
                  type="number"
                  value={formData.mobile}
                  placeholder="please Enter Consumer Name "
                />
                <Input
                  LName="Email"
                  Iname="email"
                  type="email"
                  value={formData.email}
                  placeholder="please Enter Consumer Name "
                />
                <Input
                  LName="Address"
                  Iname="address"
                  type="text"
                  value={formData.address}
                  placeholder="please Enter Consumer Name "
                />
                <Input
                  LName="PanCard"
                  Iname="pan_card_no"
                  type="text"
                  value={formData.pan_card_no}
                  placeholder="please Enter Consumer Name "
                />
                <Input
                  LName="Connection Date"
                  Iname="connection_date"
                  type="text"
                  value={formData.connection_date}
                  placeholder="please Enter Consumer Name "
                />
                <Input
                  LName="Load Effective Date"
                  Iname="existing_load_effective_date"
                  type="text"
                  value={formData.existing_load_effective_date}
                  placeholder="please Enter Load Effective Date "
                />
                <Input
                  LName="Region"
                  Iname="region"
                  type="text"
                  value={formData.region}
                  placeholder="please Enter Consumer Name "
                />
                <Input
                  LName="Circle"
                  Iname="circle"
                  type="text"
                  value={formData.circle}
                  placeholder="please Enter Consumer Name "
                />
                <Input
                  LName="Division"
                  Iname="division"
                  type="text"
                  value={formData.division}
                  placeholder="please Enter Consumer Name "
                />
                <Input
                  LName="Substation Name"
                  Iname="substation_name"
                  type="text"
                  value={formData.substation_name}
                  placeholder="please Enter Consumer Name "
                />
                <Input
                  LName="Feeder Name"
                  Iname="feedername"
                  type="text"
                  value={formData.feedername}
                  placeholder="please Enter Consumer Name "
                />
              </div>
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
                  Connection Details..
                </h2>
                {/* <p className="mt-1 text-sm/6 text-gray-600">
                  This information will be displayed publicly so be careful what you share.
                </p> */}

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <Input
                    LName="Connection Type"
                    Iname="connection_type"
                    type="text"
                    value={formData.connection_type}
                    placeholder="please Enter Consumer Id "
                  />
                  <Input
                    LName="Connection Category"
                    Iname="connection_category"
                    type="text"
                    value={formData.connection_category}
                    placeholder="please Enter Consumer Id "
                  />
                  <Input
                    LName="Connection Sub Category"
                    Iname="connection_sub_category"
                    type="text"
                    value={formData.connection_sub_category}
                    placeholder="please Enter Consumer Id "
                  />
                  <Input
                    LName="Connection Purpose"
                    Iname="connection_purpose"
                    type="text"
                    value={formData.connection_purpose}
                    placeholder="please Enter Consumer Id "
                  />
                  <Input
                    LName="Existing Supply Voltage"
                    Iname="existing_supply_voltage"
                    type="text"
                    value={formData.existing_supply_voltage}
                    placeholder="please Enter Consumer Id "
                  />
                  {formData?.connectionType === 'Permanent' && (
                    <Input
                      LName="Existing Contact Demand "
                      Iname="existing_contract_demand"
                      type="text"
                      value={formData.existing_contract_demand}
                      placeholder="please Enter Consumer Id "
                    />
                  )}
                  {formData?.connectionType === 'Temporary' && (
                    <Input
                      LName=" Existing Temporary Contact Demand "
                      Iname="temporaryLoad"
                      type="text"
                      value={formData.tempCd}
                      placeholder="please Enter Consumer Id "
                    />
                  )}
                </div>
              </div>
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
                  METER Details..
                </h2>
                {/* <p className="mt-1 text-sm/6 text-gray-600">
                  This information will be displayed publicly so be careful what you share.
                </p> */}

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <Input
                    LName="ME Serial No"
                    Iname="me_serial_no"
                    type="text"
                    value={formData.me_serial_no}
                    placeholder="please Enter Consumer Id "
                  />
                  <Input
                    LName="ME Make"
                    Iname="me_make"
                    type="text"
                    value={formData.me_make}
                    placeholder="please Enter Consumer Id "
                  />
                  <Input
                    LName="ME Ct Ratio"
                    Iname="me_ct_ratio"
                    type="text"
                    value={formData.me_ct_ratio}
                    placeholder="please Enter Consumer Id "
                  />
                  <Input
                    LName="ME Pt Ratio"
                    Iname="me_pt_ratio"
                    type="text"
                    value={formData.me_pt_ratio}
                    placeholder="please Enter Consumer Id "
                  />
                  <Input
                    LName="Meter Type"
                    Iname="metertype"
                    type="text"
                    value={formData.metertype}
                    placeholder="please Enter Consumer Id "
                  />
                  <Input
                    LName="Solar Installation Capacity"
                    Iname="solar_installation_capacity"
                    type="text"
                    value={formData.solar_installation_capacity}
                    placeholder="please Enter solar Installation Capacity "
                  />
                  <Input
                    LName="Net Meter Install Date"
                    Iname="meter_install_date"
                    type="text"
                    value={formData.meter_install_date}
                    placeholder="please Enter solar Installation Capacity "
                  />
                  <Input
                    LName="Meter No"
                    Iname="meter_no"
                    type="text"
                    value={formData.meter_no}
                    placeholder="please Enter Consumer Id "
                  />
                  <Input
                    LName="Meter Make"
                    Iname="meter_make"
                    type="text"
                    value={formData.meter_make}
                    placeholder="please Enter Consumer Id "
                  />
                  <Input
                    LName="Meter Ct Ratio"
                    Iname="meter_ct_ratio"
                    type="text"
                    value={formData.meter_ct_ratio}
                    placeholder="please Enter Consumer Id "
                  />
                  <Input
                    LName="Meter Pt Ratio"
                    Iname="meter_pt_ratio"
                    type="text"
                    value={formData.meter_pt_ratio}
                    placeholder="please Enter Consumer Id "
                  />
                  <Input
                    LName="Meter Accuracy Class"
                    Iname="meteraccuracy"
                    type="text"
                    value={formData.meteraccuracy}
                    placeholder="please Enter Consumer Id "
                  />
                  <Input
                    LName="Dial Factor"
                    Iname="dial_factor"
                    type="text"
                    value={formData.dial_factor}
                    placeholder="please Enter Consumer Id "
                  />
                  <Input
                    LName="MF(Multiply )"
                    Iname="mf"
                    type="text"
                    value={formData.mf}
                    placeholder="please Enter Consumer Id "
                  />
                </div>
              </div>
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
                  Bill Details..
                </h2>
                {/* <p className="mt-1 text-sm/6 text-gray-600">
                  This information will be displayed publicly so be careful what you share.
                </p> */}

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <Input
                    LName="Previous Bill Id"
                    Iname="prevbillid"
                    type="text"
                    value={formData.prevbillid}
                    placeholder="please Enter Consumer Id "
                  />
                  <Input
                    LName="Previous Bill Month"
                    Iname="previous_bill_month"
                    type="text"
                    value={formData.previous_bill_month}
                    placeholder="please Enter Consumer Id "
                  />
                  <Input
                    LName="Previous Bill Units"
                    Iname="previous_billed_units"
                    type="text"
                    value={formData.previous_billed_units}
                    placeholder="please Enter Consumer Id "
                  />
                  <Input
                    LName="Previous Net Bill"
                    Iname="previous_net_bill"
                    type="text"
                    value={formData.previous_net_bill}
                    placeholder="please Enter Consumer Id "
                  />
                  <Input
                    LName="Current Bill Id"
                    Iname="bill_id"
                    type="text"
                    value={formData.bill_id}
                    placeholder="please Enter Consumer Id "
                  />
                  <Input
                    LName="Current bill Month"
                    Iname="bill_month"
                    type="text"
                    value={formData.bill_month}
                    placeholder="please Enter Consumer Id "
                  />
                  <Input
                    LName="Current Bill Units"
                    Iname="billed_units"
                    type="text"
                    value={formData.billed_units}
                    placeholder="please Enter Consumer Id "
                  />
                  <Input
                    LName="Current Net Bill"
                    Iname="net_bill"
                    type="text"
                    value={formData.net_bill}
                    placeholder="please Enter Consumer Id "
                  />
                </div>
              </div>
              s
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
                  Required Load Details
                </h2>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <SelectBox
                    LName="Type of Change"
                    Iname="type_of_change"
                    optionVal={dropdownOptions.typeOfChanges}
                    value={typeChange}
                    onChange={handleTypeOfChange}
                    errorMsg={error.typeOfChange}
                    disabled={isDisabled}
                  />
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
                    Iname="newContactDemand"
                    type="number"
                    value={contractDemand}
                    onChange={handleContractDemand}
                    placeholder="please Enter New Contact Demand"
                    errorMsg={error.newContactDemand}
                    disabled={isDisabled}
                  />
                  <Input
                    LName="Change in Contract Demand (in KVA)"
                    Iname="contract_demand_difference "
                    type="text"
                    value={contractDemandDiff}
                    onChange={() => {}}
                    placeholder="please Enter Contract Demand Difference"
                    errorMsg={error.contract_demand_difference}
                    disabled={isDisabled}
                  />
                  <Input
                    LName="Purpose Of Installation Details"
                    Iname="purposeOfInstallationDetails"
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
                  <Input
                    LName="Upload Bank Passbook/Cheque "
                    Iname="load_doc"
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
                    <button class="rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-red-600 duration-300">
                      Reset
                    </button>
                    {!showButton ? (
                      <button
                        type="submit"
                        class="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300"
                      >
                        Submit
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
                        onClick={() => setIsDisabled(false)}
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

export default ShowAndUpdateDetails;
