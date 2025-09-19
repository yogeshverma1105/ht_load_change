import React, { useId } from "react";
import { Link } from "react-router-dom";

const ViewTag = React.forwardRef(function ViewTag(
  { docs_url, className = "" }, // props with default className
  ref
) {
  const id = useId();

  return (
    <div className="sm:col-span-2">
      <div className="mt-2">
        {docs_url ? (
            <Link
          to={docs_url}
          target="_blank" // document nayi tab me open hoga
          rel="noopener noreferrer"
          ref={ref}
          id={id}
          className={`rounded-lg px-4 py-2 bg-red-700 text-green-100 hover:bg-green-800 duration-300 
            ${className}`}
        >
          View Document
        </Link>

        ):(
<Link
          to={docs_url}
          target="_blank" // document nayi tab me open hoga
          rel="noopener noreferrer"
          ref={ref}
          id={id}
          className={`uppercase block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 
            outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
            focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm 
            ${className}`}
        >
         No View Document
        </Link>
        )
        }
        
      </div>
    </div>
  );
});

export default ViewTag;
