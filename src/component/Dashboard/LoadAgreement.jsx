import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate,Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import axios from "axios";
import {
  InputTag,
  SelectTag,
  ApplicantBasicDetails,
  sendOtpNew,
  verifyOtpNew
} from "../importComponents.js";
import { responseOption, revertOption } from "../newComponents/commonOption.js";
import {HT_LOAD_CHANGE_BASE} from '../../api/api.js'

const LoadAgreement = () => {
  const officerData = useSelector((state) => state.user.officerData);
  const navigate = useNavigate();
  const location = useLocation();
  const { items } = location.state || {};
  console.log(items,"items")
const required = items?.survey?.is_estimate_required?.split(',') || [];

  const token = Cookies.get("accessToken");

  // States
  const [mobileNo] = useState(officerData?.employee_detail.cug_mobile);
  const [showOtpBtn, setShowOtpBtn] = useState(false);
  const [formDataValue, setFormDataValue] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isBtnDisabled, setBtnIsDisabled] = useState(false);

  // Form
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: items || {},
  });

  const agreement_response = watch("agreement_response");

  // 🔹 Send OTP
  const handleSendOtp = async (formData) => {
    setFormDataValue(formData);
    const sentOtp = await sendOtpNew(mobileNo);
    if (sentOtp.success) {
      setShowOtpBtn(true);
      setIsDisabled(true);
      setError("otpSuccess", { type: "manual", message: sentOtp.message });
    } else {
      setError("otpStatus", { type: "manual", message: sentOtp.message });
    }
  };

  // 🔹 Verify OTP
  const handleVerifyOtp = async () => {
    const otpValue = getValues("otp");
    setBtnIsDisabled(true);
    const verifyOtpResponse = await verifyOtpNew(mobileNo, otpValue);

    if (verifyOtpResponse.success) {
      handleFinalSubmit();
    } else {
      setError("otp", { type: "manual", message: verifyOtpResponse.error });
      setBtnIsDisabled(false);
    }
  };

  // 🔹 Resend OTP
  const handleReSendOtp = async () => {
    clearErrors("otpSuccess");
    const sentOtp = await sendOtpNew(mobileNo);
    setShowOtpBtn(true);

    if (sentOtp.success) {
      setError("otpSuccess", {
        type: "manual",
        message: `OTP Resent successfully to ****${mobileNo.slice(-4)}`,
      });
    } else {
      setError("otp", {
        type: "manual",
        message: `Failed to send OTP on ****${mobileNo.slice(-4)}`,
      });
    }
  };

  // 🔹 Final Submit API Call
  const handleFinalSubmit = async () => {
    try {
      const formValue = formDataValue;
      const formData = new FormData();

      Object.keys(formValue).forEach((key) => {
        if (formValue[key] instanceof FileList && formValue[key].length > 0) {
          formData.append(key, formValue[key][0]);
        } else {
          formData.append(key, formValue[key]);
        }
      });

      const { data } = await axios.post(
        `${HT_LOAD_CHANGE_BASE}/agreement-details/`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Agreement And Work Order submitted successfully ✅");
      navigate(`/dashboard/respones/${data.data.application}`, { state: data });
    } catch (error) {
      console.error("API Error:", error);
      alert("Something went wrong ❌");
    } finally {
      setBtnIsDisabled(false);
    }
  };

  return (
    <>
      <h2 className="text-base font-semibold text-gray-900 bg-gray-300 p-3 rounded-md shadow-md">
        HT Load Change Agreement Finalization
      </h2>

      <div className="mt-6 overflow-x-auto">
        {/* ✅ Yahan handleSubmit correctly laga hua hai */}
        <form onSubmit={handleSubmit(handleSendOtp)}>
          <div className="body p-4">
            <ApplicantBasicDetails
              htConsumers={items}
              register={register}
              errors={errors}
            />

            {officerData?.employee_detail.role == 3 && (
              <>
                <input
                  type="hidden"
                  value={items?.id}
                  {...register("application")}
                />
                <div className="border-b border-gray-900/10 pb-12">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <Link className="rounded-lg  px-3 py-2 text-center text-green-100 bg-indigo-500 hover:bg-fuchsia-500 duration-300">
                      View Registration invoice
                  </Link>
                <Link className="rounded-lg  px-3 py-2 text-center text-green-100 bg-indigo-500 hover:bg-fuchsia-500 duration-300">
                      View Supply Affording Charges invoice
                  </Link>
                <Link className="rounded-lg  px-3 py-2 text-center text-green-100 bg-indigo-500 hover:bg-fuchsia-500 duration-300">
                      View Security Deposit (SD) invoice
                  </Link>

                   {required==="is_estimate_required" &&(
                    <Link className="rounded-lg  px-3 py-2 text-center text-green-100 bg-indigo-500 hover:bg-fuchsia-500 duration-300">
                      View Demand Note invoice
                    </Link>
                     )} 
                  {required?.includes('is_me_meter_required')&&(
                    <Link className="rounded-lg  px-3 py-2 text-center text-green-100 bg-indigo-500 hover:bg-fuchsia-500 duration-300">
                      View ME Estimate invoice
                    </Link>
                   )}
                   {required?.includes('is_extension_work_required')&&(
                    <Link className="rounded-lg  px-3 py-2 text-center text-green-100 bg-indigo-500 hover:bg-fuchsia-500 duration-300">
                      View Extension Work Estimate invoice
                    </Link>
                   )}
                  
                </div>
                </div>
                <div className="border-b border-gray-900/10 pb-12">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <SelectTag
                    LName="Acceptance"
                    options={responseOption}
                    {...register("agreement_response", {
                      required: "Please Select Acceptance",
                    })}
                    errorMsg={errors.agreement_response?.message}
                    labelKey="label"
                    valueKey="value"
                    disabled={isDisabled}
                  />

                  {/* Accepted Case */}
                  {agreement_response === "Accepted" && (
                    <>
                      <InputTag
                        LName="Agreement No."
                        placeholder="Enter Agreement No."
                        {...register("agreement_no", {
                          required: "Agreement No is required",
                        })}
                        errorMsg={errors.agreement_no?.message}
                        disabled={isDisabled}
                      />
                      <InputTag
                        LName="Agreement Effective Date"
                        type="date"
                        {...register("agreement_effective_date", {
                          
                          required: "Effective Date is required",
                        })}
                        errorMsg={errors.agreement_effective_date?.message}
                        disabled={isDisabled}
                      />
                      <InputTag
                        LName="Final Agreement Letter"
                        type="file"
                        {...register("agreement_doc", {
                          required: "Agreement Letter is required",
                        })}
                        errorMsg={errors.agreement_doc?.message}
                        disabled={isDisabled}
                      />

                      {required?.includes('is_extension_work_required') && (<>
                      <InputTag
                        LName="Extension Work Order No."
                        placeholder="Enter Extension Work Order No."
                        {...register("ex_work_order_no", {
                          required:  " Extension Work Order No is required",
                        })}
                        errorMsg={errors.ex_work_order_no?.message}
                        disabled={isDisabled}
                      />
                      <InputTag
                        LName= " Extension Work Order Date"
                        type="date"
                        {...register("ex_work_order_date", {
                          required:  " Extension Work Order Date is required",
                        })}
                        errorMsg={errors.ex_work_order_date?.message}
                        disabled={isDisabled}
                      />
                      <InputTag
                        LName= "Extension Work Order Letter"
                        type="file"
                        {...register("ex_work_order_docs", {
                          required:  " Extension Work Order Letter is required",
                        })}
                        errorMsg={errors.ex_work_order_docs?.message}
                        disabled={isDisabled}
                      />
                      </>
                    )}
                    {required.includes('is_me_meter_required') && (<>
                      <InputTag
                        LName="ME Meter Work Order No."
                        placeholder="Enter ME Meter Work Order No."
                        {...register("me_meter_work_order_no", {
                          required: "ME Meter Work Order No is required",
                        })}
                        errorMsg={errors.me_meter_work_order_no?.message}
                        disabled={isDisabled}
                      />
                      <InputTag
                        LName="ME Meter Work Order Date"
                        type="date"
                        {...register("me_meter_work_order_date", {
                          required: "ME Meter Work Order Date is required",
                        })}
                        errorMsg={errors.me_meter_work_order_date?.message}
                        disabled={isDisabled}
                      />
                      <InputTag
                        LName="ME Meter Work Order Letter"
                        type="file"
                        {...register("me_meter_work_order_docs", {
                          required: "ME Meter Work Order Letter is required",
                        })}
                        errorMsg={errors.me_meter_work_order_docs?.message}
                        disabled={isDisabled}
                      />
                      </>
                    )}
                      
                      {(items?.load_sanction?.is_required === "is_agreement_required" || items?.survey?.is_required==="is_agreement_required") && items?.type_of_change === "Load_Enhancement" && (
                        <InputTag
                        LName="Upload Commissioning Permission letter"
                       type="file"
                        {...register("commissioning_permission_docs", {
                          required: "Commissioning Permission letter is required",
                        })}
                        errorMsg={errors.commissioning_permission_docs?.message}
                        disabled={isDisabled}
                      />
                      )}
                      
                    </>
                  )}

                  {/* Reverted Case */}
                  {agreement_response === "Reverted" && (
                    <>
                      <SelectTag
                        LName="Revert Reason"
                        options={revertOption}
                        {...register("revert_reason", {
                          required: "Revert Reason is required",
                        })}
                        errorMsg={errors.revert_reason?.message}
                        labelKey="label"
                        valueKey="value"
                        disabled={isDisabled}
                      />
                      <InputTag
                        LName="Revert Reason Remark"
                        placeholder="Enter Remark"
                        {...register("revert_reason_remark", {
                          required: "Remark is required",
                        })}
                        errorMsg={errors.revert_reason_remark?.message}
                        disabled={isDisabled}
                      />
                      <InputTag
                        LName="Upload Revert Docs"
                        type="file"
                        {...register("upload_revert_docs", {
                          required: "Revert Docs are required",
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
                      {!showOtpBtn ? (
                        <>
                          <button type="reset" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                            Reset
                          </button>
                          <button
                            type="submit" // ✅ Yeh important hai, warna handleSendOtp call nahi hota
                            className={`px-4 py-2 rounded text-white ${
                              isDisabled
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-500 hover:bg-purple-800"
                            }`}
                            disabled={isDisabled}
                          >
                           {
                            agreement_response === "Reverted"
                              ? "Revert For Survey"
                              : agreement_response === "Accepted" &&
                                required?.includes("is_me_meter_required")
                              ? "Send for Meter Issue"
                              : agreement_response === "Accepted" &&
                                (items?.load_sanction?.is_required === "is_agreement_required" ||
                                  items?.survey?.is_required === "is_agreement_required") &&
                                items?.type_of_change === "Load_Enhancement"
                              ? "Send for BiCall"
                              : "Send for Completion Certifying"
                          }
                          </button>
                        </>
                      ) : (
                        <>
                          <InputTag
                            LName=""
                            placeholder="Enter OTP"
                            {...register("otp", { required: "Otp is required" })}
                            errorMsg={errors.otp?.message}
                          />
                          <button
                            type="button"
                            onClick={handleVerifyOtp}
                            className={`px-4 py-2 rounded text-white ${
                              isBtnDisabled
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-600 hover:bg-purple-800"
                            }`}
                            disabled={isBtnDisabled}
                          >
                            {isBtnDisabled ? "Please wait..." : "Verify OTP"}
                          </button>
                          <button
                            type="button"
                            onClick={handleReSendOtp}
                            className="px-4 py-2 bg-emerald-600 text-white rounded"
                          >
                            Resend OTP
                          </button>
                        </>
                      )}

                      
                      </div>
                      {/* Error & Success messages */}
                      {errors?.otpSuccess && (
                        <p className="text-green-500 text-sm">{errors.otpSuccess.message}</p>
                      )}
                      {errors?.otpStatus && (
                        <p className="text-red-500 text-sm">{errors.otpStatus.message}</p>
                      )}
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

export default LoadAgreement;
