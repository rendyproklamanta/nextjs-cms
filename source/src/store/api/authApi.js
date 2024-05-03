import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryMiddleware from '../baseQueryMiddleware';

export const authApi = createApi({
   reducerPath: 'authApi',
   baseQuery: baseQueryMiddleware(process.env.NEXT_PUBLIC_API_URL + 'auths'),
   tagTypes: [],
   endpoints: (builder) => ({
      postUserLogin: builder.mutation({
         query: (payload) => ({
            url: '/method/local',
            method: 'POST',
            body: payload,
         }),
      }),
      getUserInfo: builder.query({
         query: () => `/token/data`,
         keepUnusedDataFor: 0, // set cache | in second | 0 = no-cache
      }),
   }),
});

// Export hooks for usage in functional components
export const {
   usePostUserLoginMutation,
   useGetUserInfoQuery,
   util: { getRunningQueriesThunk },
} = authApi;

// export endpoints for use in SSR
export const { getUser } = authApi.endpoints;
