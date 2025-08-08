import React from 'react';
const Button = ({ type, name, onChange }) => {
  return (
    <>
      <button
        type={type}
        name={name}
        onClick={onChange}
        class="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-blue-700 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        {name}
      </button>
    </>
  );
};
export default Button;
