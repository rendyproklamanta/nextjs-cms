import { useEffect, useState } from 'react';
import { redirect, usePathname } from 'next/navigation';
import { getCookie } from '../utils/cookies';

const useTokenExpirationCheck = () => {
   const pathname = usePathname();
   const [isLoggedIn, setIsLoggedIn] = useState(true);

   useEffect(() => {
      if (pathname !== '/login') {
         const fetchData = async () => {
            try {
               const get = await getCookie('isLoggedIn');
               const data = get?.value;
               if (!data) {
                  setIsLoggedIn(false);
               }
            } catch (error) {
               console.error('Error fetching data:', error);
            }
         };

         fetchData();
      }

   }, [pathname]);

   useEffect(() => {
      if (!isLoggedIn) {
         redirect('/login')
      }
   }, [isLoggedIn]);

   return null;
};

export default useTokenExpirationCheck;