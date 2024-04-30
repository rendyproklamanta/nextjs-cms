'use client';

import Button from '@/src/components/ui/Button';
import Icon from '@/src/components/ui/Icon';
import Link from 'next/link';
import useDarkMode from '@/src/hooks/useDarkMode';
import Image from 'next/image';

const ComingSoonPage = () => {
   const [isDark] = useDarkMode();
   return (
      <div className="min-h-screen">
         <div className="left-0 top-0 w-full xl:absolute">
            <div className="container flex flex-wrap items-center justify-between py-6">
               <div>
                  <Link href="/">
                     <Image
                        src={`/assets/images/logo/${isDark ? 'logo-white.svg' : 'logo.svg'}`}
                        alt=""
                        width={400}
                        height={0}
                     />
                  </Link>
               </div>
               <div>
                  <Button text="Contact us" className=" btn-outline-dark btn-sm" />
               </div>
            </div>
         </div>
         <div className="container">
            <div className="flex min-h-screen flex-wrap items-center justify-between">
               <div className="max-w-[500px] space-y-4">
                  <div className="relative flex items-center space-x-3 text-2xl text-slate-900 dark:text-white">
                     <span className="inline-block h-[1px] w-[25px] bg-secondary-500"></span>
                     <span>Coming soon</span>
                  </div>
                  <div className="text-4xl font-semibold text-slate-900 dark:text-white xl:text-[70px] xl:leading-[70px]">
                     Get notified when we launch
                  </div>
                  <p className="max-w-[400px] font-normal text-slate-600 dark:text-slate-300">
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                     incididunt.
                  </p>
                  <div className="flex items-center rounded bg-white px-3">
                     <input
                        type="text"
                        placeholder="Enter your email"
                        className="block h-full w-full flex-1 bg-transparent py-6 text-base placeholder:text-secondary-500 focus:outline-none focus:ring-0"
                     />
                     <div className="flex-none">
                        <button type="button" className="btn btn-dark btn-sm px-6">
                           Notify me
                        </button>
                     </div>
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                     *Don’t worry we will not spam you :
                  </div>
               </div>
               <div>
                  <Image src={`/assets/images/svg/img-1.svg`} alt="" width={400} height={0} />
               </div>
            </div>
         </div>
         <div className="bottom-0 w-full xl:fixed">
            <div className="container">
               <div className="flex-wrap items-center justify-between space-y-4 py-6 md:flex">
                  <div>
                     <ul className="flex justify-center space-x-3 md:justify-start">
                        <li>
                           <a href="#" className="social-link">
                              <Icon icon="icomoon-free:facebook" />
                           </a>
                        </li>
                        <li>
                           <a href="#" className="social-link">
                              <Icon icon="icomoon-free:twitter" />
                           </a>
                        </li>
                        <li>
                           <a href="#" className="social-link">
                              <Icon icon="icomoon-free:linkedin2" />
                           </a>
                        </li>
                        <li>
                           <a href="#" className="social-link">
                              <Icon icon="icomoon-free:google" />
                           </a>
                        </li>
                     </ul>
                  </div>
                  <div>
                     <ul className="flex justify-center space-x-3 md:justify-start">
                        <li>
                           <a
                              href="#"
                              className="text-sm text-slate-500 transition duration-150 hover:text-slate-900 dark:text-slate-400"
                           >
                              Privacy policy
                           </a>
                        </li>
                        <li>
                           <a
                              href="#"
                              className="text-sm text-slate-500 transition duration-150 hover:text-slate-900 dark:text-slate-400"
                           >
                              Faq
                           </a>
                        </li>
                        <li>
                           <a
                              href="#"
                              className="text-sm text-slate-500 transition duration-150 hover:text-slate-900 dark:text-slate-400"
                           >
                              Email us
                           </a>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ComingSoonPage;
