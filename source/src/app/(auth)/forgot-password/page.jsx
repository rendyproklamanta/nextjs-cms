'use client';

import React from 'react';
import Link from 'next/link';
import ForgotPass from '@/src/components/auth/form/forgot';
import useDarkMode from '@/src/hooks/useDarkMode';
import Image from 'next/image';

const ForgotPassPage = () => {
   const [isDark] = useDarkMode();
   return (
      <div className="loginwrapper">
         <div className="lg-inner-column">
            <div className="left-column relative z-[1]">
               <div className="max-w-[520px] pt-20 ltr:pl-20 rtl:pr-20">
                  <Link href="/">
                     <Image
                        src={`/assets/images/logo/${isDark ? 'logo-white.svg' : 'logo.svg'}`}
                        alt=""
                        width={400}
                        height={0}
                     />
                  </Link>
                  <h4>
                     Unlock your Project{' '}
                     <span className="font-bold text-slate-800 dark:text-slate-400">
                        performance
                     </span>
                  </h4>
               </div>
               <div className="absolute bottom-[-130px] left-0 z-[-1] h-full w-full">
                  <Image
                     className="h-full w-full object-contain"
                     src={`/assets/images/svg/img-1.svg`}
                     alt=""
                     width={400}
                     height={0}
                  />
               </div>
            </div>
            <div className="right-column relative">
               <div className="inner-content flex h-full flex-col bg-white dark:bg-slate-800">
                  <div className="auth-box2 flex h-full flex-col justify-center">
                     <div className="mobile-logo mb-6 block text-center lg:hidden">
                        <Link href="/">
                           <Image
                              className="mx-auto"
                              src={`/assets/images/svg/img-1.svg`}
                              alt=""
                              width={400}
                              height={0}
                           />
                        </Link>
                     </div>
                     <div className="mb-5 text-center 2xl:mb-10">
                        <h4 className="mb-4 font-medium">Forgot Your Password?</h4>
                        <div className="text-base text-slate-500 dark:text-slate-400">
                           Reset Password with Dashcode.
                        </div>
                     </div>
                     <div className="mb-4 mt-10 rounded bg-slate-100 px-2 py-3 text-center text-base font-normal text-slate-500 dark:bg-slate-600 dark:text-slate-400">
                        Enter your Email and instructions will be sent to you!
                     </div>

                     <ForgotPass />
                     <div className="mx-auto mt-8 text-sm font-normal uppercase text-slate-500 dark:text-slate-400 md:max-w-[345px] 2xl:mt-12">
                        Forget It,
                        <Link
                           href="/"
                           className="font-medium text-slate-900 hover:underline dark:text-white"
                        >
                           Send me Back
                        </Link>
                        to The Sign In
                     </div>
                  </div>
                  <div className="auth-footer text-center">
                     Copyright 2021, Dashcode All Rights Reserved.
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ForgotPassPage;
