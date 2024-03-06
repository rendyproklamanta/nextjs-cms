"use client";

import { redirect } from "next/navigation";
import { Suspense } from "react";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import Sidebar from "@/src/components/sidebar";
import useWidth from "@/src/hooks/useWidth";
import useSidebar from "@/src/hooks/useSidebar";
import useContentWidth from "@/src/hooks/useContentWidth";
import useMenulayout from "@/src/hooks/useMenulayout";
import useMenuHidden from "@/src/hooks/useMenuHidden";
import MobileMenu from "@/src/components/sidebar/MobileMenu";
import useMobileMenu from "@/src/hooks/useMobileMenu";
import useRtl from "@/src/hooks/useRtl";
import useDarkMode from "@/src/hooks/useDarkMode";
import useSkin from "@/src/hooks/useSkin";
import Loading from "@/src/components/Loading";
import useNavbarType from "@/src/hooks/useNavbarType";
import { motion } from "framer-motion";
import MobileFooter from "@/src/components/footer/MobileFooter";
import Header from "@/src/components/header";
import useUserInfo from "@/src/hooks/useUserInfo";

const LayoutDashboard = ({ children }) => {
   const { width, breakpoints } = useWidth();
   const [collapsed] = useSidebar();
   const [isRtl] = useRtl();
   const [isDark] = useDarkMode();
   const [skin] = useSkin();
   const [navbarType] = useNavbarType();
   const location = usePathname();


   // header switch class
   const switchHeaderClass = () => {
      if (menuType === "horizontal" || menuHidden) {
         return "ltr:ml-0 rtl:mr-0";
      } else if (collapsed) {
         return "ltr:ml-[72px] rtl:mr-[72px]";
      } else {
         return "ltr:ml-[248px] rtl:mr-[248px]";
      }
   };

   // content width
   const [contentWidth] = useContentWidth();
   const [menuType] = useMenulayout();
   const [menuHidden] = useMenuHidden();
   // mobile menu
   const [mobileMenu, setMobileMenu] = useMobileMenu();

   return (
      <div
         dir={isRtl ? "rtl" : "ltr"}
         className={`app-warp ${isDark ? "dark" : "light"} ${skin === "bordered" ? "skin--bordered" : "skin--default"}
         ${navbarType === "floating" ? "has-floating" : ""}`}
      >
         <ToastContainer />
         <Header className={width > breakpoints.xl ? switchHeaderClass() : ""} />
         {menuType === "vertical" && width > breakpoints.xl && !menuHidden && (
            <Sidebar />
         )}
         <MobileMenu
            className={`${width < breakpoints.xl && mobileMenu
               ? "left-0 visible opacity-100  z-[9999]"
               : "left-[-300px] invisible opacity-0  z-[-999] "
               }`}
         />
         {/* mobile menu overlay*/}
         {width < breakpoints.xl && mobileMenu && (
            <div className="overlay bg-slate-900/50 backdrop-filter backdrop-blur-sm opacity-100 fixed inset-0 z-[999]" onClick={() => setMobileMenu(false)}>
            </div>
         )}
         <div className={`content-wrapper transition-all duration-150 ${width > 1280 ? switchHeaderClass() : ""}`}>
            {/* md:min-h-screen will h-full*/}
            <div className="page-content page-min-height">
               <div className={
                  contentWidth === "boxed" ? "container mx-auto" : "container-fluid"
               }>
                  <motion.div
                     key={location}
                     initial="pageInitial"
                     animate="pageAnimate"
                     exit="pageExit"
                     variants={{
                        pageInitial: {
                           opacity: 0,
                           y: 50,
                        },
                        pageAnimate: {
                           opacity: 1,
                           y: 0,
                        },
                        pageExit: {
                           opacity: 0,
                           y: -50,
                        },
                     }}
                     transition={{
                        type: "tween",
                        ease: "easeInOut",
                        duration: 0.5,
                     }}
                  >
                     <Suspense fallback={<Loading />}>
                        {children}
                     </Suspense>
                  </motion.div>
               </div>
            </div>
         </div>

         {width < breakpoints.md && <MobileFooter />}
         {/* {width > breakpoints.md && (
            <Footer className={width > breakpoints.xl ? switchHeaderClass() : ""} />
         )} */}

      </div>
   );
};


export default function RootLayout({ children }) {
   const [userInfo, isLoading] = useUserInfo();

   if (!isLoading && !userInfo) {
      redirect('/login');
   }

   return (
      <>
         {!isLoading && userInfo &&
            <LayoutDashboard>
               {children}
            </LayoutDashboard>
         }
      </>
   );

}
