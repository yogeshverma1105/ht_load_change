import React, { useId } from "react";
function SelectTag({
    LName,
    options,
    className = "",
    errorMsg,
    labelKey,
    valueKey,
    disabled,
    ...props
    }, ref) {
    const id = useId()
    
    return (
        <div className="sm:col-span-2">
            {LName &&
                <label htmlFor={id} className="block text-sm font-medium text-gray-900">
                    {LName}
                </label>
            }
            <div className="mt-2">
                <select {...props} id={id} ref={ref} disabled={disabled}
                 className={`uppercase block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm ${className}`}>
            <option value="">select {LName}</option>
            {options?.map((option)=>(
                
                <option key={option[labelKey]} value={option[valueKey]}>
                    
                     {option[labelKey]}
                </option>
            ))}
                </select>
            </div>
            {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
        </div>
    );
}
export default React.forwardRef(SelectTag)