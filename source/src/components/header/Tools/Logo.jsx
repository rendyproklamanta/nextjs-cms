'use client';

import React from 'react';
import useDarkMode from '@/src/hooks/useDarkMode';
import Link from 'next/link';
import useWidth from '@/src/hooks/useWidth';
import Image from 'next/image';

const Logo = () => {
   const [isDark] = useDarkMode();
   const { width, breakpoints } = useWidth();

   return (
      <div>
         <Link href="/analytics">
            <>
               {width >= breakpoints.xl ? (
                  <Image
                     src={
                        isDark
                           ? '/assets/images/logo/logo-white.svg'
                           : '/assets/images/logo/logo.svg'
                     }
                     width={100}
                     height={0}
                     alt=""
                     className="relative top-1 h-full w-full rounded-full object-cover"
                  />
               ) : (
                  <Image
                     src={
                        isDark
                           ? '/assets/images/logo/logo-c-white.svg'
                           : '/assets/images/logo/logo-c.svg'
                     }
                     width={100}
                     height={0}
                     alt=""
                  />
               )}
            </>
         </Link>
      </div>
   );
};

export default Logo;
