import React from 'react';
import Icon from '@/src/components/ui/Icon';

const FormGroup = ({
   label,
   classLabel = 'form-label',
   className = '',
   error,
   errorToggle,
   id,
   horizontal,
   validate,
   msgTooltip,
   description,

   children,
}) => {
   return (
      <div
         className={`formGroup   ${error && errorToggle ? 'has-error' : ''}  ${
            horizontal ? 'flex' : ''
         }  ${validate && 'is-valid'} ${className} `}
      >
         {label && (
            <label
               htmlFor={id}
               className={`block capitalize ${classLabel} ${error && errorToggle && 'text-danger-500'}  ${
                  horizontal ? 'flex-0 mr-6 w-[60px] break-words md:w-[100px]' : ''
               }`}
            >
               {label}
            </label>
         )}
         <div className={`relative ${horizontal ? 'flex-1' : ''}`}>
            {children}

            {/* icon */}

            <div className="absolute top-1/2 flex -translate-y-1/2 space-x-1 text-xl ltr:right-[14px]  rtl:left-[14px] rtl:space-x-reverse">
               {error && errorToggle && (
                  <span className="text-danger-500">
                     <Icon icon="heroicons-outline:information-circle" />
                  </span>
               )}
               {validate && (
                  <span className="text-success-500">
                     <Icon icon="bi:check-lg" />
                  </span>
               )}
            </div>
         </div>
         {/* error and success message*/}
         {error && errorToggle && (
            <div
               className={` mt-2 ${
                  msgTooltip
                     ? ' inline-block rounded bg-danger-500 px-2 py-1 text-[10px] text-white'
                     : ' block text-sm text-danger-500'
               }`}
            >
               {error.message}
            </div>
         )}
         {/* validated and success message*/}
         {validate && (
            <div
               className={` mt-2 ${
                  msgTooltip
                     ? ' inline-block rounded bg-success-500 px-2 py-1 text-[10px] text-white'
                     : ' block text-sm text-success-500'
               }`}
            >
               {validate}
            </div>
         )}
         {/* only description */}
         {description && <span className="input-description">{description}</span>}
      </div>
   );
};

export default FormGroup;
