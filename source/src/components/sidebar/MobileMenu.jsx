import React, { useRef, useEffect, useState } from "react";

import Navmenu from "./Navmenu";
import menuItems from "@/src/constant/menuItems";
import SimpleBar from "simplebar-react";
import useSemiDark from "@/src/hooks/useSemiDark";
import useSkin from "@/src/hooks/useSkin";
import useDarkMode from "@/src/hooks/useDarkMode";
import Link from "next/link";
import useMobileMenu from "@/src/hooks/useMobileMenu";
import Icon from "@/src/components/ui/Icon";
import Image from "next/image";

const MobileMenu = ({ className = "custom-class" }) => {
   const scrollableNodeRef = useRef();
   const [scroll, setScroll] = useState(false);
   useEffect(() => {
      const handleScroll = () => {
         if (scrollableNodeRef.current.scrollTop > 0) {
            setScroll(true);
         } else {
            setScroll(false);
         }
      };
      scrollableNodeRef.current.addEventListener("scroll", handleScroll);
   }, [scrollableNodeRef]);

   const [isSemiDark] = useSemiDark();
   // skin
   // eslint-disable-next-line no-unused-vars
   const [skin] = useSkin();
   const [isDark] = useDarkMode();
   const [mobileMenu, setMobileMenu] = useMobileMenu();
   return (
      <div
         className={`${className} fixed  top-0 bg-white dark:bg-slate-800 shadow-lg  h-full   w-[248px]`}
      >
         <div className="logo-segment flex justify-between items-center bg-white dark:bg-slate-800 z-[9] h-[85px]  px-4 ">
            <Link href="/">
               <div className="flex items-center space-x-4">
                  <div className="logo-icon">
                     <Image
                        src={!isDark && !isSemiDark ? "/assets/images/logo/logo-c.svg" : "/assets/images/logo/logo-c-white.svg"}
                        width={400}
                        height={0}
                        alt=""
                     />
                  </div>
                  <div>
                     <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                        DashCode
                     </h1>
                  </div>
               </div>
            </Link>
            <button
               type="button"
               onClick={() => setMobileMenu(!mobileMenu)}
               className="cursor-pointer text-slate-900 dark:text-white text-2xl"
            >
               <Icon icon="heroicons:x-mark" />
            </button>
         </div>

         <div
            className={`h-[60px]  absolute top-[80px] nav-shadow z-[1] w-full transition-all duration-200 pointer-events-none ${scroll ? " opacity-100" : " opacity-0"
               }`}
         ></div>
         <SimpleBar
            className="sidebar-menu px-4 h-[calc(100%-80px)]"
            scrollableNodeProps={{ ref: scrollableNodeRef }}
         >
            <Navmenu menus={menuItems} />
         </SimpleBar>
      </div>
   );
};

export default MobileMenu;
