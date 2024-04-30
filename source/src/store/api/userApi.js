import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryMiddleware from '../baseQueryMiddleware';

export const userApi = createApi({
   reducerPath: 'userApi',
   baseQuery: baseQueryMiddleware(process.env.NEXT_PUBLIC_API_URL + 'users'),
   tagTypes: [],
   endpoints: (builder) => ({
      createUser: builder.mutation({
         query: (payload) => ({
            url: '/',
            method: 'POST',
            body: payload,
         }),
      }),
      updateUser: builder.mutation({
         query: ({ id, payload }) => ({
            url: `/${id}`,
            method: 'PUT',
            body: payload,
         }),
      }),
      deleteUser: builder.mutation({
         query: (id) => ({
            url: `/${id}`,
            method: 'DELETE',
         }),
      }),
      getUser: builder.query({
         query: (id) => `/${id}`,
         keepUnusedDataFor: 0, // set cache | in second | 0 = no-cache
      }),
      getUserAll: builder.query({
         query: () => `/`,
         keepUnusedDataFor: 0, // set cache | in second | 0 = no-cache
      }),
      getDummyDataTable: builder.query({
         query: ({ page, pageSize }) => `/generate/dummy/table?page=${page}&pageSize=${pageSize}`,
         keepUnusedDataFor: 0, // set cache | in second | 0 = no-cache
      }),
      getDummyDataFilter: builder.mutation({
         query: (payload) => ({
            url: `/generate/dummy/filter`,
            method: 'POST',
            body: payload,
         }),
      }),
      getDummyDataAll: builder.mutation({
         query: () => ({
            url: `/generate/dummy/all`,
            method: 'POST',
         }),
      }),
   }),
});

// Export hooks for usage in functional components
export const {
   useCreateUserMutation,
   useGetUserQuery,
   useGetUserAllQuery,
   useUpdateUserMutation,
   useDeleteUserMutation,
   useGetDummyDataTableQuery,
   useGetDummyDataFilterMutation,
   useGetDummyDataAllMutation,
   util: { getRunningQueriesThunk },
} = userApi;
