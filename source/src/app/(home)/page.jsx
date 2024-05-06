'use client';

import Image from 'next/image';
import { WEBSITE_NAME } from '@/src/constant/setting';
import Logo from '@/src/components/header/Tools/Logo';

const HomePage = () => {
   return (
      <div className="app-warp light skin--default">
         <div className="">
            <div className="left-0 top-0 w-full xl:absolute">
               <div className="container flex flex-wrap items-center justify-between py-6">
                  <Logo />
               </div>
            </div>
            <div className="container">
               <div className="grid grid-cols-1 items-center gap-10 sm:grid-cols-2 md:min-h-screen md:grid-cols-2">
                  <div>
                     <Image
                        src={`/assets/images/tracking-icon.png`}
                        alt=""
                        width={600}
                        height={0}
                     />
                  </div>
                  <div className="space-y-7">
                     <div className="relative flex items-center space-x-3 text-2xl text-slate-900 dark:text-white">
                        <span className="inline-block h-[1px] w-[25px] bg-secondary-500"></span>
                        <span>{WEBSITE_NAME}</span>
                     </div>
                     <div className="text-5xl font-semibold text-slate-900 dark:text-white">
                        Welcome to NextJS
                     </div>
                     <div className="flex items-center rounded bg-white px-3">
                        <input
                           type="text"
                           placeholder="Search documentation"
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
