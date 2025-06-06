import React, { useRef, useEffect, useState } from 'react';
import SidebarLogo from './Logo';
import Navmenu from './Navmenu';
import menuItems from '@/src/constant/menuItems';
import SimpleBar from 'simplebar-react';
import useSidebar from '@/src/hooks/useSidebar';
import useSemiDark from '@/src/hooks/useSemiDark';
import useSkin from '@/src/hooks/useSkin';

const Sidebar = () => {
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

   // eslint-disable-next-line no-unused-vars
   const [collapsed, setMenuCollapsed] = useSidebar();
   const [menuHover, setMenuHover] = useState(false);

   // semi dark option
   const [isSemiDark] = useSemiDark();
   // skin
   const [skin] = useSkin();
   return (
      <div className={isSemiDark ? 'dark' : ''}>
         <div
            className={`sidebar-wrapper bg-white dark:bg-slate-800     ${
               collapsed ? 'close_sidebar w-[72px]' : 'w-[248px]'
            }
      ${menuHover ? 'sidebar-hovered' : ''}
      ${skin === 'bordered' ? 'border-r border-slate-200 dark:border-slate-700' : 'shadow-base'}
      `}
            onMouseEnter={() => {
               setMenuHover(true);
            }}
            onMouseLeave={() => {
               setMenuHover(false);
            }}
         >
            <SidebarLogo menuHover={menuHover} />
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
      </div>
   );
};

export default Sidebar;
