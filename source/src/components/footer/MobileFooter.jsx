import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/src/components/ui/Icon';
import Image from 'next/image';

const MobileFooter = () => {
   const router = useRouter();
   return (
      <div className="custom-dropshadow footer-bg fixed bottom-0 left-0 z-[9999] flex w-full items-center justify-around bg-white bg-no-repeat px-4 py-[12px] backdrop-blur-[40px] backdrop-filter dark:bg-slate-700">
         <Link href="chat">
            <div>
               <span
                  className={` relative mb-1 flex cursor-pointer flex-col items-center justify-center rounded-full text-[20px]
         ${router.pathname === 'chat' ? 'text-primary-500' : 'text-slate-900 dark:text-white'}
          `}
               >
                  <Icon icon="heroicons-outline:mail" />
                  <span className="absolute -top-2 right-[5px] z-[99] flex h-4 w-4 flex-col items-center justify-center rounded-full bg-red-500 text-[8px] font-semibold text-white lg:top-0">
                     10
                  </span>
               </span>
               <span
                  className={` block text-[11px]
          ${router.pathname === 'chat' ? 'text-primary-500' : 'text-slate-600 dark:text-slate-300'}
          `}
               >
                  Messages
               </span>
            </div>
         </Link>
         <Link
            href="profile"
            className="footer-bg relative z-[-1] -mt-[40px] flex h-[65px] w-[65px] items-center justify-center rounded-full bg-white bg-no-repeat backdrop-blur-[40px] backdrop-filter dark:bg-slate-700"
         >
            <div className="custom-dropshadow relative left-[0px] top-[0px] h-[50px] w-[50px] rounded-full">
               <Image
                  className={` h-full w-full rounded-full ${router.pathname === 'profile' ? 'border-2 border-primary-500' : 'border-2 border-slate-100'}              `}
                  src={`/assets/images/users/user-1.jpg`}
                  alt=""
                  width={400}
                  height={0}
               />
            </div>
         </Link>
         <Link href="notifications">
            <div>
               <span
                  className={` 
                     relative mb-1 flex cursor-pointer flex-col items-center justify-center rounded-full text-[20px]
                     ${router.pathname === 'notifications' ? 'text-primary-500' : 'text-slate-900 dark:text-white'}`}
               >
                  <Icon icon="heroicons-outline:bell" />
                  <span className="absolute -top-2 right-[17px] z-[99] flex h-4 w-4 flex-col items-center justify-center rounded-full bg-red-500 text-[8px] font-semibold text-white lg:top-0">
                     2
                  </span>
               </span>
               <span
                  className={`block text-[11px] ${router.pathname === 'notifications' ? 'text-primary-500' : 'text-slate-600 dark:text-slate-300'}`}
               >
                  Notifications
               </span>
            </div>
         </Link>
      </div>
   );
};

export default MobileFooter;
