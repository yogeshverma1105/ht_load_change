import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {HT_LOAD_CHANGE_BASE,DSP_PRO_BASE} from '../../api/api.js'

// import { In, FileUpload, SelectTag } from '../InputTag.jsx'
import {
  InputTag,
  SelectTag,
  RadioTag,
  fetchCtPtData,
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
  getEstimateOptions,
} from '../newComponents/commonOption.js';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { submitFormData } from '../../utils/handlePostApi.js';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { getFinalUsingData } from '../../utils/handlePostApi.js';
import AlertModalBox from '../alertModelBox.jsx';
import Cookies from 'js-cookie';

const LoadSurvey = () => {
  const officerData = useSelector(state => state.user.officerData);
  const [mobileNo, setMobileNo] = useState(officerData?.employee_detail.cug_mobile);
  const [showOtpBtn, setShowOtpBtn] = useState(false);
  const [fromDataValue, setFromDataValue] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isBtnDisabled, setBtnIsDisabled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  
  const { items } = location.state || {};
  console.log(items,"items ")
  let supply_voltage = items.new_supply_voltage.replace(/kv/i, '').trim();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: items || {},
  });
  const token = Cookies.get('accessToken');
  const [circle, setCircle] = useState([]);
  const [division, setDivision] = useState([]);
  const [ehvSubStation, setEHVSubStation] = useState([]);
  const [thirtyThreeFeeder, setThirtyThreeFeeder] = useState([]);
  const [thirtyThreeSubstation, setThirtyThreeSubstation] = useState([]);
  const [elevenFeeder, setElevenFeeder] = useState([]);
  const [taskDescription, setTaskDescription] = useState([]);
  const [ctRatio, setCtRatio] = useState([]);
  const [ctSelectRatio, setSelectCtRatio] = useState('');
  const [ptRatio, setPtRatio] = useState([]);
  const [meExtimateblock, setMeExtimateblock] = useState(false);
  const [exExtimateblock, setExExtimateblock] = useState(false);

  const RegionId = watch('region');
  const CircleId = watch('circle');
  const DivisionId = watch('division');
  const EHVSubStationId = watch('ehvSubStation');
  const ThirtyThreeFeederId = watch('thirtyThreeFeeder');
  const ThirtyThreeSubstation = watch('thirtyThreeSubstation');
  const is_required = watch('is_required');
  const is_estimate_required = watch('is_estimate_required') || [];

  const survey_response = watch('survey_response');


  useEffect(() => {
    const fetchData = async () => {
      const ratioData = await fetchCtPtData(items);
      setCtRatio(ratioData.ct_result.data);
      setPtRatio(ratioData.pt_result.data);
      setSelectCtRatio(ratioData.matched);
      // setValue("new_ct_ratio", items.)
      // setValue('new_ct_ratio', items?.load_sanction?.new_ct_ratio);
      // setValue('new_pt_ratio', items?.load_sanction?.new_pt_ratio);
      setValue('new_ct_ratio', items?.load_sanction?.new_ct_ratio);
      setValue('new_pt_ratio', items?.load_sanction?.new_pt_ratio);
    };
    if (items?.new_supply_voltage) {
      fetchData(items);
    }
  }, [items?.new_supply_voltage]);

  useEffect(() => {
    const getFatchData = async () => {
      let response = await getFinalUsingData(`${HT_NSC_BASE}tasks/filter/${supply_voltage}`);
      let result = await response.json();
      setTaskDescription(result.results);
    };
    getFatchData();
  }, []);
  useEffect(() => {
    const getFatchData = async () => {
      let response = await getFinalUsingData(`${HT_NSC_BASE}get_circle?region=${RegionId}`);
      let result = await response.json();
      setCircle(result.Name);
    };
    if (RegionId) {
      getFatchData();
    }
  }, [RegionId]);
  useEffect(() => {
    const getFatchData = async () => {
      let response = await getFinalUsingData(`${HT_NSC_BASE}get_division?circle=${CircleId}`);
      let result = await response.json();
      setDivision(result.Name);
    };
    if (CircleId) {
      getFatchData();
    }
  }, [CircleId]);
  useEffect(() => {
    const getFatchData = async () => {
      let response = await getFinalUsingData(`${HT_NSC_BASE}get_ehv_by_division?division=${DivisionId}`);
      let result = await response.json();
      setEHVSubStation(result.Name);
    };
    if (DivisionId) {
      getFatchData();
    }
  }, [DivisionId]);
  useEffect(() => {
    const getFatchData = async () => {
      let response = await getFinalUsingData(`${HT_NSC_BASE}get_feeder33_by_ehv?ehv=${EHVSubStationId}`);
      let result = await response.json();
      setThirtyThreeFeeder(result.Name);
    };
    if (EHVSubStationId) {
      getFatchData();
    }
  }, [EHVSubStationId]);
  useEffect(() => {
    const getFatchData = async () => {
      let response = await getFinalUsingData(
        `${HT_NSC_BASE}get_substation_by_feeder33?feeder33=${ThirtyThreeFeederId}`
      );
      let result = await response.json();
      setThirtyThreeSubstation(result.Name);
    };
    if (ThirtyThreeFeederId) {
      getFatchData();
    }
  }, [ThirtyThreeFeederId]);
  useEffect(() => {
    const getFatchData = async () => {
      let response = await getFinalUsingData(`${HT_NSC_BASE}get_feeder11_by_ss?ss=${ThirtyThreeSubstation}`);
      let result = await response.json();
      setElevenFeeder(result.Name);
    };
    if (ThirtyThreeSubstation) {
      getFatchData();
    }
  }, [ThirtyThreeSubstation]);

  
 
 // 🔹 Common reusable function
