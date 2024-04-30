import { useState } from 'react';
import Icon from '@/src/components/ui/Icon';
const Accordion = ({ items, className = 'space-y-5' }) => {
   const [activeIndex, setActiveIndex] = useState(null);

   const [open, setOpen] = useState(false);

   const toggleAccrodian = (index) => {
      setActiveIndex(index);
      setOpen(!open);
   };

   return (
      <div className={className}>
         {items.map((item, index) => (
            <div className="accordion rounded-md shadow-base dark:shadow-none" key={index}>
               <div
                  className={`flex w-full cursor-pointer justify-between px-8 py-4 text-start text-base font-medium text-slate-600 transition duration-150 dark:text-slate-300 ${
                     activeIndex === index
                        ? 'rounded-t-md bg-slate-50 dark:bg-slate-700 dark:bg-opacity-60 '
                        : 'rounded-md bg-white  dark:bg-slate-700'
                  }`}
                  onClick={() => toggleAccrodian(index)}
               >
                  <span>{item.title} </span>
                  <span
                     className={`h-5 text-[22px] text-slate-900 transition-all duration-300 dark:text-white ${
                        activeIndex === index ? 'rotate-180 transform' : ''
                     }`}
                  >
                     <Icon icon="heroicons-outline:chevron-down" />
                  </span>
               </div>

               {activeIndex === index && (
                  <div
                     className={`${
                        index === activeIndex
                           ? 'dark:border dark:border-t-0 dark:border-slate-700'
                           : 'l'
                     } rounded-b-md bg-white text-sm font-normal text-slate-600 dark:bg-slate-900 dark:text-slate-300`}
                  >
                     <div
                        className="px-8 py-4"
                        dangerouslySetInnerHTML={{ __html: item.content }}
                     ></div>
                  </div>
               )}
            </div>
         ))}
      </div>
   );
};
export default Accordion;
