import React from 'react';
import Link from 'next/link';
// eslint-disable-next-line no-unused-vars
import Icon from '@/src/components/ui/Icon';
import useDarkMode from '@/src/hooks/useDarkMode';
import useSidebar from '@/src/hooks/useSidebar';
import useSemiDark from '@/src/hooks/useSemiDark';
import useSkin from '@/src/hooks/useSkin';
import Image from 'next/image';

const SidebarLogo = ({ menuHover }) => {
   const [isDark] = useDarkMode();
   const [collapsed, setMenuCollapsed] = useSidebar();
   // semi dark
   const [isSemiDark] = useSemiDark();
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
         <Link href="dashboard">
            <div className="flex items-center space-x-4">
               <div className="logo-icon animate-pulse">
                  {!isDark && !isSemiDark ? (
                     <Image
                        src="/assets/images/logo/logo.png"
                        alt=""
                        width={100}
                        height={0}
                        priority={true}
                     />
                  ) : (
                     <Image
                        src="/assets/images/logo/logo.png"
                        alt=""
                        width={100}
                        height={0}
                        priority={true}
                     />
                  )}
               </div>
            </div>
         </Link>

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
