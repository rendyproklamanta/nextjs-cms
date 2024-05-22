import React from 'react';
import Icon from '@/src/components/ui/Icon';
import SwitchDark from './Tools/SwitchDark';
import useWidth from '@/src/hooks/useWidth';
import useSidebar from '@/src/hooks/useSidebar';
import useNavbarType from '@/src/hooks/useNavbarType';
import useMenulayout from '@/src/hooks/useMenulayout';
import useSkin from '@/src/hooks/useSkin';
import Logo from './Tools/Logo';
// import SearchModal from './Tools/SearchModal';
import Profile from './Tools/Profile';
import useMobileMenu from '@/src/hooks/useMobileMenu';
import { useGetUserInfoQuery } from '@/src/store/api/authApi';
import { WEBSITE_NAME } from '@/src/constant/setting';

const Header = ({ className = 'custom-class' }) => {
   const [collapsed, setMenuCollapsed] = useSidebar();
   const { width, breakpoints } = useWidth();
   const [navbarType] = useNavbarType();

   const { isLoading, data: res } = useGetUserInfoQuery();

   const navbarTypeClass = () => {
      switch (navbarType) {
         case 'floating':
            return 'floating  has-sticky-header';
         case 'sticky':
            return 'sticky top-0 z-[999]';
         case 'static':
            return 'static';
         case 'hidden':
            return 'hidden';
         default:
            return 'sticky top-0';
      }
   };
   const [menuType] = useMenulayout();

   const [skin] = useSkin();

   const [mobileMenu, setMobileMenu] = useMobileMenu();

   const handleOpenMobileMenu = () => {
      setMobileMenu(!mobileMenu);
   };

   const borderSwicthClass = () => {
      if (skin === 'bordered' && navbarType !== 'floating') {
         return 'border-b border-slate-200 dark:border-slate-700';
      } else if (skin === 'bordered' && navbarType === 'floating') {
         return 'border border-slate-200 dark:border-slate-700';
      } else {
         return 'dark:border-b dark:border-slate-700 dark:border-opacity-60';
      }
   };
   return (
      <header className={className + ' ' + navbarTypeClass()}>
         <div
            className={` app-header bg-white px-[15px] shadow-base dark:bg-slate-800 dark:shadow-base3 md:px-6
        ${borderSwicthClass()}
             ${menuType === 'horizontal' && width > breakpoints.xl ? 'py-' : 'py-3 md:py-4'}
        `}
         >
            <div className="flex h-full items-center justify-between">
               {/* For Vertical  */}

               {menuType === 'vertical' && (
                  <div className="flex w-full items-center space-x-2 md:space-x-4 rtl:space-x-reverse">
                     {collapsed && width >= breakpoints.xl && (
                        <button
                           className="text-xl text-slate-900 dark:text-white"
                           onClick={() => setMenuCollapsed(!collapsed)}
                        ></button>
                     )}
                     {width < breakpoints.xl && <Logo />}
                     {/* open mobile menu handlaer*/}
                     {width < breakpoints.xl && width >= breakpoints.md && (
                        <div
                           className="cursor-pointer text-2xl text-slate-900 dark:text-white"
                           onClick={handleOpenMobileMenu}
                        >
                           <Icon icon="heroicons-outline:menu-alt-3" />
                        </div>
                     )}
                     {/* <SearchModal /> */}

                     <marquee direction="left">
                        ____________👋👋👋👋👋 Hi{' '}
                        {!isLoading && res?.data?.name},{' '}
                        <span data-key="t-welcome-to">Welcome to </span>{' '}
                        {WEBSITE_NAME}👋👋👋👋____________
                     </marquee>
                  </div>
               )}
               {/* For Horizontal  */}
               {menuType === 'horizontal' && (
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                     <Logo />
                     {/* open mobile menu handlaer*/}
                     {width <= breakpoints.xl && (
                        <div
                           className="cursor-pointer text-2xl text-slate-900 dark:text-white"
                           onClick={handleOpenMobileMenu}
                        >
                           <Icon icon="heroicons-outline:menu-alt-3" />
                        </div>
                     )}
                  </div>
               )}
               {/*  Horizontal  Main Menu */}
               {/* Nav Tools  */}
               <div className="nav-tools flex items-center space-x-3 lg:space-x-6 rtl:space-x-reverse">
                  <SwitchDark />

                  {width >= breakpoints.md && <Profile />}
                  {width <= breakpoints.md && (
                     <div
                        className="cursor-pointer text-2xl text-slate-900 dark:text-white"
                        onClick={handleOpenMobileMenu}
                     >
                        <Icon icon="heroicons-outline:menu-alt-3" />
                     </div>
                  )}
               </div>
            </div>
         </div>
      </header>
   );
};

export default Header;
