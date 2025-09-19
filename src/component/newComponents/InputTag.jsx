import React, { useId } from "react";
const InputTag = React.forwardRef(function InputTag({
    LName,
    type = 'text',
    className = "",
    placeholder,
    errorMsg,
    disabled,
    // register,
    // name
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
                <input
                    type={type}
                    placeholder={placeholder}
                    autoComplete="off"
                    className={`uppercase block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm ${className}`}
                    ref={ref}
                    // {...register}
                    {...props}
                    id={id}
                    disabled={disabled}
                />
            </div>
            {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
        </div>
    );
})
export default InputTag