import React, { useRef, useEffect, useState } from 'react';

import Navmenu from './Navmenu';
import menuItems from '@/src/constant/menuItems';
import SimpleBar from 'simplebar-react';
import useSkin from '@/src/hooks/useSkin';
import useMobileMenu from '@/src/hooks/useMobileMenu';
import Icon from '@/src/components/ui/Icon';
import Logo from '../header/Tools/Logo';

const MobileMenu = ({ className = 'custom-class' }) => {
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
      scrollableNodeRef.current.addEventListener('scroll', handleScroll);
   }, [scrollableNodeRef]);

   // skin
   // eslint-disable-next-line no-unused-vars
   const [skin] = useSkin();
   const [mobileMenu, setMobileMenu] = useMobileMenu();
   return (
      <div
         className={`${className} fixed  top-0 h-full w-[248px] bg-white  shadow-lg   dark:bg-slate-800`}
      >
         <div className="logo-segment z-[9] flex h-[85px] items-center justify-between bg-white px-4  dark:bg-slate-800 ">
            <div className="flex items-center space-x-4">
               <div className="logo-icon">
                  <Logo />
               </div>
            </div>
            <button
               type="button"
               onClick={() => setMobileMenu(!mobileMenu)}
               className="cursor-pointer text-2xl text-slate-900 dark:text-white"
            >
               <Icon icon="heroicons:x-mark" />
            </button>
         </div>

         <div
            className={`nav-shadow  pointer-events-none absolute top-[80px] z-[1] h-[60px] w-full transition-all duration-200 ${
               scroll ? ' opacity-100' : ' opacity-0'
            }`}
         ></div>
         <SimpleBar
            className="sidebar-menu h-[calc(100%-80px)] px-4"
            scrollableNodeProps={{ ref: scrollableNodeRef }}
         >
            <Navmenu menus={menuItems} />
         </SimpleBar>
      </div>
   );
};

export default MobileMenu;
