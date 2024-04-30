import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { handleLogout, refreshAccessTokenSlice } from './slices/authSlice';
import { toast } from 'react-toastify';

const baseQuery = (baseUrl) =>
   fetchBaseQuery({
      baseUrl: baseUrl,
      credentials: 'include',
      prepareHeaders: (headers, { getState }) => {
         const { accessToken } = getState().auth;
         headers.set('Authorization', `Bearer ${accessToken}`);
         headers.set('content-type', `application/json`);
         return headers;
      },
   });

const baseQueryMiddleware = (baseUrl) => async (args, api, extraOptions) => {
   let result = await baseQuery(baseUrl)(args, api, extraOptions);
   //console.log("🚀 ~ file: baseQueryMiddleware.js:19 ~ baseQueryMiddleware ~ result:", result)
   let error = '';
   let errorAuth = '';

   if (result?.error?.status === 'FETCH_ERROR') {
      error = result?.error?.status;
   }

   if (result?.error?.status === 500) {
      error = result?.error?.data?.message;
   }

   if (result?.error?.status === 401 && result?.error?.data?.error?.name !== 'TokenExpiredError') {
      error = result.error.data.message.code ?? result.error.data.message;
      errorAuth = true;
   }

   if (result?.error?.data?.error?.name === 'TokenExpiredError') {
      const refreshResult = await baseQuery(baseUrl)(
         {
            url: process.env.NEXT_PUBLIC_API_URL + 'auths/token/refresh',
            method: 'POST',
         },
         api,
         extraOptions,
      );
      //console.log("🚀 ~ file: baseQueryMiddleware.js:27 ~ baseQueryMiddleware ~ refreshResult:", refreshResult)

      if (refreshResult?.data?.success) {
         api.dispatch(refreshAccessTokenSlice(refreshResult.data.data.accessToken));
         result = await baseQuery(baseUrl)(args, api, extraOptions); // retry the original query with new access token
      } else {
         error = refreshResult.error.data.message.code ?? refreshResult.error.data.message;
         errorAuth = true;
      }
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
      //return result;
   }

   return result;
};

export default baseQueryMiddleware;
