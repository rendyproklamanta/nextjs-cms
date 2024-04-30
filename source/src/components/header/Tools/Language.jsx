import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import Image from 'next/image';

const months = [
   { name: 'En', image: '/assets/images/flags/usa.png' },
   { name: 'Gn', image: '/assets/images/flags/gn.png' },
];

const Language = () => {
   const [selected, setSelected] = useState(months[0]);

   return (
      <div>
         <Listbox value={selected} onChange={setSelected}>
            <div className="relative z-[22]">
               <Listbox.Button className="relative flex w-full cursor-pointer items-center space-x-[6px] rtl:space-x-reverse">
                  <span className="inline-block h-4 w-4 rounded-full md:h-6 md:w-6">
                     <Image
                        src={selected.image}
                        width={50}
                        height={50}
                        alt=""
                        className="h-full w-full rounded-full object-cover"
                     />
                  </span>
                  <span className="hidden text-sm font-medium text-slate-600 dark:text-slate-300 md:block">
                     {selected.name}
                  </span>
               </Listbox.Button>
               <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
               >
                  <Listbox.Options className="absolute top-[38px] mt-1 max-h-60 w-auto min-w-[100px] overflow-auto rounded border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 md:top-[50px] ltr:right-0 rtl:left-0 ">
                     {months.map((item, i) => (
                        <Listbox.Option key={i} value={item} as={Fragment}>
                           {({ active }) => (
                              <li
                                 className={`w-full cursor-pointer border-b border-b-gray-500 border-opacity-10 px-2 py-2 first:rounded-t last:mb-0 last:rounded-b last:border-none 
                                 ${active ? 'bg-slate-100 bg-opacity-50 dark:bg-slate-700 dark:bg-opacity-70 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}
                              >
                                 <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                    <span className="flex-none">
                                       <span className="inline-block h-4 w-4 rounded-full lg:h-6 lg:w-6">
                                          <Image
                                             src={item.image}
                                             width={50}
                                             height={50}
                                             alt=""
                                             className="relative top-1 h-full w-full rounded-full object-cover"
                                          />
                                       </span>
                                    </span>
                                    <span className="flex-1 text-sm capitalize lg:text-base">
                                       {item.name}
                                    </span>
                                 </div>
                              </li>
                           )}
                        </Listbox.Option>
                     ))}
                  </Listbox.Options>
               </Transition>
            </div>
         </Listbox>
      </div>
   );
};

export default Language;
