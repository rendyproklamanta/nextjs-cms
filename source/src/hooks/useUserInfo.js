import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

const useUserInfo = () => {
   const [user, setUser] = useState('');
   const [isLoading, setIsLoading] = useState(true);
   const { userinfo } = useSelector((state) => state.auth);

   useEffect(() => {
      setUser(userinfo);
      setIsLoading(false);
   }, [userinfo]);

   return [user, isLoading];
};

export default useUserInfo;
