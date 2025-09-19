import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Cookies from 'js-cookie'
import {HT_LOAD_CHANGE_BASE} from "../../api/api.js"

import {
  InputTag,
  SelectTag,
  RadioTag,
  ApplicantBasicDetails,
  sendOtpNew,
  verifyOtpNew,
} from '../importComponents.js';
import {
  region,
  lineType,
  conductorType,
  poleType,
  setSurveyOptions,
  responseOption,
  revertOption,
} from '../newComponents/commonOption.js';
import ViewTag from '../newComponents/ViewTag.jsx';

const LoadDemandNote = () => {
  const officerData = useSelector(state => state.user.officerData);
  const [mobileNo, setMobileNo] = useState(officerData?.employee_detail.cug_mobile);
  const [showOtpBtn, setShowOtpBtn] = useState(false);
  const [fromDataValue, setFromDataValue] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isBtnDisabled, setBtnIsDisabled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { items } = location.state || {};
  console.log(items, 'items');
  const token = Cookies.get('accessToken')
   
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: items || {},
  });
  const required = items?.survey?.is_estimate_required?.split(',') || [];
  let total_estimate_amt =
    (Number(items?.survey?.ndf_total_amt) || 0) +
    (Number(items?.survey?.total_estimated_amt) || 0);

  setValue('total_demand_note_amt', total_estimate_amt);
  setValue('total_me_estimate_amt', items?.survey?.ndf_total_amt);
  setValue('total_ext_estimate_amt', items?.survey?.total_estimated_amt);
  setValue('total_estimate_amt', total_estimate_amt);
  setValue('application', items.id);
  const demand_note_response = watch('demand_note_response');
  const handleSendOtp = async formData => {
    setFromDataValue(formData);
    const sentOtp = await sendOtpNew(mobileNo);
    if (sentOtp.success) {
      setShowOtpBtn(true);
      setIsDisabled(true);
      setError('otpSuccess', {
        type: 'manual',
        message: sentOtp.message,
      });
    } else {
      setError('otpStatus', {
        type: 'manual',
        message: sentOtp.message,
      });
    }
  };
  const handleVerifyOtp = async () => {
    const otpValue = getValues('otp');
    setBtnIsDisabled(true);
    const verifyOtpResponse = await verifyOtpNew(mobileNo, otpValue);
    if (verifyOtpResponse.success) {
      handleFinalSubmit();
    } else {
      setError('otp', {
        type: 'manual',
        message: verifyOtpResponse.error,
      });
      setBtnIsDisabled(false);
    }
  };
  const handleReSendOtp = async () => {
    clearErrors('otpSuccess');
    const sentOtp = await sendOtpNew(mobileNo);
    setShowOtpBtn(true);
    if (sentOtp) {
      setError('otpSuccess', {
        type: 'manual',
        message: `OTP Resent successfully to ****${mobileNo.slice(-4)}`,
      });
    } else {
      setError('otp', {
        type: 'manual',
        message: `Failed to send OTP on ****${mobileNo.slice(-4)}`,
      });
    }
  };

  const handleFinalSubmit = async () => {
    try {
      const formValue = fromDataValue;
      const formData = new FormData();

      Object.keys(formValue).forEach(key => {
        if (formValue[key] instanceof FileList) {
          if (formValue[key].length > 0) {
            formData.append(key, formValue[key][0]);
          }
        } else {
          formData.append(key, formValue[key]);
        }
      });
      const { data } = await axios.post(`${HT_LOAD_CHANGE_BASE}/demand-note/`, formData, {
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const { data: apiData, ...rest } = data;
      alert('Demand Note submitted successfully ✅');
      navigate(`/dashboard/respones/${apiData.application}`, { state: apiData, rest });
    } catch (error) {
      console.error('API Error:', error);
      alert('Something went wrong ❌');
      
    }finally{
      setBtnIsDisabled(false)

    }
  };
  return (
    <>
      <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
        HT Load Change Demand Note generation
      </h2>
      <div className="mt-6 overflow-x-auto">
        <div className="body p-4">
          {officerData?.employee_detail.role}
          <ApplicantBasicDetails htConsumers={items} register={register} errors={errors} />
          {/* <ApplicantFillDetails htConsumers={items} /> */}
          {officerData?.employee_detail.role == 3 && (
            <>
              {required.includes('is_extension_work_required') && (
                <>
                  <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
                    ERP Details Of Extension Work Demand Amounts
                  </h2>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                          ERP No:-{items?.survey?.erp_no}
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-right text-gray-500 uppercase">
                          Scheme Name:-{items?.survey?.scheme_name}
                        </th>
                        <th
                          colSpan={2}
                          className="px-6 py-3 text-xs font-medium text-right text-gray-500 uppercase"
                        >
                          Estimate Date:-{items?.survey?.estimate_date}
                        </th>
                      </tr>
                      <tr>
                        <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                          S No.
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                          Particular
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                          Account Head
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr className="transition-all hover:bg-gray-100 hover:shadow-lg">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">1</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                            Supervision Amount
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                          62.925
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                          {items?.survey?.supervision_amt}
                        </td>
                      </tr>
                      <tr className="transition-all hover:bg-gray-100 hover:shadow-lg">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">1</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                            Supervision CGST Cost
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                          46.948
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                          {items?.survey?.supervision_cgst}
                        </td>
                      </tr>
                      <tr className="transition-all hover:bg-gray-100 hover:shadow-lg">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">1</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                            Supervision SGST Cost
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                          46.948
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                          {items?.survey?.supervision_sgst}
                        </td>
                      </tr>
                      <tr className="transition-all hover:bg-gray-100 hover:shadow-lg">
                        <td
                          colspan="3"
                          className="px-6 py-4 text-sm text-center text-gray-500 font-medium  whitespace-nowrap"
                        >
                          Total Costs
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                          {items?.survey?.total_estimated_amt}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </>
              )}
              {required.includes('is_me_meter_required') && (
                <>
                  <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
                    ERP Details Of Deposit ME Meter Estimates Amounts
                  </h2>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                          ERP No:-<span className="font-medium"> {items?.survey?.ndf_erp_no}</span>
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-right text-gray-500 uppercase">
                          Scheme Name:-{' '}
                          <span className="font-medium">{items?.survey?.ndf_scheme_name}</span>
                        </th>
                        <th
                          colSpan={2}
                          className="px-6 py-3 text-xs font-medium text-right text-gray-500 uppercase"
                        >
                          Estimate Date :-
                          <span className="font-medium">{items?.survey?.ndf_estimate_date}</span>
                        </th>
                      </tr>
                      <tr>
                        <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                          S No.
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                          Particular
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                          Account Head
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-left text-gray-500 uppercase">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr className="transition-all hover:bg-gray-100 hover:shadow-lg">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">1</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                            Total Cost of Estimate in Rs.
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                          47.320s
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                          {items?.survey?.ndf_total_amt}
                        </td>
                      </tr>
                      <tr className="transition-all hover:bg-gray-100 hover:shadow-lg">
                        <td
                          colSpan={3}
                          className="px-6 py-4 text-sm text-center text-gray-500 font-medium whitespace-nowrap"
                        >
                          Total ME Costs
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-left whitespace-nowrap">
                          {items?.survey?.ndf_total_amt}
                        </td>
                      </tr>
                      <tr>
                        <td
                          colSpan={3}
                          className="px-6 py-3 text-xs font-medium text-right text-gray-500 uppercase"
                        >
                          Total Demand Note Amount
                        </td>
                        <td className="px-6 py-3 text-xs text-left  font-medium text-gray-500 uppercase">
                          {total_estimate_amt}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </>
              )}

              <form onSubmit={handleSubmit(handleSendOtp)}>
           
                <input type="hidden" {...register('application')}></input>
                <div className="border-b border-gray-900/10 pb-12">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <Link className="rounded-lg  px-3 py-2 text-center text-green-100 bg-indigo-500 hover:bg-fuchsia-500 duration-300">
                      Download Draft Agreement
                    </Link>
                    {required.includes('is_extension_work_required') && (
                      <Link  className="rounded-lg   px-3 py-2 text-center text-green-100 bg-indigo-500 hover:bg-fuchsia-500 duration-300"
                      to={items.survey_checklist_docs} 
                      target="_blank" 
                      rel="noopener noreferrer">
                        Extention Work Estimate
                      </Link>
                    )}
                    {required.includes('is_me_meter_required') && (

                      
                      <Link
                      to={items?.survey?.survey_checklist_docs} 
                      target="_blank" 
                      rel="noopener noreferrer" className="rounded-lg  px-3 py-2 text-center text-green-100 bg-indigo-500 hover:bg-fuchsia-500 duration-300">
                      {items?.survey?.survey_checklist_docs ? 'ME Work Estimate' : 'No File View'}
                        
                      </Link>
                    )}
                  </div>
                </div>
                <div className="border-b border-gray-900/10 pb-12">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <SelectTag
                      LName="Acceptance"
                      options={responseOption}
                      {...register('demand_note_response', {
                        required: 'Please Select  Acceptance is required',
                      })}
                      errorMsg={errors.demand_note_response?.message}
                      labelKey="label"
                      valueKey="value"
                      disabled={isDisabled}
                    />
                    {demand_note_response === 'Accepted' && (
                      <>
                            <input type="hidden" {...register('total_demand_note_amt')}></input>
                            <input type="hidden" {...register('total_me_estimate_amt')}></input>
                            <input type="hidden" {...register('total_ext_estimate_amt')}></input>
                            <input type="hidden" {...register('total_estimate_amt')}></input>
                      </>
                    )}
                    {demand_note_response === 'Reverted' && (
                      <>
                        <SelectTag
                          options={revertOption}
                          LName="Revert Reason"
                          {...register('revert_reason', {
                            required: 'Please Select Revert Reason is required',
                          })}
                          errorMsg={errors.revert_reason?.message}
                          labelKey="label"
                          valueKey="value"
                          disabled={isDisabled}
                        />
                        <InputTag
                          LName="Revert Reason Remark"
                          placeholder="Please Enter Revert Reason Remark"
                          {...register('revert_reason_remark', {
                            required: 'Revert Reason Remark is required',
                          })}
                          errorMsg={errors.revert_reason_remark?.message}
                          disabled={isDisabled}
                        />
                        <InputTag
                          LName="Upload Revert Docs"
                          type="file"
                          {...register('upload_revert_docs', {
                            required: 'Upload Upload Revert Docs is required',
                          })}
                          errorMsg={errors.upload_revert_docs?.message}
                          disabled={isDisabled}
                        />
                      </>
                    )}
                  </div>
                </div>
                <div className="border-b border-gray-900/10 pb-12">
                  <div className="mt-10 flex flex-col justify-center items-center">
                    <div className="flex space-x-2 space-y-2 flex-wrap justify-center items-baseline">
                      {!showOtpBtn && (
                        <>
                          <button className="rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-red-600 duration-300">
                            Reset
                          </button>
                          {demand_note_response === 'Reverted' ? (
                            <button
                              type="submit"
                             className={`  text-white px-4 py-2 mt-4 rounded 
                                         ${isDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-purple-800 text-white'}`}
                              disabled={isDisabled}
                            >
                              {isDisabled ? 'Please wait...' : 'Revet For Survey'}
                            </button>
                          ) : (
                            <button
                              type="submit"
                              className={`  text-white px-4 py-2 mt-4 rounded 
                                         ${isDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-purple-800 text-white'}`}
                              disabled={isDisabled}
                            >
                              {isDisabled ? 'Please wait...' : 'Send for Applicant'}
                            </button>
                          )}
                        </>
                      )}
                      {showOtpBtn && (
                        <>
                          <InputTag
                            LName=""
                            placeholder="Please Enter Otp."
                            {...register('otp', {
                              required: 'Otp is required',
                            })}
                            errorMsg={errors.otp?.message}
                          />
                          <button
                            type="button"
                            onClick={handleVerifyOtp}
                            className={`bg-green-600 text-white px-4 py-2 mt-4 rounded"
                                                                   ${isBtnDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-purple-800 text-white'}`}
                            disabled={isBtnDisabled}
                          >
                            {isBtnDisabled ? 'Please wait...' : ' Verify Otp'}
                          </button>

                          <button
                            type="button"
                            onClick={handleReSendOtp}
                            className="bg-emerald-600 text-white px-4 py-2 mt-4 rounded"
                          >
                            Resend Otp
                          </button>
                        </>
                      )}
                    </div>
                    {errors?.otpSuccess && (
                      <p className="text-green-500 text-sm mt-1">{errors?.otpSuccess?.message}</p>
                    )}
                    {errors?.otpStatus && (
                      <p className="text-red-500 text-sm mt-1">{errors?.otpStatus?.message}</p>
                    )}
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default LoadDemandNote;