const fetchEstimateDetails = async (erpField, type) => {
  try {
    let erp_no = getValues(erpField);
    if (!erp_no) {
      setError(erpField, { type: "manual", message: "ERP Number is required" });
      return;
    }

    setIsDisabled(true);

    const response = await axios.get(`${DSP_PRO_BASE}/XXPA_PROJECTS_HT_V/${erp_no}`);
    const projectData = response?.data?.data?.[0];

    if (!projectData) {
      setError(erpField, { message: "No data found for this ERP No" });
      return;
    }

    // clear error if data found
    setError(erpField, { message: "" });

    // destructure response
    const {
      STATUS,
      SUPER_TAX,
      ESTIMATE_DATE,
      ESTIMATED_TAX,
      SUPERVISION_COST,
      ESTIMATED_COST,
      PROJECT_TYPE,
      SCHEMECODE,
      APPROVED_BY_NAME,
      SANCT_COST,ORG1,ORG,LONG_NAME
      
    } = projectData;

    if (STATUS === "Approved") {
      const date = new Date(ESTIMATE_DATE).toISOString().split("T")[0];

      if (type === "ME") {
        setMeExtimateblock(true);
        setValue("ndf_approved_by_name",APPROVED_BY_NAME);
        setValue("ndf_estimate_date", date);
        setValue("ndf_sanction_amt", SANCT_COST);
        // setValue("ndf_sanction_date", SANCTION_DATE);
        setValue("ndf_long_name", LONG_NAME);
        setValue("ndf_status", STATUS);
        setValue("ndf_scheme_name", SCHEMECODE);
        setValue("ndf_circle_name", ORG1);
        setValue("ndf_division_name", ORG);
        setValue("ndf_total_amt", SANCT_COST);
        
      } else if (type === "EXT") {
       
        let super_tax = SUPER_TAX / 2;

        setExExtimateblock(true);
        setValue("status", STATUS);
        setValue("scheme_name", PROJECT_TYPE);
        setValue("supervision_cgst", super_tax.toFixed(2));
        setValue("supervision_sgst", super_tax.toFixed(2));
        setValue("supervision_amt", Math.ceil(SUPERVISION_COST));

        if (SCHEMECODE === "SCCW") {
          setValue(
            "total_estimated_amt",
            Math.ceil(Number(SUPER_TAX) + Number(SUPERVISION_COST))
          );
        } else {
          setValue("total_estimated_amt", Math.ceil(ESTIMATED_COST));
        }
        setValue("estimate_date", date);
      }
    }
  } catch (error) {
    console.error("API Error:", error);
    setError(erpField, { message: "Erp Number Does Not exist" });
  } finally {
    setIsDisabled(false);
  }
};

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
      const { data } = await axios.post(`${HT_LOAD_CHANGE_BASE}/surveys/`, formData, {
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
        HT Load Change Survey
      </h2>
      <div className="mt-6 overflow-x-auto">
        <form onSubmit={handleSubmit(handleSendOtp)}>
          <div className="body p-4">
            {officerData?.employee_detail.role}
            <ApplicantBasicDetails htConsumers={items} register={register} errors={errors} />
            {/* <ApplicantFillDetails htConsumers={items} /> */}
            {officerData?.employee_detail.role == 2 && (
              <>
                {items.new_supply_voltage === items.existing_supply_voltage ? (
                  <>
                    <input type="hidden" value={items.id} {...register('application')}></input>
                    <div className="border-b border-gray-900/10 pb-12">
                      <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
                        Latitude and Longitude of Location where ME is to be installed
                      </h2>
                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <InputTag
                          LName="Maximum load on Feeder(in Amp)"
                          placeholder="Please Enter Maximum load on Feeder(in Amp)"
                          {...register('lr_values', {
                            required: ' Maximum load on Feeder(in Amp) is required',
                          })}
                          errorMsg={errors.lr_values?.message}
                        />
                        <InputTag
                          LName="Percentage Voltage Regulation(VR Value)"
                          placeholder="Please Enter Percentage Voltage Regulation(VR Value)"
                          {...register('vr_values', {
                            required: 'Percentage Voltage Regulation(VR Value) is required',
                          })}
                          errorMsg={errors.vr_values?.message}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="border-b border-gray-900/10 pb-12">
                      <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
                        Latitude and Longitude of Location where ME is to be installed
                      </h2>
                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <SelectTag
                          options={region}
                          LName="Region"
                          {...register('region', { required: 'Region is required' })}
                          errorMsg={errors.region?.message}
                          labelKey="label"
                          valueKey="value"
                        />
                        <SelectTag
                          options={circle}
                          LName="Circle"
                          {...register('circle', { required: 'Circle is required' })}
                          errorMsg={errors.circle?.message}
                          labelKey="circle_code"
                          valueKey="circle_name"
                        />
                        <SelectTag
                          options={division}
                          LName="Division"
                          {...register('division', { required: 'division is required' })}
                          errorMsg={errors.division?.message}
                          labelKey="circle_code"
                          valueKey="circle_name"
                        />
                        <SelectTag
                          options={ehvSubStation}
                          LName="EHV SubStation Name"
                          {...register('ehvSubStation', {
                            required: 'ehv SubStation is required',
                          })}
                          errorMsg={errors.ehvSubStation?.message}
                          labelKey="circle_code"
                          valueKey="circle_name"
                        />
                        <SelectTag
                          options={thirtyThreeFeeder}
                          LName="33 Feeder Name"
                          {...register('thirtyThreeFeeder', {
                            required: 'thirty Three Feeder is required',
                          })}
                          errorMsg={errors.thirtyThreeFeeder?.message}
                          labelKey="circle_code"
                          valueKey="circle_name"
                        />
                        <SelectTag
                          options={thirtyThreeSubstation}
                          LName="33 SubStation Name"
                          {...register('thirtyThreeSubstation', {
                            required: 'Thirty Three Feeder is required',
                          })}
                          errorMsg={errors.thirtyThreeSubstation?.message}
                          labelKey="circle_code"
                          valueKey="circle_name"
                        />
                        <SelectTag
                          options={elevenFeeder}
                          LName="11 Feeder Name"
                          {...register('elevenFeeder', {
                            required: '11 Feeder Name is required',
                          })}
                          errorMsg={errors.elevenFeeder?.message}
                          labelKey="circle_code"
                          valueKey="circle_name"
                        />
                      </div>
                    </div>
                    <div className="border-b border-gray-900/10 pb-12">
                      <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
                        Latitude and Longitude of Location where ME is to be installed
                      </h2>
                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        {/* <input type='hidden' name='application_id' value={id}></input>
              <input type='hidden' name='employee_id' value={officerData.employee_detail.employee_login_id}></input> */}
                        <InputTag
                          LName="Maximum load on Feeder(in Amp)"
                          placeholder="Please Enter Maximum load on Feeder(in Amp)"
                          {...register('lr_value', {
                            required: ' Maximum load on Feeder(in Amp) is required',
                          })}
                          errorMsg={errors.lr_value?.message}
                        />
                        <InputTag
                          LName="Percentage Voltage Regulation(VR Value)"
                          placeholder="Please Enter Percentage Voltage Regulation(VR Value)"
                          {...register('vr_value', {
                            required: 'Percentage Voltage Regulation(VR Value) is required',
                          })}
                          errorMsg={errors.vr_value?.message}
                        />
                      </div>
                    </div>
                    <div className="border-b border-gray-900/10 pb-12">
                      <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
                        Latitude and Longitude of Location where ME is to be installed
                      </h2>
                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <InputTag
                          LName="Latitude of ME Installation Location"
                          placeholder="Please Enter Latitude of ME Installation Location"
                          {...register('latitude_of_me', {
                            required: 'Latitude of ME Installation Location is required',
                          })}
                          errorMsg={errors.vr_value?.message}
                        />
                        <InputTag
                          LName="Longitude of ME Installation Location"
                          placeholder="Please Enter Longitude of ME Installation Location"
                          {...register('longitude_of_me', {
                            required: 'Longitude of ME Installation Location is required',
                          })}
                          errorMsg={errors.vr_value?.message}
                        />
                        {/* <InputTag

                          LName="Upload Longitude of ME Installation Location"
                          placeholder="Please Enter Longitude of ME Installation Location"
                         {...register('longitude_of_me', {
                            required: 'Longitude of ME Installation Location is required',
                          })}
                          errorMsg={errors.vr_value?.message}
                        /> */}
                      </div>
                    </div>
                    <div className="border-b border-gray-900/10 pb-12">
                      <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
                        Installed ME CT And PT Ratio
                      </h2>
                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <InputTag
                          LName="Installed ME CT Ratio"
                          Iname="me_ct_ratio"
                          {...register('me_ct_ratio')}
                          errorMsg={errors.me_ct_ratio?.message}
                        />
                        <InputTag
                          LName="Installed ME PT Ratio"
                          Iname="me_pt_ratio"
                          {...register('me_pt_ratio')}
                          errorMsg={errors.me_pt_ratio?.message}
                        />
                      </div>
                    </div>
                    <div className="border-b border-gray-900/10 pb-12">
                      <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
                        Summary of Infrastructure
                      </h2>
                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">
                        <SelectTag
                          options={lineType}
                          LName="Line Type"
                          {...register('region_name', { required: 'Region is required' })}
                          errorMsg={errors.me_pt_ratio?.message}
                          labelKey="label"
                          valueKey="value"
                        />
                        <InputTag
                          LName="Distance From Existing Substation to Connection Premise(in KM)"
                          placeholder=""
                          {...register('distance')}
                          errorMsg={errors.distance?.message}
                        />
                        <SelectTag
                          options={conductorType}
                          LName="Conductor Type"
                          {...register('conductor_type', {
                            required: 'conductor type is required',
                          })}
                          errorMsg={errors.conductor_type?.message}
                          labelKey="label"
                          valueKey="value"
                        />
                        <SelectTag
                          options={poleType}
                          LName="Pole Type"
                          {...register('pole_type', { required: 'Pole Type is required' })}
                          errorMsg={errors.pole_type?.message}
                          labelKey="label"
                          valueKey="value"
                        />
                        <SelectTag
                          options={taskDescription}
                          LName="Task Description"
                          {...register('task_description', {
                            required: 'Task Description is required',
                          })}
                          errorMsg={errors.task_description?.message}
                          labelKey="sor_description"
                          valueKey="scheme_name"
                        />
                      </div>
                    </div>
                  </>
                )}
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
                    Acceptance
                  </h2>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <SelectTag
                      LName="Acceptance"
                      options={responseOption}
                      {...register('survey_response', {
                        required: 'Please Select  Acceptance is required',
                      })}
                      errorMsg={errors.survey_response?.message}
                      labelKey="label"
                      valueKey="value"
                    />
                    {survey_response === 'Accepted' && (
                      <>
                        <InputTag
                          LName="Check List Letter"
                          type="file"
                          {...register('survey_checklist_docs', {
                            required: 'Check List Letter is required',
                          })}
                          errorMsg={errors.survey_checklist_docs?.message}
                        />
                        <RadioTag
                          options={setSurveyOptions}
                          {...register('is_required', { required: 'Option is required' })}
                          errorMsg={errors.is_required?.message}
                        />
                        <SelectTag
                          LName="Required ME CT Ratio"
                          options={ctRatio}
                          {...register('new_ct_ratio', {
                            required: 'Please  select Ct Ratio is required',
                          })}
                          errorMsg={errors.new_ct_ratio?.message}
                          labelKey="ct_ratio_me"
                          valueKey="ct_ratio_me"
                        />
                        <SelectTag
                          LName="Required ME PT Ratio"
                          options={ptRatio}
                          {...register('new_pt_ratio', {
                            required: 'Please  select Pt Ratio is required',
                          })}
                          errorMsg={errors.new_pt_ratio?.message}
                          labelKey="pt_ratio"
                          valueKey="pt_ratio"
                        />
                        {is_required === 'is_estimate_required' && (
                          <RadioTag
                            options={getEstimateOptions(
                              items.new_supply_voltage,
                              items.existing_supply_voltage
                            )}
                            {...register('is_estimate_required', {
                              required: 'Option is required',
                            })}
                            errorMsg={errors.is_estimate_required?.message}
                            type="checkbox"
                          />
                        )}
                      </>
                    )}
                    {survey_response === 'Reverted' && (
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
                        />
                        <InputTag
                          LName="Revert Reason Remark"
                          placeholder="Please Enter Revert Reason Remark"
                          {...register('revert_reason_remark', {
                            required: 'Revert Reason Remark is required',
                          })}
                          errorMsg={errors.revert_reason_remark?.message}
                        />
                        <InputTag
                          LName="Upload Revert Docs"
                          type="file"
                          {...register('revert_reson_docs', {
                            required: 'Upload Upload Revert Docs is required',
                          })}
                          errorMsg={errors.revert_reson_docs?.message}
                        />
                      </>
                    )}
                  </div>
                </div>
                {survey_response === 'Accepted' && (
                  <>
                    {is_required === 'is_estimate_required' && (
                      <>
                        {is_estimate_required.includes('is_me_meter_required') && (
                          <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
                              ERP Details Of NDF(Me Meter Estimate)Estimate
                            </h2>
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">
                              <InputTag
                                LName="ERP No of Me Estimate"
                                placeholder="ME Estimate No."
                                {...register('ndf_erp_no', {
                                  required: 'Me Estimate is required',
                                })}
                                errorMsg={errors.ndf_erp_no?.message}
                              />

                              <button
                                onClick={() => fetchEstimateDetails("ndf_erp_no", "ME")}
                                disabled={isDisabled}
                                type="button"
                                className={`py-0 px-0 mt-6 rounded text-white ${
                                  isDisabled
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-800'
                                }`}
                              >
                                {isDisabled ? 'Get ERP Details...' : 'Get ERP Details'}
                              </button>
                              {meExtimateblock && (
                                <>


                                  <InputTag
                                    LName="Circle Name"
                                    type="text"
                                    {...register('ndf_circle_name', {
                                      required: 'Circle Name is required',
                                    })}
                                    errorMsg={errors.ndf_circle_name?.message}
                                    readOnly
                                  />

                                  <InputTag
                                    LName="Division Name"
                                   
                                    {...register('ndf_division_name', {
                                      required: 'Division Name is required',
                                    })}
                                    errorMsg={errors.ndf_division_name?.message}
                                    readOnly
                                  />
                                  <InputTag
                                    LName="Estimate Date"
                                    placeholder="Estimate Date."
                                    {...register('ndf_estimate_date', {
                                      required: 'Estimate Date is required',
                                    })}
                                    errorMsg={errors.ndf_estimate_date?.message}
                                    readOnly
                                  />
                                  <InputTag
                                    LName="Long Name"
                                    type="textarea"
                                    {...register('ndf_long_name', {
                                      required: 'lond Name is required',
                                    })}
                                    errorMsg={errors.ndf_long_name?.message}
                                    readOnly
                                  />
                                  {/* <InputTag
                                    LName="Sanction Date"
                                    placeholder="Sanction Date."
                                    type="date"
                                    {...register('ndf_sanction_date', {
                                      required: 'Sanction Date is required',
                                    })}
                                    errorMsg={errors.ndf_sanction_date?.message}
                                    readOnly
                                  /> */}
                                  <InputTag
                                    LName="Sanction Cost"
                                  
                                    {...register('ndf_sanction_amt', {
                                      required: 'Sanction Cost is required',
                                    })}
                                    errorMsg={errors.ndf_sanction_amt?.message}
                                    readOnly
                                  />
                                  <InputTag
                                    LName="Status"
                                   
                                    {...register('ndf_status', {
                                      required: 'Status is required',
                                    })}
                                    errorMsg={errors.ndf_status?.message}
                                    readOnly
                                  />
                                  
                                  <InputTag
                                    LName="Approved By Name"
                                   
                                    {...register('ndf_approved_by_name', {
                                      required: 'Approved By Name is required',
                                    })}
                                    errorMsg={errors.ndf_approved_by_name?.message}
                                    readOnly
                                  />
                                  <InputTag
                                    LName="Scheme Name"
                                    {...register('ndf_scheme_name', {
                                      required: 'Scheme Name is required',
                                    })}
                                    errorMsg={errors.ndf_scheme_name?.message}
                                    readOnly
                                  />
                                
                                  <InputTag
                                    LName="Total Amount"
                                    placeholder="Total Amount."
                                    {...register('ndf_total_amt', {
                                      required: 'Total  Amount is required',
                                    })}
                                    errorMsg={errors.ndf_total_amt?.message}
                                    readOnly
                                  />
                                  <InputTag
                                    LName="Me Estimate Letter"
                                    type="file"
                                    {...register('ndf_upload_estimate_docs', {
                                      required: 'Me Estimate Letter is required',
                                    })}
                                    errorMsg={errors.ndf_upload_estimate_docs?.message}
                                  />
                                </>
                              )}

                              {/* <InputTag LName="Percentage Voltage Regulation(VR Value)"  placeholder="Percentage Voltage Regulation(VR Value)"{...register("vr_value", { required: "Percentage Voltage Regulation(VR Value) is required" })} errorMsg={errors.vr_value?.message} />
                    <SelectTag options={region} LName="Fetch ERP " {...register("region", { required: "Region is required" })} errorMsg={errors.region?.message} labelKey="label" valueKey="value" /> */}
                            </div>
                          </div>
                        )}
                        {is_estimate_required.includes('is_extension_work_required') && (
                          <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
                              ERP Details Of Extension Work
                            </h2>
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">
                              <InputTag
                                LName="ERP No of Extension Estimate"
                                placeholder="Extension Estimate No."
                                {...register('erp_no', {
                                  required: 'Extension Estimate is required',
                                })}
                                errorMsg={errors.erp_no?.message}
                              />
                              <button
                                onClick={() => fetchEstimateDetails("erp_no", "EXT")}
                                disabled={isDisabled}
                                type="button"
                                className={`py-0 px-0 mt-6 rounded text-white ${
                                  isDisabled
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-800'
                                }`}
                              >
                                {isDisabled ? 'Get ERP Details...' : 'Get ERP Details'}
                              </button>
                              {exExtimateblock && (
                                <>
                                  <InputTag
                                    LName="Estimate Date"
                                    placeholder="Estimate Date."
                                    {...register('estimate_date', {
                                      required: 'Estimate Date is required',
                                    })}
                                    errorMsg={errors.estimate_date?.message}
                                  />
                                  <InputTag
                                    LName="Status"
                                    placeholder="Status."
                                    {...register('status', {
                                      required: 'Estimate Status is required',
                                    })}
                                    errorMsg={errors.ndf_status?.message}
                                  />
                                  <InputTag
                                    LName="Scheme Name"
                                    placeholder="Scheme Name."
                                    {...register('scheme_name', {
                                      required: 'Estimate Scheme Name is required',
                                    })}
                                    errorMsg={errors.scheme_name?.message}
                                  />
                                  <InputTag
                                    LName="Supervision Amount"
                                    placeholder="Estimate Cost Excluding GST."
                                    {...register('supervision_amt', {
                                      required: 'Estimate Cost is required',
                                    })}
                                    errorMsg={errors.supervision_amt?.message}
                                  />
                                  <InputTag
                                    LName=" Supervision CGST Cost"
                                    placeholder=" Supervision CGST Cost."
                                    {...register('supervision_cgst', {
                                      required: ' Supervision CGST Cost is required',
                                    })}
                                    errorMsg={errors.supervision_cgst?.message}
                                  />
                                  <InputTag
                                    LName="Supervision SGST Cost"
                                    placeholder="Supervision SGST Cost."
                                    {...register('supervision_sgst', {
                                      required: 'Supervision SGST Cost is required',
                                    })}
                                    errorMsg={errors.supervision_sgst?.message}
                                  />
                                  <InputTag
                                    LName="Total Amount"
                                    placeholder="Total Amount"
                                    {...register('total_estimated_amt', {
                                      required: 'Total Amount is required',
                                    })}
                                    errorMsg={errors.total_estimated_amt?.message}
                                  />
                                  <InputTag
                                    LName="Extension Estimate Letter"
                                    type="file"
                                    {...register('extension_work_estimate_docs', {
                                      required: 'Extension Estimate Letter is required',
                                    })}
                                    errorMsg={errors.extension_work_estimate_docs?.message}
                                  />
                                </>
                              )}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}

                <div className="border-b border-gray-900/10 pb-12">
                  <div className="mt-10 flex flex-col justify-center items-center">
                    <div className="flex space-x-2 space-y-2 flex-wrap justify-center items-baseline">
                                          {!showOtpBtn && (
                                            <>
                                              <button className="rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-red-600 duration-300">
                                                Reset
                                              </button>
                                              {survey_response === 'Reverted' ? (
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
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
};
export default LoadSurvey;
