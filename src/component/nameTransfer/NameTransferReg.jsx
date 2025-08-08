import React, { useEffect, useState } from 'react';
import Input from '../../component/Input';
import Button from '../../component/Button';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import ApplicantBasicDetails from '../ApplicantBasicDetails';
import { sendOtp } from '../../utils/otpSent';
import { verifyOtp } from '../../utils/otpVerify';
import * as yup from 'yup';

function ApplicantReg() {
  const [htConsumers, setHtConsumer] = useState({});
  const [error, setError] = useState({});
  const [showButton, setShowButton] = useState(false);
  const [mobile, setMobile] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const newErrors = {};
  const schema = yup.object().shape({
    CurrentOrganizationName: yup.string().required('Current Organization Name is Required'),
    NewOrganizationName: yup.string().required('New Organization Name is Required'),
    NewPanNo: yup.string().required('New Pan No is Required'),
    MobileNo: yup
      .string()
      .required('Mobile number is required')
      .matches(/^[6-9]\d{9}$/, 'Mobile number must be 10 digits'),
    Email: yup.string().email('Invalid email').required('New Email is Required'),
    NewGSTNo: yup.string().required('New GST No Required'),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://services.mpcz.in/serviceportal/api/ht/getHtConsumersMasDataByConsumerId?consumerId=H8333333333`
        );
        const result = await response.json();
        if (result?.list?.length > 0) {
          let data = result.list[0];
          // reset(
          //   Object.fromEntries(
          //     Object.entries(data).map(([key, value]) => [key, value ?? ""])
          //   )
          // );
          setHtConsumer(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const handleOtpSend = async () => {
    const result = await sendOtp(mobile);
    if (result.success) {
      // setShowOtpModal(true);
    } else {
      console.log('OTP failed:', result.error);
    }
  };
  const handleOtpVerify = async () => {
    const result = await verifyOtp(mobile, otpValue);
    if (result.success) {
      // setShowOtpModal(true);
    } else {
      console.log('OTP failed:', result.error);
    }
  };

  // const handleChange = (e) => {
  //   const { name, value, type, files } = e.target;

  //   if (type === "file") {
  //     setFormData((prev) => ({
  //       ...prev,
  //       [name]: files[0], // only first file
  //     }));
  //   } else {
  //     setFormData((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));
  //   }
  // };
  const onSubmithandler = async e => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData.entries());
    try {
      let validForm = await schema.isValid(formObj);
      if (!validForm) {
        await schema.validate(formObj, { abortEarly: false });
      }
      setError({});
      setShowButton(true);
      console.log('Form is valid:', setMobile(formObj.MobileNo));
    } catch (err) {
      err.inner.forEach(error => {
        newErrors[error.path] = error.message;
      });
      setError(newErrors);
    }
  };
  return (
    <>
      <form onSubmit={onSubmithandler}>
        <div className="space-y-12 container mx-auto border my-5 rounded-md border-gray shadow-md">
          <div className="border-b border-gray-900/10 pb-12">
            <div class="block mb-2 border-b-2 p-2 ">
              <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
                HT NSC Name Transfer Application
              </h2>
            </div>
            <div className="body p-4">
              <ApplicantBasicDetails htConsumers={htConsumers} />
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900 bg-gray-300 p-3 rounded-md border-gray shadow-md">
                  Required Name Transfer Details
                </h2>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <Input
                    LName="Current Organization Name"
                    Iname="CurrentOrganizationName"
                    type="text"
                    placeholder="Please Enter Purpose Of Installation Details"
                    errorMsg={error.CurrentOrganizationName}
                  />
                  <Input
                    LName="New Organization Name"
                    Iname="NewOrganizationName"
                    type="text"
                    placeholder="Please Enter New Organization Name  Details"
                    errorMsg={error.NewOrganizationName}
                  />
                  <Input
                    LName="Organization/Firm Permanent Account No (PAN)"
                    Iname="NewPanNo"
                    type="text"
                    placeholder="Please Enter New Pan No."
                    errorMsg={error.NewPanNo}
                  />
                  <Input
                    LName="Mobile No."
                    Iname="MobileNo"
                    type="number"
                    placeholder="Please Enter New Mobile No."
                    errorMsg={error.MobileNo}
                  />
                  <Input
                    LName="Email."
                    Iname="Email"
                    type="email"
                    placeholder="Please Enter New Email Address"
                    errorMsg={error.Email}
                  />
                  <Input
                    LName="Organization/GST No."
                    Iname="NewGSTNo"
                    type="text"
                    placeholder="Please Enter New GST No."
                    errorMsg={error.NewGSTNo}
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="p-5 flex flex-col justify-center items-center">
            <div class="flex space-x-2 space-y-2 flex-wrap justify-center items-baseline">
              <button class="rounded-lg px-4 py-2 bg-blue-500 text-blue-100 hover:bg-blue-600 duration-300">
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
                <>
                  <button
                    type="button"
                    class="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300"
                    onClick={handleOtpSend}
                  >
                    Send OTP
                  </button>
                  <input
                    type="text"
                    name="opt"
                    className="block text-sm/6 font-medium text-gray-900"
                    onChange={e => setOtpValue(e.target.value)}
                    value={otpValue}
                  ></input>
                  <button
                    type="button"
                    class="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300"
                    onClick={handleOtpVerify}
                  >
                    Verify OTP
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default ApplicantReg;
