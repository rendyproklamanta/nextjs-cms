import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { handleLogout, refreshAccessTokenSlice } from './slices/authSlice';
import { toast } from 'react-toastify';
import { getCookie, hasCookie } from '../utils/cookies';

const baseQuery = (baseUrl) =>
   fetchBaseQuery({
      baseUrl: baseUrl,
      credentials: 'include',
      prepareHeaders: async (headers) => {
         const accessToken = await getCookie('accessToken');
         headers.set('Authorization', `Bearer ${accessToken}`);
         headers.set('content-type', `application/json`);
         return headers;
      },
   });

const baseQueryMiddleware = (baseUrl) => async (args, api, extraOptions) => {
   let result = await baseQuery(baseUrl)(args, api, extraOptions);
   let error = '';
   let errorAuth = '';
   const accessToken = await hasCookie('accessToken');
   const refreshToken = await hasCookie('refreshToken');

   if (result?.error?.status === 'FETCH_ERROR') {
      error = result?.error?.status;
   } else if (result?.error?.status === 500) {
      error = result?.error?.data?.message;
   } else {
      error = result?.error?.data?.status;
   }


   if (refreshToken && !accessToken) {

      const refreshResult = await baseQuery(baseUrl)(
         {
            url: process.env.NEXT_PUBLIC_API_URL + 'auths/token/refresh',
            method: 'GET',
         },
         api,
         extraOptions,
      );

      console.log("🚀 ~ baseQueryMiddleware ~ refreshResult:", refreshResult)

      if (refreshResult?.data?.success) {
         const payload = {
            accessToken: refreshResult?.data?.data?.accessToken,
            accessTokenExpiry: refreshResult?.data?.data?.accessTokenExpiry
         }
         api.dispatch(refreshAccessTokenSlice(payload));
         result = await baseQuery(baseUrl)(args, api, extraOptions); // retry the original query with new access token
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
      return result;
   }

   return result;
};

export default baseQueryMiddleware;
