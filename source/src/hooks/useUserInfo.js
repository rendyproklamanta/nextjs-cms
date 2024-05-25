import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { nextDecrypt } from '../utils/encryption';

const useUserInfo = () => {
   const [userInfo, setUserInfo] = useState('');
   const { userInfo: userInfoLocal } = useSelector((state) => state.auth);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const getUserInfo = await userInfoLocal;
            if (getUserInfo) {
               const getUserInfoDecrypt = await nextDecrypt(getUserInfo);
               setUserInfo(JSON.parse(getUserInfoDecrypt));
            }
         } catch (error) {
            console.error('Error fetching data:', error);
         }
      };
      fetchData();

   }, [userInfoLocal]);

   return { userInfo };
};

export default useUserInfo;
