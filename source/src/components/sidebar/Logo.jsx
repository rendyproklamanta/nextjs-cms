import React from "react";
import Link from "next/link";
// eslint-disable-next-line no-unused-vars
import Icon from "@/src/components/ui/Icon";
import useDarkMode from "@/src/hooks/useDarkMode";
import useSidebar from "@/src/hooks/useSidebar";
import useSemiDark from "@/src/hooks/useSemiDark";
import useSkin from "@/src/hooks/useSkin";
import Image from "next/image";

const SidebarLogo = ({ menuHover }) => {
   const [isDark] = useDarkMode();
   const [collapsed, setMenuCollapsed] = useSidebar();
   // semi dark
   const [isSemiDark] = useSemiDark();
   // skin
   const [skin] = useSkin();
   return (
      <div
         className={` logo-segment flex justify-between items-center bg-white dark:bg-slate-800 z-[9] py-6  px-4 
      ${menuHover ? "logo-hovered" : ""}
      ${skin === "bordered"
               ? " border-b border-r-0 border-slate-200 dark:border-slate-700"
               : " border-none"
            }
      
      `}
      >
         <Link href="/">
            <div className="flex items-center space-x-4">
               <div className="logo-icon animate-pulse">
                  {!isDark && !isSemiDark ? (
                     <Image src="/assets/images/logo/logo.png" alt="" width={150} height={0} priority={true} />
                  ) : (
                     <Image src="/assets/images/logo/logo.png" alt="" width={150} height={0} priority={true} />
                  )}
               </div>
            </div>
         </Link>

         {(!collapsed || menuHover) && (
            <div
               onClick={() => setMenuCollapsed(!collapsed)}
               className={`h-4 w-4 border-[1.5px] border-slate-900 dark:border-slate-700 rounded-full transition-all duration-150
          ${collapsed
                     ? ""
                     : "ring-2 ring-inset ring-offset-4 ring-black-900 dark:ring-slate-400 bg-slate-900 dark:bg-slate-400 dark:ring-offset-slate-700"
                  }
          `}
            ></div>
         )}
      </div>
   );
};

export default SidebarLogo;
