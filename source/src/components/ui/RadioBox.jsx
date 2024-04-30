import React from 'react';

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
            className="peer sr-only"
            type="radio"
            name={name}
            id={name + label}
            value={value}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
         />
         <label
            className={`form-control flex ${padding} ${borderColor} cursor-pointer rounded-lg focus:outline-none`}
            htmlFor={name + label}
         >
            <div className="peer-checked:group:bg-indigo-600 flex h-6 w-6 items-center justify-center rounded-full border border-gray-600">
               {checked && (
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className={`h-5 w-5 ${textColor} peer-checked:group:visible" viewBox="0 0 20 20" fill="currentColor fill-current`}
                  >
                     <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                     />
                  </svg>
               )}
            </div>
            <div className="ml-3 flex flex-col">
               {label}
               {/* <span className="text-sm font-light text-gray-200">Go where only a few have gone before.</span> */}
            </div>
            <span className="text-md ml-auto font-bold">{labelIcon}</span>
         </label>
      </div>
   );
};

export default RadioBox;
