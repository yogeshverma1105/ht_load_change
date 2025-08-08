import React from 'react';

function Input({ LName, Iname, type, placeholder, errorMsg, value, onChange, disabled }) {
  return (
    <>
      <div className="sm:col-span-2">
        <label htmlFor={LName} className="block text-sm/6 font-medium text-gray-900">
          {LName}
        </label>
        <div className="mt-2">
          <input
            name={Iname}
            type={type}
            disabled={disabled}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            autoComplete="given-name"
            className="uppercase block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
        {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
      </div>
    </>
  );
}

export default Input;
