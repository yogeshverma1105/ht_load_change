import React, { useState } from "react";

const Button = ({
  label = "Click Me",      
  onClick,                 
  color = "bg-blue-500",   
  disabled = false,        
  processing = false,
  type="button"    
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClick = async (e) => {
    if (disabled || isProcessing) return;

    if (onClick) {
      setIsProcessing(true); 
      try {
        await onClick(e); 
      } finally {
        setIsProcessing(false); 
      }
    }
  };

  return (
    <div className="relative pt-5">
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || isProcessing}
      className={`
        px-8 py-2 rounded-lg text-white font-medium
        ${disabled || isProcessing ? "bg-gray-400 cursor-not-allowed" : color}
      `}
    >
      {isProcessing || processing ? "Processing..." : label}
    </button>
</div>
  );
};

export default Button;

