'use client';

import Link from 'next/link';
import useDarkMode from '@/src/hooks/useDarkMode';
import Image from 'next/image';
import { WEBSITE_NAME } from '@/src/constant/setting';

const HomePage = () => {
   const [isDark] = useDarkMode();
   return (
      <div className="app-warp light skin--default">
         <div className="min-h-screen">
            <div className="left-0 top-0 w-full xl:absolute">
               <div className="container flex flex-wrap items-center justify-between py-6">
                  <div>
                     <Link href="/">
                        <Image
                           src={`/assets/images/logo/${isDark ? 'logo-white.svg' : 'logo.svg'}`}
                           alt=""
                           width={200}
                           height={0}
                        />
                     </Link>
                  </div>
               </div>
            </div>
            <div className="container">
               <div className="grid min-h-screen grid-cols-1 items-center gap-10 sm:grid-cols-2 md:grid-cols-2">
                  <div>
                     <Image
                        src={`/assets/images/tracking-icon.png`}
                        alt=""
                        width={600}
                        height={0}
                     />
                  </div>
                  <div className="space-y-6">
                     <div className="relative flex items-center space-x-3 text-2xl text-slate-900 dark:text-white">
                        <span className="inline-block h-[1px] w-[25px] bg-secondary-500"></span>
                        <span>{WEBSITE_NAME}</span>
                     </div>
                     <div className="text-5xl font-semibold text-slate-900 dark:text-white">
                        Tracking Your Packet
                     </div>
                     <div className="flex items-center rounded bg-white px-3">
                        <input
                           type="text"
                           placeholder="Silahkan masukkan no marking code"
                           className="block h-full w-full flex-1 border-none bg-transparent py-6 text-base placeholder:text-secondary-500 focus:outline-none focus:ring-0"
                        />
                        <div className="flex-none">
                           <button
                              type="button"
                              className="btn btn-dark btn-sm px-6"
                           >
                              Search
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default HomePage;
