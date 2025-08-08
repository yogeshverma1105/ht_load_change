import React from 'react'

function RadioButton({ LName, Iname, errorMsg, value, onChange, disabled }) {
  return (
    <>
     <div className="sm:col-span-1">
        <div class="flex items-center mb-4">
    <input id="default-radio-1" type="radio" value={value} name={Iname} onChange={onChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" disabled={disabled}/>
    <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{LName}</label>
</div>
        {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
      </div>
    </>
  )
}

export default RadioButton