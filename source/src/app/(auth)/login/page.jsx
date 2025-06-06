'use client';

// import Link from "next/link";
import LoginForm from '@/src/components/auth/form/login';
// eslint-disable-next-line no-unused-vars
import Social from '@/src/components/auth/social';
import useDarkMode from '@/src/hooks/useDarkMode';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useCheckTokenExpiration from '@/src/hooks/useCheckTokenExpiration';
import { useEffect } from 'react';

// image import
const LayoutLogin = () => {
   const [isDark] = useDarkMode();

   return (
      <>
         <div className="loginwrapper">
            <div className="lg-inner-column">
               <div className="left-column relative z-[1]">
                  <div className="animate__animated animate__slideInLeft animate__delay-1s bottom-[-130px] left-0 z-[-1] h-full w-full 2xl:bottom-[-160px]">
                     <Image
                        src="/assets/images/auth/dummy.png"
                        alt="img-plc"
                        width={500}
                        height={0}
                        priority={true}
                        className="h-full w-full"
                     />
                  </div>
               </div>
               <div className="right-column relative">
                  <div className="inner-content flex h-full flex-col bg-white dark:bg-slate-800">
                     <div className="auth-box flex h-full flex-col justify-center">
                        <div className="mobile-logo mb-3 text-center">
                           <Link href="/">
                              <Image
                                 src={`/assets/images/logo/${isDark ? 'logo.png' : 'logo.png'}`}
                                 alt=""
                                 width={200}
                                 height={0}
                                 className="inline"
                              />
                           </Link>
                        </div>
                        <div className="1xl:mb-10 mb-4 text-center">
                           <h4 className="font-medium">
                              Sign in to your account
                           </h4>
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
   const [isLoading, hasRefreshToken] = useCheckTokenExpiration(); // middleware check refreshToken
   const router = useRouter();

   useEffect(() => {
      if (!isLoading && hasRefreshToken) {
         router.push('/dashboard');
      }
   }, [isLoading, hasRefreshToken, router]);

   if (!isLoading && !hasRefreshToken) {
      return <LayoutLogin>{children}</LayoutLogin>;
   }
};

export default LoginPage;
