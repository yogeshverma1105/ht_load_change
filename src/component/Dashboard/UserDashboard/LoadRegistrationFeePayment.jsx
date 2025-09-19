import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation, useParams,Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import {ApplicantBasicDetails,SelectTag,InputTag,Button}from '../../importComponents'
import{responseOption,revertOption } from "../../newComponents/commonOption"
const LoadRegistrationFeePayment = () => {
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
      setValue('registration_amount',items?.tariff_charges?.total_pay_amount)
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
        HT Load Change {items?.application_status_text}
      </h2>
      <div className="mt-6 overflow-x-auto">
        <form >
          <div className="body p-4">
            {officerData?.employee_detail?.role}
            
            <ApplicantBasicDetails htConsumers={items} register={register}errors={errors} />
            {officerData?.employee_detail.role !== 3 && (
              <>
                 <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
                {items?.application_status_text}
                </h2>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">
                <InputTag
                    LName="Registration Amount"
                    {...register("registration_amount", )}
                    errorMsg={errors.registration_amount?.message}
                    disabled={isDisabled}
                    />
                <Link to={`https://htsanyojanuat.mpcz.in:8088/ht-load-change-api/call_lc_regfee/${items?.id}`}><Button label=' Pay Registration Fee'></Button></Link>
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
export default LoadRegistrationFeePayment;
