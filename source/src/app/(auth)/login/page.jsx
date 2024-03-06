"use client";

// import Link from "next/link";
import LoginForm from "@/src/components/auth/form/login";
// eslint-disable-next-line no-unused-vars
import Social from "@/src/components/auth/social";
// import useDarkMode from "@/src/hooks/useDarkMode";
import Image from "next/image";
import useUserInfo from "@/src/hooks/useUserInfo";
import { redirect } from "next/navigation";
import { useEffect } from "react";

// image import
const LayoutLogin = () => {
   // const [isDark] = useDarkMode();

   return (
      <>
         <div className="loginwrapper">
            <div className="lg-inner-column">
               <div className="left-column relative z-[1]">
                  <div className="left-0 2xl:bottom-[-160px] bottom-[-130px] h-full w-full z-[-1] animate__animated animate__slideInLeft animate__delay-1s">
                     <Image src="/assets/images/auth/login.PNG" alt="img-plc" width={500} height={0} priority={true} className="h-full w-full" />
                  </div>
               </div>
               <div className="right-column relative">
                  <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
                     <div className="auth-box h-full flex flex-col justify-center">
                        {/* <div className="mobile-logo text-center mb-6 lg:hidden block">
                           <Link href="/">
                              <Image src={`/assets/images/logo/${isDark ? 'logo-white.svg' : 'logo.svg'}`} alt="" width={400} height={0} />
                           </Link>
                        </div> */}
                        <div className="text-center 2xl:mb-10 mb-4">
                           <h4 className="font-medium">Halaman Login</h4>
                           <div className="text-slate-500 text-base">
                              Silahkan Masuk
                           </div>
                        </div>
                        <LoginForm />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};


const LoginPage = ({ children }) => {
   const [userInfo, isLoading] = useUserInfo();

   useEffect(() => {
      if (!isLoading && userInfo) {
         redirect('/');
      }
   }, [isLoading, userInfo]);

   return (
      <>
         {!isLoading && !userInfo &&
            <LayoutLogin>
               {children}
            </LayoutLogin>
         }
      </>
   );

};

export default LoginPage;
