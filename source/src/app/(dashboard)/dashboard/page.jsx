'use client';

import { useGetUserInfoQuery } from '@/src/store/api/authApi';
import React from 'react';

const DashboardPage = () => {
   const { isLoading, data: res } = useGetUserInfoQuery();

   return (
      <>
         <div className="space-y-5">
            <div className="grid grid-cols-1">
               <div className="col-span-12 lg:col-span-4 2xl:col-span-3 ">
                  <div
                     className="relative rounded-[6px] bg-cover bg-center bg-no-repeat px-10 py-20"
                     style={{
                        backgroundImage:
                           'url("/assets/images/all-img/widget-bg-2.png")',
                     }}
                  >
                     <p className="mb-3 block text-3xl font-bold text-white md:text-5xl">
                        Selamat Datang..
                     </p>
                     <p className="block text-xl capitalize text-white md:text-3xl">
                        {!isLoading && res?.data?.name}
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default DashboardPage;
