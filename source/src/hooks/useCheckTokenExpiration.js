import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { hasCookie } from '../utils/cookies';

const useCheckTokenExpiration = () => {
   const pathname = usePathname();
   const router = useRouter();
   const [hasRefreshToken, setHasRefreshToken] = useState(false);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const refreshToken = await hasCookie('refreshToken');
            if (refreshToken) {
               setHasRefreshToken(true);
            }
         } catch (error) {
            console.error('Error fetching data:', error);
         }
         setIsLoading(false);
      };

      fetchData();

   }, [pathname, router]);

   return [isLoading, hasRefreshToken];

};

export default useCheckTokenExpiration;