import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { handleLogout, refreshAccessTokenSlice } from './slices/authSlice';
import { toast } from 'react-toastify';
import { getCookie } from '../utils/cookies';
import { nextDecrypt, nextEncrypt } from '../utils/encryption';

const baseQuery = (baseUrl) =>
   fetchBaseQuery({
      baseUrl: baseUrl,
      credentials: 'include',
      prepareHeaders: async (headers) => {
         // const accessToken = await getCookie('accessToken');
         if (typeof window !== 'undefined') {
            const accessToken = window?.localStorage.getItem('accessToken');
            if (accessToken) {
               const accessTokenDecrypt = await nextDecrypt(accessToken);

               headers.set('Authorization', `Bearer ${accessTokenDecrypt}`);
            }
         }

         headers.set('content-type', `application/json`);
         return headers;
      },
   });

const baseQueryMiddleware = (baseUrl) => async (args, api, extraOptions) => {
   let result = await baseQuery(baseUrl)(args, api, extraOptions);
   let error = '';
   let errorAuth = '';
   // const accessToken = await hasCookie('accessToken');
   const refreshToken = await getCookie('refreshToken');

   if (result?.error?.status === 'FETCH_ERROR') {
      error = result?.error?.status;
   } else if (result?.error?.status === 500) {
      error = result?.error?.data?.message;
   } else {
      error = result?.error?.data?.status;
   }


   // if (refreshToken && !accessToken) {
   if (result?.error?.status === 401 && result?.data?.error?.description?.name !== 'TokenExpiredError') {

      const refreshResult = await baseQuery(baseUrl)(
         {
            url: process.env.NEXT_PUBLIC_API_URL + 'auths/token/refresh',
            method: 'POST',
            body: {
               refreshToken: refreshToken,
            }
         },
         api,
         extraOptions,
      );

      if (refreshResult?.data?.success) {
         api.dispatch(refreshAccessTokenSlice(refreshResult?.data?.data));

         const encryptedAccessToken = await nextEncrypt(refreshResult?.data?.data?.accessToken);

         // await setCookie(
         //    'accessToken',
         //    encryptedToken,
         //    refreshResult?.data?.data?.accessTokenExpiry,
         // );

         // save in local storage
         if (typeof window !== 'undefined') {
            window?.localStorage.setItem('accessToken', encryptedAccessToken);
         }

         result = await baseQuery(baseUrl)(args, api, extraOptions); // retry call API with new access token
      } else {
         error = refreshResult?.error?.data?.message?.code ?? refreshResult?.error?.data?.message;
         errorAuth = true;
      }
   }

   if (result?.data?.code === 100005) {
      error = result?.data?.error?.message;
      api.dispatch(handleLogout(true));
   }

   if (error) {
      toast.error(error, {
         //toastId: error,
         position: 'top-center',
         autoClose: 2000,
      });

      if (errorAuth) {
         api.dispatch(handleLogout(true));
      }
   }

   return result;
};

export default baseQueryMiddleware;
