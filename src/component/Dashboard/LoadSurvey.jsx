import React, { useState } from 'react'
import Input from '../Input'
import SelectBox from '../SelectBox'
import RadioButton from '../RadioButton'
import{useParams} from "react-router-dom"
import * as yup from 'yup';
import{submitFormData} from "../../utils/handlePostApi.js"
import { useSelector } from 'react-redux';

const LoadSurvey = () => {
  const officerData = useSelector(state => state.user.officerData);
  const [isDisabled, setIsDisabled] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const {id} = useParams();
  const [error, setError] = useState({});
  const newErrors = {};

  const loadSanctionOption = [
    { label: "Accepted", value: "Accepted" },
    { label: "Reverted", value: "Reverted" }

  ]
  const [formValues, setFormValues] = useState({
    sanction_letter_no: "",
    sanction_letter_date: "",
    sanction_load_pdf: null, // file input
    load_sanction_response: "",
    accept_remark: "",
    revert_reason: "",
    revert_reason_remark: "",
    upload_revert_docs: "",
    is_required: "",
  });
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]:
        type === "checkbox" ? checked :
          type === "file" ? files[0] :
            type === "radio" ? value : // radio ke liye bhi value hi use hoti hai
              value,
    }));
  };
  const schema = yup.object().shape({
      sanction_letter_no: yup.string().required('Sanction Letter No is Required '),
      sanction_letter_date: yup.string().required('Sanction Letter Date is Required'),
      accept_remark: yup.string().required('Accept Remark is Required'),
      load_sanction_response: yup.string().required('Places Select Option'),
      revert_reason: yup.string().when('load_sanction_response', {
      is: 'Reverted',
      then: (schema) => schema.required('Revert Reason is Required'),
      otherwise: (schema) => schema.notRequired()
    }),

        revert_reason_remark: yup.string().when('load_sanction_response', {
            is: 'Reverted',
            then: (schema) => schema.required('Revert Reason Remark is Required'),
            otherwise: (schema) => schema.notRequired()
        }),
        sanction_load_pdf: yup
          .mixed()
          .required('File is required')
          .test(
            'fileSize',
            'File size is too large (max 2MB)',
            value => value && value.size <= 2 * 1024 * 1024
          )
          .test(
            'fileType',
            'Unsupported File Format. Only PDF is allowed.',
            value => value && value.type === 'application/pdf'
          ),
      // upload_revert_docs: yup.mixed().required('File is required').test(
      //       'fileSize',
      //       'File size is too large',
      //       value => value && value.size <= 2 * 1024 * 1024 // 2MB
      //     )
      //     .test(
      //       'fileType',
      //       'Unsupported File Format',
      //       value => value && ['.pdf'].includes(value.type)
      //     )
    });
  const onSubmithandler = async e => {
    e.preventDefault();
    const formData = new FormData(e.target)
    console.log(formData,"formData")
    const plainData = Object.fromEntries(formData.entries());
    console.log(plainData,"plainData")
    
     try {
            await schema.validate(plainData, { abortEarly: false });
            setError({});
            setIsDisabled(true);
            const response = await submitFormData(formData,`/ht_load_change/api/load-sanctions/create/`);
            console.log(response, "dhsjhfdgfhgdh")
            const result = await response.json();
            console.log('result', result);
            // navigate(`/ht-load-change/Details`);
          } catch (err) {
            handleFormErrors(err);
          }


  }
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
  return (
    <>
    <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
              HT Load Change Survey
    </h2>
    <div className="mt-6 overflow-x-auto">
      <form onSubmit={onSubmithandler}>
        <div className="body p-4">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <input type='hidden' name='application_id' value={id}></input>
              <input type='hidden' name='employee_id' value={officerData.employee_detail.employee_login_id}></input>
              <SelectBox
                LName="Region Name"
                Iname="region_name"
                optionVal={regionNameOption}
                value={formValues.region_name}
                onChange={handleChange}
                errorMsg={error.region_name}
                disabled={isDisabled}
              />
              <SelectBox
                LName="Circle Name"
                Iname="circle_name"
                optionVal={circleNameOption}
                value={formValues.circle_name}
                onChange={handleChange}
                errorMsg={error.circle_name}
                disabled={isDisabled}
              />
              <SelectBox
                LName="Division Name"
                Iname="division_name"
                optionVal={divisionNameOption}
                value={formValues.division_name}
                onChange={handleChange}
                errorMsg={error.division_name}
                disabled={isDisabled}
              />
              <SelectBox
                LName="EHV SubStation Name 220/132 KV"
                Iname="ehv_substation_name"
                optionVal={ehvSubstationOption}
                value={formValues.ehv_substation}
                onChange={handleChange}
                errorMsg={error.ehv_substation}
                disabled={isDisabled}
              />
              <SelectBox
                LName="EHV Feeder Name 33 KV"
                Iname="ehv_feeder_name"
                optionVal={ehvFeederOption}
                value={formValues.ehv_feeder}
                onChange={handleChange}
                errorMsg={error.ehv_feeder}
                disabled={isDisabled}
              />
              <SelectBox
                LName="SubStation Name 33/11 KV"
                Iname="substation_name"
                optionVal={substationOption}
                value={formValues.substation}
                onChange={handleChange}
                errorMsg={error.substation}
                disabled={isDisabled}
              />
              <SelectBox
                LName="FEEDER NAME 11 KV"
                Iname="feeder_name"
                optionVal={FeederNameOption}
                value={formValues.feeder_name}
                onChange={handleChange}
                errorMsg={error.feeder_name}
                disabled={isDisabled}
              />





              {/* {formValues.load_sanction_response === "Accepted" && (
                <>
                  <Input
                    LName="Sanction Letter No"
                    Iname="sanction_letter_no"
                    value={formValues.sanction_letter_no}
                    onChange={handleChange}
                    placeholder="please Enter Sanction Letter No"
                    errorMsg={error.sanction_letter_no}
                    disabled={isDisabled}
                  />
                  <Input
                    LName="Sanction Letter Date"
                    Iname="sanction_letter_date"
                    type="date"
                    value={formValues.sanction_letter_date}
                    onChange={handleChange}
                    placeholder="please Enter Sanction Letter No"
                    errorMsg={error.sanction_letter_date}
                    disabled={isDisabled}
                  />
                  <Input
                    LName="Upload Sanction Letter "
                    Iname="sanction_load_pdf"
                    type="file"
                    onChange={handleChange}
                    placeholder="please Enter Sanction Letter No"
                    errorMsg={error.sanction_load_pdf}
                    disabled={isDisabled}
                  />
                  <Input
                    LName="Accept Remark"
                    Iname="accept_remark"
                    type="text"
                    value={formValues.accept_remark}
                    onChange={handleChange}
                    placeholder="please Enter Accept Remark"
                    errorMsg={error.accept_remark}
                    disabled={isDisabled}
                  />
                  <RadioButton
                    LName="Survey is Required"
                    Iname="is_required"
                    value="is_survey_required"
                    onChange={handleChange}
                    errorMsg={error.is_required}
                    disabled={isDisabled} />
                  <RadioButton
                    LName="Agreement is Required"
                    Iname="is_required"
                    value='is_agreement_required'
                    onChange={handleChange}
                    errorMsg={error.is_required}
                    disabled={isDisabled} />
                  {formValues.is_required === "is_agreement_required" && (
                    <Input
                      LName="Upload Agreement Letter "
                      Iname="agreement_letter"
                      type="file"
                      value={formValues.agreement_letter}
                      onChange={handleChange}
                      placeholder="please Enter Upload Agreement Letter"
                      errorMsg={error.agreement_letter}
                      disabled={isDisabled}
                    />

                  )}

                </>

              )} */}

              {/* {formValues.load_sanction_response === "Reverted" && (
                <>
                  <Input
                    LName="Revert Reason"
                    Iname="revert_reason"
                    type="text"
                    value={formValues.revert_reason}
                    onChange={handleChange}
                    placeholder="please Enter Revert Reason"
                    errorMsg={error.revert_reason}
                    disabled={isDisabled}
                  />
                  <Input
                    LName="Revert Reason Remark"
                    Iname="revert_reason_remark"
                    type="text"
                    value={formValues.rejection_revert_remark}
                    onChange={handleChange}
                    placeholder="please Enter Revert Reason Remark"
                    errorMsg={error.rejection_revert_remark}
                    disabled={isDisabled}
                  />
                  <Input
                    LName="upload_revert_docs"
                    Iname="upload_revert_docs"
                    type="file"
                    onChange={handleChange}
                    placeholder="please Enter Revert Reason Remark"
                    errorMsg={error.rejection_revert_remark}
                    disabled={isDisabled}
                  />
                </>

              )} */}
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12 ">
            <div className="mt-10 flex flex-col justify-center items-center">
              <div className="flex space-x-2 space-y-2 flex-wrap justify-center items-baseline">
                <button class="rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-red-600 duration-300">
                  Reset
                </button>
                {formValues.load_sanction_response === "Reverted" ? (
                  <button
                    type="submit"
                    className="rounded-lg px-4 py-2 bg-red-700 text-green-100 hover:bg-green-800 duration-300"
                  >
                    Revert
                  </button>
                ) : formValues.is_required === "is_agreement_required" ? (
                  <button type="submit" className="bg-orange-500  text-white px-4 py-2 mt-4 rounded">
                    Send for Agreement
                  </button>
                ) : (
                  <button type="submit" className="bg-emerald-600 text-white px-4 py-2 mt-4 rounded">
                    Send for Survey
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
      </div>
    </>
  )
}
export default LoadSurvey
