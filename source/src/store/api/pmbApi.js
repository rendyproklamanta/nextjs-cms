import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryMiddleware from "../baseQueryMiddleware";

export const pmbApi = createApi({
   reducerPath: 'pmbApi',
   baseQuery: baseQueryMiddleware(process.env.NEXT_PUBLIC_API_URL + 'pmbs'),
   tagTypes: [],
   endpoints: (builder) => ({
      createPmb: builder.mutation({
         query: (payload) => ({
            url: '/',
            method: 'POST',
            body: payload,
         }),
      }),
      updatePmb: builder.mutation({
         query: ({ id, payload }) => ({
            url: `/${id}`,
            method: 'PUT',
            body: payload,
         }),
      }),
      deletePmb: builder.mutation({
         query: (id) => ({
            url: `/${id}`,
            method: 'DELETE',
         }),
      }),
      getPmb: builder.query(
         {
            query: (id) => `/${id}`,
            keepUnusedDataFor: 0, // set cache | in second | 0 = no-cache
         },
      ),
      getPmbAll: builder.query(
         {
            query: () => `/`,
            keepUnusedDataFor: 0, // set cache | in second | 0 = no-cache
         },
      ),
      getPmbDropdown: builder.query({
         query: () => `/`,
         keepUnusedDataFor: 0, // set cache | in second | 0 = no-cache
         transformResponse: (res) => {
            const data = res?.data;

            if (data) {
               return data.map(({ _id, namePmb, nameMidwife }) => ({
                  value: _id,
                  label: namePmb + ' - ' + nameMidwife,
               }));
            } else {
               return false;
            }
         }
      }),
   }),
});

// Export hooks for usage in functional components
export const {
   useCreatePmbMutation,
   useGetPmbQuery,
   useGetPmbAllQuery,
   useUpdatePmbMutation,
   useDeletePmbMutation,
   useGetPmbDropdownQuery,
   util: { getRunningQueriesThunk },
} = pmbApi;