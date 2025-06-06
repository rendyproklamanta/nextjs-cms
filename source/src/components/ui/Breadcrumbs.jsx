import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import menuItems from '@/src/constant/menuItems';
import Icon from '@/src/components/ui/Icon';

const Breadcrumbs = () => {
   const location = usePathname();
   const locationName = location.replace('/', '');

   const [isHide, setIsHide] = useState(null);
   const [groupTitle, setGroupTitle] = useState('');

   useEffect(() => {
      const currentMenuItem = menuItems.find((item) => item.link === locationName);

      const currentChild = menuItems.find((item) =>
         item.child?.find((child) => child.childlink === locationName),
      );

      if (currentMenuItem) {
         setIsHide(currentMenuItem.isHide);
      } else if (currentChild) {
         setIsHide(currentChild?.isHide || false);
         setGroupTitle(currentChild?.title);
      }
   }, [location, locationName]);

   return (
      <>
         {!isHide ? (
            <div className="mb-4 flex space-x-3 md:mb-6 rtl:space-x-reverse">
               <ul className="breadcrumbs">
                  <li className="text-primary-500">
                     <Link href="/" className="text-lg">
                        <Icon icon="heroicons-outline:home" />
                     </Link>
                     <span className="breadcrumbs-icon rtl:rotate-180 rtl:transform">
                        <Icon icon="heroicons:chevron-right" />
                     </span>
                  </li>
                  {groupTitle && (
                     <li className="text-primary-500">
                        <button type="button" className="capitalize">
                           {groupTitle}
                        </button>
                        <span className="breadcrumbs-icon rtl:rotate-180 rtl:transform">
                           <Icon icon="heroicons:chevron-right" />
                        </span>
                     </li>
                  )}
                  <li className="capitalize text-slate-500 dark:text-slate-400">{locationName}</li>
               </ul>
            </div>
         ) : null}
      </>
   );
};

export default Breadcrumbs;
