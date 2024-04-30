import React, { Fragment } from 'react';
import Icon from '@/src/components/ui/Icon';
const Select = ({
   label,
   placeholder,
   classLabel = 'form-label',
   className = '',
   // eslint-disable-next-line no-unused-vars
   classGroup = '',
   register,
   name,
   readonly,
   value,
   error,
   // eslint-disable-next-line no-unused-vars
   icon,
   disabled,
   id,
   horizontal,
   validate,
   msgTooltip,
   description,
   options,
   defaultValue,

   size,
   ...rest
}) => {
   options = options || Array(3).fill('option');
   return (
      <div
         className={`formGroup  ${error && 'has-error'}  ${horizontal && 'flex'}  ${validate && 'is-valid'} `}
      >
         {label && (
            <label
               htmlFor={id}
               className={`block capitalize ${classLabel} ${error ? 'text-danger-500' : ''} ${horizontal ? 'flex-0 mr-6 w-[60px] break-words md:w-[100px]' : ''}`}
            >
               {label}
            </label>
         )}
         <div className={`relative ${horizontal ? 'flex-1' : ''}`}>
            {name && (
               <select
                  {...register(name)}
                  {...rest}
                  className={`${error ? ' has-error' : ' '} form-control appearance-none  py-2 ${className}  `}
                  placeholder={placeholder}
                  readOnly={readonly}
                  disabled={disabled}
                  id={id}
                  value={value}
                  size={size}
                  defaultValue={defaultValue}
               >
                  <option value="" disabled>
                     {placeholder ?? '-- Select Options --'}
                  </option>

                  {options.map((option, i) => (
                     <Fragment key={i}>
                        {option.value && option.label && (
                           <option key={i} value={option.value}>
                              {option.label}
                           </option>
                        )}
                     </Fragment>
                  ))}
               </select>
            )}
            {!name && (
               <select
                  className={`${
                     error ? ' has-error' : ' '
                  } form-control appearance-none py-2 ${className}  `}
                  placeholder={placeholder}
                  readOnly={readonly}
                  disabled={disabled}
                  id={id}
                  value={value}
                  size={size}
                  defaultValue={defaultValue}
               >
                  <option value="" disabled>
                     {placeholder}
                  </option>
                  {options.map((option, i) => (
                     <Fragment key={i}>
                        {option.value && option.label ? (
                           <option key={i} value={option.value}>
                              {option.label}
                           </option>
                        ) : (
                           <option key={i} value={option}>
                              {option}
                           </option>
                        )}
                     </Fragment>
                  ))}
               </select>
            )}

            {/* icon */}
            <div className="absolute top-1/2 flex -translate-y-1/2 space-x-1 text-xl ltr:right-[14px]  rtl:left-[14px] rtl:space-x-reverse">
               {error && (
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
         {error && (
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

export default Select;
