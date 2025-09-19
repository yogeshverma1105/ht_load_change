import React, { useId } from 'react';
const RadioTag = React.forwardRef(function RadioTag({
  type = 'radio',
  options,
  errorMsg,
  ...props
},ref) {
     const id = useId()
  return (
    <div className="sm:col-span-2">
      <label className="block text-sm font-medium text-gray-900 mb-1"></label>
      <div className="flex gap-4">
        {options.map((option, index) => (
          <label key={index} className="flex items-center text-sm text-gray-700">
            <input
              type={type}
              //   name={Iname}
                value={option.value}
              //   checked={value === option.value}
              //   onChange={onChange}
              //   disabled={disabled}
              className="mr-2"
              ref={ref}
              {...props}
              id={id}
            />
            {option.label}
          </label>
        ))}
      </div>
      {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
    </div>
  );
});
export default RadioTag
