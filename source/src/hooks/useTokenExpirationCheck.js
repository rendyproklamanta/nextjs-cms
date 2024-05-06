import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { hasCookie } from '../utils/cookies';

const useTokenExpirationCheck = () => {
   const pathname = usePathname();
   const router = useRouter();

   useEffect(() => {
      const fetchData = async () => {
         try {
            const refreshToken = await hasCookie('refreshToken');
            if (!refreshToken) {
               router.push('/login');
            }
         } catch (error) {
            console.error('Error fetching data:', error);
         }
      };

      fetchData();

   }, [pathname, router]);

   return null;
};

export default useTokenExpirationCheck;