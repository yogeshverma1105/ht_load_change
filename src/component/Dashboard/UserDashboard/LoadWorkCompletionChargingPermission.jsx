import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import {ApplicantBasicDetails,SelectTag,InputTag,Button}from '../../importComponents'
import{responseOption,revertOption } from "../../newComponents/commonOption"
const LoadDemandNotePayment = () => {
    const officerData = useSelector(state => state.user.officerData);
    const location  = useLocation()
    const {items} =location.state||{}
    console.log(items,"items")
    const {register,setError,clearErrors,watch,setValue,getValues,formState: { errors }, }=useForm({
        defaultValues:items||{}
    })

    const token = Cookies.get("accessToken");
    
      // States
      const [mobileNo] = useState(officerData?.employee_detail.cug_mobile);
      const [showOtpBtn, setShowOtpBtn] = useState(false);
      const [formDataValue, setFormDataValue] = useState(null);
      const [isDisabled, setIsDisabled] = useState(false);
      const [isBtnDisabled, setBtnIsDisabled] = useState(false);
      const work_completion_response = watch("work_completion_response")
//  const handleSendOtp = async formData => {
//     setFormDataValue(formData);
//     const sentOtp = await sendOtpNew(mobileNo);
//     if (sentOtp.success) {
//       setShowOtpBtn(true);
//       setIsDisabled(true);
//       setError('otpSuccess', {
//         type: 'manual',
//         message: sentOtp.message,
//       });
//     } else {
//       setError('otpStatus', {
//         type: 'manual',
//         message: sentOtp.message,
//       });
//     }
//   };
//   const handleVerifyOtp = async () => {
//     const otpValue = getValues('otp');
//     setBtnIsDisabled(true);
//     const verifyOtpResponse = await verifyOtpNew(mobileNo, otpValue);
//     if (verifyOtpResponse.success) {
//       handleFinalSubmit();
//     } else {
//       setError('otp', {
//         type: 'manual',
//         message: verifyOtpResponse.error,
//       });
//       setBtnIsDisabled(false);
//     }
//   };
//   const handleReSendOtp = async () => {
//     clearErrors('otpSuccess');
//     const sentOtp = await sendOtpNew(mobileNo);
//     setShowOtpBtn(true);
//     if (sentOtp) {
//       setError('otpSuccess', {
//         type: 'manual',
//         message: `OTP Resent successfully to ****${mobileNo.slice(-4)}`,
//       });
//     } else {
//       setError('otp', {
//         type: 'manual',
//         message: `Failed to send OTP on ****${mobileNo.slice(-4)}`,
//       });
//     }
//   };

//   const handleFinalSubmit = async () => {
//     try {
//       const formValue = fromDataValue;
//       const formData = new FormData();

//       Object.keys(formValue).forEach(key => {
//         if (formValue[key] instanceof FileList) {
//           if (formValue[key].length > 0) {
//             formData.append(key, formValue[key][0]);
//           }
//         } else {
//           formData.append(key, formValue[key]);
//         }
//       });
//       const { data } = await axios.post('/ht_load_change/demand-note/', formData, {
//         headers: {
//           // 'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const { data: apiData, ...rest } = data;
//       alert('Demand Note submitted successfully ✅');
//       navigate(`/dashboard/respones/${apiData.application}`, { state: apiData, rest });
//     } catch (error) {
//       console.error('API Error:', error);
//       alert('Something went wrong ❌');
      
//     }finally{
//       setBtnIsDisabled(false)

//     }
//   };
  return (
    <>
      <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
        HT Load Change {items.application_status_text}
      </h2>
      <div className="mt-6 overflow-x-auto">
        <form >
          <div className="body p-4">
            <ApplicantBasicDetails htConsumers={items} register={register}errors={errors} />
            {officerData?.employee_detail.role !== 3 && (
              <>
                 <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
                {items.application_status_text}
                </h2>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">
                    <SelectTag
                        LName="Contractor Category"
                        options={responseOption}
                        {...register("contractor_category", {
                            required: "Please Select Contractor Category",
                        })}
                        errorMsg={errors.contractor_category?.message}
                        labelKey="label"
                        valueKey="value"
                        disabled={isDisabled}
                        />
                    <SelectTag
                        LName="Contractor Name"
                        options={responseOption}
                        {...register("contractor_name", {
                            required: "Please Select Contractor Name",
                        })}
                        errorMsg={errors.contractor_name?.message}
                        labelKey="label"
                        valueKey="value"
                        disabled={isDisabled}
                        />
                     <InputTag
                        LName="Contractor Company Name"
                        {...register("contractor_company_name", {
                            required: "Contractor Company Name is required",
                        })}
                        errorMsg={errors.contractor_company_name?.message}
                        disabled={isDisabled}
                        />
                     <InputTag
                        LName="Contractor Mobile No."
                        {...register("contractor_mobile_no", {
                            required: "Contractor Mobile No is required",
                        })}
                        errorMsg={errors.contractor_mobile_no?.message}
                        disabled={isDisabled}
                        />
                     <InputTag
                        LName="Authentication id"
                        {...register("authentication_id", {
                            required: "Authentication id is required",
                        })}
                        errorMsg={errors.authentication_id?.message}
                        disabled={isDisabled}
                        />
                     <InputTag
                        LName="Registration Date"
                        {...register("registration_date", {
                            required: "Registration Date is required",
                        })}
                        errorMsg={errors.registration_date?.message}
                        disabled={isDisabled}
                        />
                     <InputTag
                        LName="Contractor Consent Letter"
                        type="file"
                        {...register("contractor_consent_docs", {
                            required: "Contractor Consent Letter is required",
                        })}
                        errorMsg={errors.contractor_consent_docs?.message}
                        disabled={isDisabled}
                        />
                     <InputTag
                        LName="Signed Letter of Work Completion"
                        type="file"
                        {...register("signed_docs", {
                            required: "Signed Letter is required",
                        })}
                        errorMsg={errors.signed_docs?.message}
                        disabled={isDisabled}
                        />
                     <InputTag
                        LName="Clearance Certificate From Electrical Inspector"
                        type="file"
                        {...register("clearance_certificate_docs", {
                            required: "Clearance Certificate is required",
                        })}
                        errorMsg={errors.clearance_certificate_docs?.message}
                        disabled={isDisabled}
                        />
              


                <Button  label="FILL WORK COMPLETION"/>
                </div>
            </div>
              
                </>
            )}

             
            
            </div>
        </form>
      </div>
      </>
    
  );
};
export default LoadDemandNotePayment;
