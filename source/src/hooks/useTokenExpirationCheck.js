import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getCookie } from '../utils/cookies';

const useTokenExpirationCheck = () => {
   const pathname = usePathname();
   const router = useRouter();

   useEffect(() => {
      const fetchData = async () => {
         try {
            const get = await getCookie('accessToken');
            const data = get?.value;
            if (!data) {
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