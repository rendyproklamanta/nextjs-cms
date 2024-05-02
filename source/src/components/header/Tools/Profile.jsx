import React from 'react';
import Dropdown from '@/src/components/ui/Dropdown';
import Icon from '@/src/components/ui/Icon';
import { Menu } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { handleLogout } from '@/src/store/slices/authSlice';
import Image from 'next/image';
import { useGetUserInfoQuery } from '@/src/store/api/authApi';

const Profile = () => {
   const dispatch = useDispatch();
   const router = useRouter();
   const { isLoading, data: res } = useGetUserInfoQuery();

   const ProfileLabel = () => {
      return (
         <div className="flex items-center">
            <div className="flex-1 ltr:mr-[10px] rtl:ml-[10px]">
               <div className="h-7 w-7 rounded-full lg:h-8 lg:w-8">
                  <div
                     className="inline-block h-8 w-8 animate-spin rounded-full"
                     role="status"
                  >
                     <Image
                        src="/assets/images/logo/gear.png"
                        alt=""
                        width={400}
                        height={0}
                     />
                  </div>
               </div>
            </div>
            <div className="flex-none items-center overflow-hidden text-ellipsis whitespace-nowrap text-sm font-normal text-slate-600 dark:text-white lg:flex">
               <span className="block w-[100px] overflow-hidden text-ellipsis whitespace-nowrap capitalize">
                  {!isLoading && res?.data?.name}
               </span>
               <span className="inline-block text-base ltr:ml-[10px] rtl:mr-[10px]">
                  <Icon icon="heroicons-outline:chevron-down"></Icon>
               </span>
            </div>
         </div>
      );
   };

   const ProfileMenu = [
      {
         label: 'Profile',
         icon: 'heroicons-outline:user',

         action: () => {
            router.push(
               `/${!isLoading && res?.data?.role === 'admin' ? 'admin' : 'user'}/${res?.data?._id}`,
            );
         },
      },
      {
         label: 'Logout',
         icon: 'heroicons-outline:login',
         action: () => {
            dispatch(handleLogout(true));
            router.push('/login');
         },
      },
   ];

   return (
      <Dropdown label={ProfileLabel()} classMenuItems="w-[180px] top-[58px]">
         {ProfileMenu.map((item, index) => (
            <Menu.Item key={index}>
               {({ active }) => (
                  <div
                     onClick={() => item.action()}
                     className={`${
                        active
                           ? 'bg-slate-100 text-slate-900 dark:bg-slate-600 dark:bg-opacity-50 dark:text-slate-300'
                           : 'text-slate-600 dark:text-slate-300'
                     } block     ${
                        item.hasDivider
                           ? 'border-t border-slate-100 dark:border-slate-700'
                           : ''
                     }`}
                  >
                     <div className={`block cursor-pointer px-4 py-2`}>
                        <div className="flex items-center">
                           <span className="block text-xl ltr:mr-3 rtl:ml-3">
                              <Icon icon={item.icon} />
                           </span>
                           <span className="block text-sm">{item.label}</span>
                        </div>
                     </div>
                  </div>
               )}
            </Menu.Item>
         ))}
      </Dropdown>
   );
};

export default Profile;
