import { useState } from 'react';
import { useEffect } from 'react';
import { useGetUserInfoQuery } from '../store/api/authApi';

const useUserInfo = () => {
   const [user, setUser] = useState('');
   const { isLoading, data: res } = useGetUserInfoQuery();

   useEffect(() => {
      if (!isLoading) {
         setUser(res);
      }
   }, [isLoading, res]);

   return [isLoading, user];
};

export default useUserInfo;
