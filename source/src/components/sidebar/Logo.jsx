import React from 'react';
import useSidebar from '@/src/hooks/useSidebar';
import useSkin from '@/src/hooks/useSkin';
import Logo from '../header/Tools/Logo';

const SidebarLogo = ({ menuHover }) => {
   const [collapsed, setMenuCollapsed] = useSidebar();
   // skin
   const [skin] = useSkin();
   return (
      <div
         className={` logo-segment z-[9] mb-4 flex items-center justify-between bg-white px-2 py-4 dark:bg-slate-800 
      ${menuHover ? 'logo-hovered' : ''}
      ${
         skin === 'bordered'
            ? ' border-b border-r-0 border-slate-200 dark:border-slate-700'
            : ' border-none'
      }
      
      `}
      >
         <div className="flex items-center space-x-4">
            <div className="logo-icon animate-pulse">
               <Logo />
            </div>
         </div>

         {(!collapsed || menuHover) && (
            <div
               onClick={() => setMenuCollapsed(!collapsed)}
               className={`h-4 w-4 rounded-full border-[1.5px] border-slate-900 transition-all duration-150 dark:border-slate-700
          ${
             collapsed
                ? ''
                : 'bg-slate-900 ring-2 ring-inset ring-black-900 ring-offset-4 dark:bg-slate-400 dark:ring-slate-400 dark:ring-offset-slate-700'
          }
          `}
            ></div>
         )}
      </div>
   );
};

export default SidebarLogo;
