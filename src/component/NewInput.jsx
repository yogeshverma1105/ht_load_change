import React from 'react';
import { Link } from 'react-router-dom';
export function OnlyShowValueInput({
  LName,
  Iname,
  type = 'text',
  placeholder,
  value,

}) {
  return (
    <div className="sm:col-span-2">
      <label htmlFor={Iname} className="block text-sm font-medium text-gray-900">
        {LName}
      </label>
      <div className="mt-2">
        <input
          name={Iname}
          type={type}
          value={value}
          placeholder={placeholder}
          autoComplete="off"
          className="uppercase block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
        />
      </div>
    </div>
  );
}
export function NewInput({
  LName,
  Iname,
  type = 'text',
  placeholder,
  errorMsg,
  value,
  onChange,
  disabled,
  register,
  ...rest
}) {
  return (
    <div className="sm:col-span-2">
      <label htmlFor={Iname} className="block text-sm font-medium text-gray-900">
        {LName}
      </label>
      <div className="mt-2">
        <input
          id={Iname}
          name={Iname}
          type={type}
          disabled={disabled}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="off"
          className="uppercase block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
          {...(register ? register : {})}
          {...rest}
        />
      </div>
      {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
    </div>
  );
}
export function InputDate({
  LName,
  Iname,
  type = 'date',
  placeholder,
  errorMsg,
  value,
  onChange,
  disabled,
  register,
  ...rest
}) {
  return (
    <div className="sm:col-span-2">
      <label htmlFor={Iname} className="block text-sm font-medium text-gray-900">
        {LName}
      </label>
      <div className="mt-2">
        <input
          id={Iname}
          name={Iname}
          type={type}
          disabled={disabled}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="off"
          className="uppercase block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
          {...(register ? register : {})}
          {...rest}
        />
      </div>
      {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
    </div>
  );
}
export const FileUpload = ({
  LName,
  Iname,
  accept = 'application/pdf',
  errorMsg,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="sm:col-span-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-900">
        {LName}
      </label>
      <div className="mt-2">
        <input
          name={Iname}
          type="file"
          disabled={disabled}
          accept={accept}
          onChange={onChange}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
        />
      </div>
      {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
    </div>
  );
};
export function SelectDropDown({ LName, Iname, register, value, errorMsg, optionVal, labelKey, valueKey }) {
  return (
    <>
      <div className="sm:col-span-2">
        <label htmlFor={LName} className="block text-sm/6 font-medium text-gray-900">
          {LName}
        </label>
        <div className="mt-2 grid grid-cols-1">
          <select
            name={Iname}
            value={value}
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            {...(register ? register : {})}
          >
            <option value="">select {LName}</option>
            {optionVal?.map((opt, index) => (
             
                <option key={opt[valueKey] || index} value={opt[valueKey]}>
                
              
                {opt[labelKey]}
              </option>
            ))}
          </select>
        </div>
        {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
      </div>
    </>
  );
}
export function RadioGroup({
LName,
  Iname,
  options = [],
  value,
  onChange,
  disabled,
  register,
  errorMsg,
  ...rest
}) {
  return (
    <div className="sm:col-span-2">
      <label className="block text-sm font-medium text-gray-900 mb-1">{LName}</label>
      <div className="flex gap-4">
        {options.map((option, index) => (
          <label key={index} className="flex items-center text-sm text-gray-700">
            <input
              type="radio"
              name={Iname}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              disabled={disabled}
              className="mr-2"
              {...(register ? register : {})}
              {...rest}
            />
            {option.label}
          </label>
        ))}
      </div>
      {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
    </div>
  );
}
export function ViewDocument({LName,Iname,Link}) {
  return (
    <div className="sm:col-span-2">
      <label htmlFor={Iname} className="block text-sm font-medium text-gray-900">
        {LName}
      </label>
      <div className="mt-2">
        <Link to={Link} className="uppercase block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm">View Doucment</Link>
      </div>
    </div>
  );
}




