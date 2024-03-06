import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryMiddleware from "../baseQueryMiddleware";

export const medicalApi = createApi({
   reducerPath: 'medicalApi',
   baseQuery: baseQueryMiddleware(process.env.NEXT_PUBLIC_API_URL + 'patients-medical'),
   tagTypes: [],
   endpoints: (builder) => ({
      createMedical: builder.mutation({
         query: ({ id, payload }) => ({
            url: `/${id}`,
            method: 'POST',
            body: payload,
         }),
      }),
      updateMedical: builder.mutation({
         query: ({ id, payload }) => ({
            url: `/${id}`,
            method: 'PUT',
            body: payload,
         }),
      }),
      deleteMedical: builder.mutation({
         query: (id) => ({
            url: `/${id}`,
            method: 'DELETE',
         }),
      }),
      getMedical: builder.query(
         {
            query: (id) => `/${id}`,
            keepUnusedDataFor: 0, // set cache | in second | 0 = no-cache
         },
      ),
      getMedicalAll: builder.query(
         {
            query: () => `/`,
            keepUnusedDataFor: 0, // set cache | in second | 0 = no-cache
         },
      ),
      getMedicalDetail: builder.query(
         {
            query: (id) => `/detail/${id}`,
            keepUnusedDataFor: 0, // set cache | in second | 0 = no-cache
         },
      ),
   }),
});

// Export hooks for usage in functional components
export const {
   useCreateMedicalMutation,
   useGetMedicalQuery,
   useGetMedicalAllQuery,
   useUpdateMedicalMutation,
   useDeleteMedicalMutation,
   useGetMedicalDetailQuery,
   util: { getRunningQueriesThunk },
} = medicalApi;