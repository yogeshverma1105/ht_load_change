import './login.css';
import * as yup from "yup";
import React, { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { extractFormValues } from '../../utils/extractFormValues.js';
import { submitFormData,submitFormDataUsingQuery } from '../../utils/handlePostApi.js';
import { useDispatch } from 'react-redux';
import { setOfficerData,setLoginUser, setLoading, setError } from '../../redux/slices/userSlice.js';

const Login = ({ login_by, label }) => {
  const [error, setError] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

  const schema = yup.object().shape({
    employee_id: yup.string().required('Login ID is required'),
    password: yup.string().required('Password is required'),
  });

  const extractFormValues = (formData) => {
    const obj = {};
    for (let [key, value] of formData.entries()) {
      obj[key] = value;
    }
    return obj;
  };

  const onSubmithandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const tempObj = extractFormValues(formData);

    try {
      
      await schema.validate(tempObj, { abortEarly: false });
      setError({});
      setIsDisabled(true);
      dispatch(setLoading(true));

    
       if (location.pathname === `/department-login`) {
      let  response = await submitFormData(formData,`/ht_load_change/officer-flags/`);
        const result = await response.json();
        console.log(result,"result")
        dispatch(setOfficerData(result));
       navigate('/dashboard',);
      } else {
        // dispatch && dispatch({ type: 'LOADING', payload: true }); // optional dispatch
        let response = await submitFormDataUsingQuery(tempObj, '/ht_load_change/get-load-change-applications/?');
        const result = await response.json(); 
        dispatch(setLoginUser(result));
        navigate(`/user-dashboard`);
      }
    } catch (err) {
      handleFormErrors(err);
        dispatch(setError(error.message));
        } finally {
          dispatch(setLoading(false));
        }
  };

  const handleFormErrors = (err) => {
    const newErrors = {};
    if (err.inner && Array.isArray(err.inner)) {
      err.inner.forEach((error) => {
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
    <form onSubmit={onSubmithandler}>
      <div className="flex items-center justify-center min-h-[464px] bg-gray-100 font-raleway">
        <div className="w-full max-w-lg bg-white shadow-md rounded-sm border-b-[10px] border-cyan-400 p-5">
          <div className="text-center mb-4">
            <h4 className="text-xl font-semibold text-left">{login_by} Login</h4>
          </div>

          {/* Login ID */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
              type="text"
              name="employee_id"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
            {error.employee_id && (
              <span className="text-red-500 text-sm">{error.employee_id}</span>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
            {error.password && (
              <span className="text-red-500 text-sm">{error.password}</span>
            )}
          </div>

          {/* Show Password */}
          <div className="mb-4">
            <label className="flex items-center text-sm text-gray-600">
              <input type="checkbox" className="mr-2" />
              Show Password
            </label>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-4">
            <button
              type="submit"
              disabled={isDisabled}
              className="flex-1 bg-purple-700 text-white py-2 rounded uppercase text-sm font-semibold hover:bg-purple-800 transition"
            >
              Login
            </button>
            <button
              type="button"
              className="flex-1 bg-yellow-500 text-white py-2 rounded uppercase text-sm font-semibold hover:bg-yellow-600 transition"
            >
              Forget Password
            </button>
          </div>

          {/* Already have account */}
          <div className="text-center text-sm text-gray-700">
            Do you have already account?{" "}
            <a href="#" className="text-purple-700 hover:underline">
              Login now
            </a>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
