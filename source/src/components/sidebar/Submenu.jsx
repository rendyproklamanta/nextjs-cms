import React, { useState } from 'react';
import { Collapse } from 'react-collapse';
import Link from 'next/link';
import Icon from '@/src/components/ui/Icon';
import Multilevel from './Multi';

const Submenu = ({ activeSubmenu, item, i, locationName }) => {
   const [activeMultiMenu, setMultiMenu] = useState(null);
   const toggleMultiMenu = (j) => {
      if (activeMultiMenu === j) {
         setMultiMenu(null);
      } else {
         setMultiMenu(j);
      }
   };
   return (
      <Collapse isOpened={activeSubmenu === i}>
         <ul className="sub-menu  space-y-4  ">
            {item.child?.map((subItem, j) => (
               <li key={j} className="block pl-4 pr-1 first:pt-4  last:pb-4">
                  {subItem?.multi_menu ? (
                     <div>
                        <div
                           onClick={() => toggleMultiMenu(j)}
                           className={`${
                              activeMultiMenu
                                 ? ' text-black font-medium dark:text-white'
                                 : 'text-slate-600 dark:text-slate-300'
                           } flex cursor-pointer items-center space-x-3 text-sm transition-all duration-150`}
                        >
                           <span
                              className={`${
                                 activeMultiMenu
                                    ? 'bg-slate-900 ring-4 ring-black-500 ring-opacity-[15%] dark:bg-slate-300 dark:ring-slate-300 dark:ring-opacity-20'
                                    : ''
                              } inline-block h-2 w-2 flex-none rounded-full border border-slate-600 dark:border-white `}
                           ></span>
                           <span className="flex-1">{subItem.childtitle}</span>
                           <span className="flex-none">
                              <span
                                 className={`menu-arrow transform transition-all duration-300 ${activeMultiMenu === j ? ' rotate-90' : ''}`}
                              >
                                 <Icon icon="ph:caret-right" />
                              </span>
                           </span>
                        </div>
                        <Multilevel
                           activeMultiMenu={activeMultiMenu}
                           j={j}
                           subItem={subItem}
                           locationName={locationName}
                        />
                     </div>
                  ) : (
                     <Link href={'/' + subItem.childlink}>
                        <span
                           className={`${
                              locationName === subItem.childlink
                                 ? ' text-black font-medium dark:text-white'
                                 : 'text-slate-600 dark:text-slate-300'
                           } flex items-center space-x-3 text-sm transition-all duration-150`}
                        >
                           <span className="relative flex h-3 w-3 items-center justify-center">
                              {locationName === subItem.childlink ? (
                                 <>
                                    <span className="absolute inline-block h-full w-full animate-ping rounded-full bg-black-400 opacity-75"></span>
                                    <span className="relative inline-block h-2 w-2 rounded-full bg-black-500 dark:bg-slate-300"></span>
                                 </>
                              ) : (
                                 <span className="inline-block h-2 w-2 flex-none rounded-full border border-slate-600 dark:border-white"></span>
                              )}
                           </span>

                           <span
                              className={`flex-1 ${locationName === subItem.childlink && 'text-black-900 dark:text-white'}`}
                           >
                              {subItem.childtitle}
                           </span>
                        </span>
                     </Link>
                  )}
               </li>
            ))}
         </ul>
      </Collapse>
   );
};

export default Submenu;
