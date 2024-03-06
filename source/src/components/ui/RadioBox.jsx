import React from "react";

const RadioBox = ({
   name,
   label,
   padding,
   labelIcon,
   borderColor,
   textColor,
   disabled,

   value,
   checked,
   onChange,
}) => {
   return (
      <div className="relative">
         <input
            className="sr-only peer"
            type="radio"
            name={name}
            id={name + label}
            value={value}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
         />
         <label className={`form-control flex ${padding} ${borderColor} rounded-lg cursor-pointer focus:outline-none`} htmlFor={name + label}>
            <div className="flex items-center justify-center w-6 h-6 border border-gray-600 rounded-full peer-checked:group:bg-indigo-600">
               {checked && (
                  <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${textColor} fill-current peer-checked:group:visible" viewBox="0 0 20 20" fill="currentColor`}>
                     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
               )}
            </div>
            <div className="flex flex-col ml-3">
               {label}
               {/* <span className="text-sm font-light text-gray-200">Go where only a few have gone before.</span> */}
            </div>
            <span className="ml-auto text-md font-bold">{labelIcon}</span>
         </label >
      </div >
   );
};

export default RadioBox;
