import React from 'react';
function SelectBox({ LName, Iname, optionVal, value, onChange, errorMsg, disabled }) {
  return (
    <>
      <div className="sm:col-span-2">
        <label htmlFor={LName} className="block text-sm/6 font-medium text-gray-900">
          {LName}
        </label>
        <div className="mt-2 grid grid-cols-1">
          <select
            name={Iname}
            onChange={onChange}
            value={value}
            autoComplete="country-name"
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            disabled={disabled}
          >
            <option value="">select {LName}</option>
            {optionVal.map((opt, index) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
      </div>
    </>
  );
}

export default SelectBox;
