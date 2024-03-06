import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryMiddleware from "../baseQueryMiddleware";

export const diagnosisApi = createApi({
   baseQuery: baseQueryMiddleware(process.env.NEXT_PUBLIC_API_URL + 'diagnosis'),
   tagTypes: [],
   endpoints: (builder) => ({
      createDiagnosis: builder.mutation({
         query: (payload) => ({
            url: '/',
            method: 'POST',
            body: payload,
         }),
      }),
      updateDiagnosis: builder.mutation({
         query: ({ id, payload }) => ({
            url: `/${id}`,
            method: 'PUT',
            body: payload,
         }),
      }),
      deleteDiagnosis: builder.mutation({
         query: (id) => ({
            url: `/${id}`,
            method: 'DELETE',
         }),
      }),
      getDiagnosis: builder.query(
         {
            query: (id) => `/${id}`,
            keepUnusedDataFor: 0, // set cache | in second | 0 = no-cache
         },
      ),
      getDiagnosisAll: builder.query(
         {
            query: () => `/`,
            keepUnusedDataFor: 0, // set cache | in second | 0 = no-cache
         },
      ),
   }),
});

// Export hooks for usage in functional components
export const {
   useCreateDiagnosisMutation,
   useGetDiagnosisQuery,
   useGetDiagnosisAllQuery,
   useUpdateDiagnosisMutation,
   useDeleteDiagnosisMutation,
   util: { getRunningQueriesThunk },
} = diagnosisApi;